const path = require('path');
const fs = require('file-system');

const PAGES_URL = path.resolve(__dirname, '../../../webapp/WEB-INF/pages');
const DIST_FOLDER = path.resolve(__dirname, '../dist');

// Filer by filetype

fs.copySync(DIST_FOLDER, PAGES_URL, {
  process: (contents, filepath) => {
    console.log(filepath); // eslint-disable-line
    return contents;
  }
});
