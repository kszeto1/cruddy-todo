const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((error, data)=> {
    if (error) {
      callback(null, 0);
    } else {
      var path1 = path.join(exports.dataDir, data + '.txt')
      fs.writeFile(path1, text, (error)=> {
        if (error){
          callback(null, 0)
        } else {
          items.id = data;
          items.text = text;
          callback(null, items)
        }
      });
    }
  });
};

exports.readAll = (callback) => {
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
  fs.readdir(exports.dataDir, (error, files)=>{
    if (error){
      callback(null, [])
    } else {
      var array = [];
      files.forEach((file)=>{
        array.push({id:path.basename(file, '.txt'), text:path.basename(file, '.txt')})
      })
      callback(null, array)
    }
  })
};

exports.readOne = (id, callback) => {
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
  // console.log('this is id', id);
  fs.readFile(exports.dataDir + `/${id}` + '.txt', (error, data) => {
    console.log('exports.dataDir:', exports.dataDir + `/${id}` + '.txt')
    console.log(data)
    // var text = items[id];
    if (error) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      // callback(null, {id, text})
    }
  })


};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
