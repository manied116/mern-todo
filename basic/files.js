
const fs = require('fs')

if( ! fs.existsSync('./docs') ){
    fs.mkdir('./docs', (err)=>{
        if(err){
            console.log(err.message)
        }else
        console.log("Folder created")
    })
}else 
    console.log("Folder already exists")


fs.writeFile('./docs/file.txt', 'Hello world', (err) => {
    if(err){
        console.log(err.message)
    }else
    console.log("File created and writted")
})

if(  fs.existsSync('./docs/file.txt') ){
    fs.readFile('./docs/file.txt',(err,data)=>{
        if(err)
            console.log(err)
        else
            console.log(data.toString())
    })
}

if(  fs.existsSync('./docs/file.txt') ){
    fs.unlink('./docs/file.txt',(err)=>{
        if(err)
            console.log(err)
        else
            console.log('File deleted')
    })
}

if(  fs.existsSync('./docs') ){
    fs.rmdir('./docs',(err)=>{
        if(err)
            console.log(err)
        else
            console.log('Folder deleted')
    })
}