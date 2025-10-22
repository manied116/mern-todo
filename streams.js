//buffer is a small amount of chunks
// if a file size is massive we can use streams to read chunks
const fs = require('fs')

const readStream = fs.createReadStream('./data/hugeFile.txt',{encoding:'utf-8'})
const writeStream = fs.createWriteStream('./data/copyHugeFile.txt')

// read eventListener
// readStream.on('data',(buffer)=>{
//     writeStream.write(buffer)
// })

readStream.pipe(writeStream)