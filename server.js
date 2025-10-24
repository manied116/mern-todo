const http = require('http')
const fs = require('fs')
const server = http.createServer((req,res)=>{
    // which type resepose to send to client
    // res.setHeader('Content-Type','text/plain')

    // // send response
    // res.write("Learn node js")
    // res.end();

    // which html page resepose to send to client
    res.setHeader('Content-Type','text/html')

    // send response
    // res.write("<h2 style='color:red'>Learn node js</h2>")
    // res.write("<p>Hello world</p>")

    // read html file and write a response
    // fs.readFile('./data/index.html',(err,data)=>{
    //     if(err){
    //        console.log(err)
    //         res.end(); 
    //     }
    //     else{
    //         res.write(data)
    //         res.end();
    //     }
    // })
    // multiple html call via route
    let path = './data/'
    if(req.url == '/'){
        path += 'index.html'
        res.statusCode = 200
    }else if(req.url == '/home'){
        // redirect url - statusCode, setHeaders, res.end
        res.statusCode = 301;
        res.setHeader('Location','/');
        res.end();
    }
    else if(req.url == '/about'){
        path += 'about.html'
        res.statusCode = 200
    }else{
        path += 'notFound.html'
        res.statusCode = 404
    }
    fs.readFile(path,(err,data)=>{
        if(err){
           console.log(err)
            res.end(); 
        }
        else{
            res.write(data)
            res.end();
        }
    })
})

server.listen(3000, 'localhost',()=> {
    console.log("Server is listening...")
})