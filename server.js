const { dir } = require('console');
const   express = require('express'),
        fs = require('fs'),
        path = require('path');

const app = express(),
      bodyParser = require("body-parser");
      port = 3080;


const directoryListing = [];

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/api-frontend/dist/api-frontend/"));

app.post("/api/getDirectoryListing", (req, res) => {
    const dirPath = req.query.dirPath;
  
    const createItemObject = (file, fullPath, fileStats, extension, readPermission, writePermission, executePermission) => {
      let read, write, execute;
      readPermission == undefined ? read = true : false;
      writePermission == undefined ? write = true : false;
      executePermission == undefined ? execute = true : false;
      let data = {filename: file, 
                  fullPath: fullPath.replace(/\\/g, '/'), 
                  fileSize: (fileStats["size"]/1000).toFixed(2) + "KB", 
                  fileType: extension == '' ? "Directory" : extension, 
                  createdDate: fileStats["birthtime"].toLocaleString(), 
                  permissions: {read: read, write: write, execute: execute},
                  isDirectory: fileStats.isDirectory()};
      return data;
    }
  
    const getDirectoryListing = () => {
      let files = fs.readdirSync(dirPath);
  
      files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        const fileStats = fs.statSync(fullPath);
        const extension = path.extname(fullPath);
        const readPermission = fs.accessSync(fullPath, fs.constants.R_OK);
        const writePermission = fs.accessSync(fullPath, fs.constants.W_OK);
        const executePermission = fs.accessSync(fullPath, fs.constants.X_OK);
  
        let directoryListingItem = createItemObject(file, fullPath, fileStats, extension, 
            readPermission, writePermission, executePermission);
        directoryListing.push(directoryListingItem) ;
      });
  
      console.log(directoryListing);
      res.send(directoryListing);
    }
  
    getDirectoryListing();
  
  })

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/api-frontend/dist/api-frontend/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});