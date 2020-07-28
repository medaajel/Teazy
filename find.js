const fs = require('fs')
const path = require('path')
const { isNull } = require('util')

const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

function sortByFrequency(array) {
    var frequency = {};
    var sortAble = [];
    var newArr = [];

    array.forEach(function(value) { 
        if ( value in frequency )
            frequency[value] = frequency[value] + 1;
        else
            frequency[value] = 1;
    });
    

    for(var key in frequency){
        sortAble.push([key, frequency[key]])
    }

    sortAble.sort(function(a, b){
        return b[1] - a[1]
    })

    
    sortAble.forEach(function(obj){
        for(var i=0; i < obj[1]; i++){
            newArr.push(obj[0]);
        }
    })
    return newArr;
    
}

module.exports.find = function(tempDir){
if(fs.existsSync(tempDir) == false){
    console.log("Error: Template not found!")
}else{
    files = getAllFiles(tempDir)
    allowedExtensions = [".html", ".css", ".sass", ".scss", ".less"]
    colorsOCC = []
    picturesOCC = []
    files.forEach(function(file) {
        if(allowedExtensions.includes(file.substr(file.indexOf("."), 5))){
        fileContent = fs.readFileSync(file,"utf-8")
        colorsOCC = colorsOCC.concat(fileContent.match(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi))
        picturesOCC = picturesOCC.concat(fileContent.match(/[0-9A-Za-z-_/\\]+[.]jpg|[0-9A-Za-z-_/\\]+[.]jpeg|[0-9A-Za-z-_/\\]+[.]png|[0-9A-Za-z-_/\\]+[.]gif|[0-9A-Za-z-_/\\]+[.]webp|[0-9A-Za-z-_/\\]+[.]svg|[0-9A-Za-z-_/\\]+[.]ico|[0-9A-Za-z-_/\\]+[.]bmp/gi))
    }
    })
    
    pictures = []
    picturesOCC = picturesOCC.filter(function (el) {
        return el != null;
      });
    
    
    picturesOC = []
    for (var i = 0; i < picturesOCC.length; i++) {
        picturesOC.push(picturesOCC[i].toLowerCase());
    }

    picturesOC = sortByFrequency(picturesOC)

    picturesOC.forEach(function(color) {
        if(pictures.includes(color) == false){
            pictures.push(color)
        }
    })

    colors = []
    colorsOCC = colorsOCC.filter(function (el) {
        return el != null;
      });
    
    
    colorsOC = []
    for (var i = 0; i < colorsOCC.length; i++) {
        colorsOC.push(colorsOCC[i].toLowerCase());
    }

    colorsOC = sortByFrequency(colorsOC)

    colorsOC.forEach(function(color) {
        if(color.length == 4){
            color = color + color.substr(1, 3)
        }
        if(colors.includes(color) == false){
            colors.push(color)
        }
    })

    console.log(colors)
    console.log(pictures)
}
}