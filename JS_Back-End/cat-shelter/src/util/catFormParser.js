const formidable = require('formidable');
const path = require('path');
const fs = require('fs').promises;
const { readFile, writeFile } = require('../util/fileSystem');

async function addCatForm(req, res) {
  let form = new formidable.IncomingForm({
    allowEmptyFiles: true,
    keepExtensions: true,
    minFileSize: 0,
  });
  // Optional: Set upload directory and keep original file extensions
  form.uploadDir = path.join(__dirname, '../../content/images'); // Make sure this directory exists

  // Parse the incoming form request
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error parsing the file upload.');
      return;
    }
    const name = fields.name[0].trim();
    const description = fields.description[0].trim();
    const breed = fields.breed[0].trim();
    // Access the uploaded file (assuming the input field name is "image")
    const uploadedFile = files.upload[0];

    // Rename or move the uploaded file (optional)
    const newFilePath = path.join(
      form.uploadDir,
      uploadedFile.newFilename + uploadedFile.originalFilename
    );
    const indexOfDir = newFilePath.indexOf('/content');
    let DBImageUrl = newFilePath.slice(indexOfDir); //content/images...

    if (uploadedFile.size == 0) {
      return console.log('All fields are required!');
    }
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
}
async function editCatForm(req, res, catId) {
  if (!catId) {
    return alert('no cat Id');
  }
  let form = new formidable.IncomingForm({
    allowEmptyFiles: true,
    keepExtensions: true,
    minFileSize: 0,
  });
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

    const name = fields.name[0].trim();
    const description = fields.description[0].trim();
    const breed = fields.breed[0].trim();
    // Access the uploaded file (assuming the input field name is "image")
    const uploadedFile = files.upload[0];

    // Rename or move the uploaded file (optional)
    const newFilePath = path.join(
      form.uploadDir,
      uploadedFile.newFilename + uploadedFile.originalFilename
    );
    const indexOfDir = newFilePath.indexOf('/content');
    let DBImageUrl = newFilePath.slice(indexOfDir); //content/images...
    const cats = JSON.parse(await readFile('/data/cats.json')); // [{},{}]
    const cat = cats.find((obj) => obj._id === catId); // {}
    if (uploadedFile.size == 0) {
      return console.log('All fields are required!');
    }
    if (cat.imageUrl.includes('/content/images')) {
      await fs.unlink(path.join(__dirname, '../../', cat.imageUrl));
    }
    await fs.rename(uploadedFile.filepath, newFilePath, (err) => {
      if (err) {
        console.error('Error moving file:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error saving the file.');
        return;
      }
    });

    cat.name = name;
    cat.breed = breed;
    cat.description = description;
    cat.imageUrl = DBImageUrl;
    const index = cats.findIndex((obj) => obj._id === catId);
    if (index !== -1) {
      cats[index] = cat;
      await writeFile('/data/cats', 'json', JSON.stringify(cats));
    }
    res.writeHead(302, { location: '/' });
    res.end();
  });
}
function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}
module.exports = { addCatForm, editCatForm };
