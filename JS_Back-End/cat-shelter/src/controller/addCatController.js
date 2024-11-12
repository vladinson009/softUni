const { readFile, writeFile } = require('../util/fileSystem');
const fs = require('fs').promises;
const formidable = require('formidable');
const path = require('path');
async function addCatView(req, res) {
  if (req.url == '/cats/add-cat' && req.method == 'GET') {
    let [breeds, main, addCatView, addCatOptionTemplate] = await Promise.all([
      readFile('/data/breeds.json'),
      readFile('/views/home/index.html'),
      readFile('/views/addCat.html'),
      readFile('/views/partials/addCatOption.html'),
    ]);
    breeds = JSON.parse(breeds);
    let options = breeds.map((br) => addCatOptionTemplate.replaceAll('%%body%%', br));
    let result = main.replace('{{{body}}}', addCatView);
    result = result.replace('%%form%%', '');
    result = result.replace('%%body%%', options.join('\n'));
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.write(result);
    res.end();
  } else if (req.url == '/cats/add-cat' && req.method == 'POST') {
    let form = new formidable.IncomingForm();
    // Optional: Set upload directory and keep original file extensions
    form.uploadDir = path.join(__dirname, '../../content/images'); // Make sure this directory exists
    form.keepExtensions = true;

    // Parse the incoming form request
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error parsing the file upload.');
        return;
      }
      const name = fields.name[0];
      const description = fields.description[0];
      const breed = fields.breed[0];
      // Access the uploaded file (assuming the input field name is "image")
      const uploadedFile = files.upload[0];

      // Rename or move the uploaded file (optional)
      const newFilePath = path.join(
        form.uploadDir,
        uploadedFile.newFilename + uploadedFile.originalFilename
      );
      const indexOfDir = newFilePath.indexOf('/content');
      const DBImageUrl = newFilePath.slice(indexOfDir);
      console.log(DBImageUrl);

      let [cats] = await Promise.all([
        readFile('/data/cats.json'),
        fs.rename(uploadedFile.filepath, newFilePath, (err) => {
          if (err) {
            console.error('Error moving file:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error saving the file.');
            return;
          }
        }),
      ]);
      cats = JSON.parse(cats);

      const newCat = {
        _id: uniqueID().toString(),
        name,
        breed,
        description,
        imageUrl: DBImageUrl,
      };
      cats.push(newCat);
      await writeFile('/data/cats', 'json', JSON.stringify(cats));
      res.writeHead(302, { location: '/' });
      res.end('File uploaded successfully!');
    });
  } else {
    return true;
  }
}
function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

module.exports = { addCatView };
