const { readFile } = require('../util/fileSystem');
async function editCatView(req, res) {
  if (req.url.includes('/edit') && req.method == 'GET') {
    const catId = req.url.split('/')[2];
    let [cats, breeds, main, EditCatView, addCatOptionTemplate] = await Promise.all([
      readFile('/data/cats.json'),
      readFile('/data/breeds.json'),
      readFile('/views/home/index.html'),
      readFile('/views/EditCat.html'),
      readFile('/views/partials/addCatOption.html'),
    ]);
    cats = JSON.parse(cats);
    breeds = JSON.parse(breeds);
    ////
    const cat = cats.find((obj) => obj._id === catId);
    let options = breeds.map((br) => {
      if (cat.breed == br) {
        return `<option value="${br}" selected>${br}</option>`;
      } else {
        return addCatOptionTemplate.replaceAll('%%body%%', br);
      }
    });
    let result = main.replace('{{{body}}}', EditCatView);
    result = result.replace('%%form%%', '');
    result = result.replace('%%breed%%', options.join('\n'));
    Object.entries(cat).forEach(([k, v]) => {
      const regex = new RegExp('%%' + k + '%%', 'g');
      result = result.replaceAll(regex, v);
    });
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.write(result);
    res.end();
  } else if (req.url.includes('/edit') && req.method == 'POST') {
    res.writeHead(302, { location: '/' });
    res.end('File uploaded successfully!');
  } else {
    return true;
  }
}

module.exports = { editCatView };
