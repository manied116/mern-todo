const express = require('express')
const app = express()
const port = 3000

app.get("/",(req,res) => {
    res.send({msg:"Root"})
})

const users = [
    {id:1,name:"user1"},
    {id:2,name:"user2"},
    {id:3,name:"user3"},
    {id:4,name:"user4"},
    {id:5,name:"user5"},
];

const products = [
    {id:1,p_name:"productA",p_price:25},   
    {id:2,p_name:"productB",p_price:35},   
    {id:3,p_name:"productC",p_price:55},   
    {id:4,p_name:"productD",p_price:15},   
    {id:5,p_name:"productE",p_price:65},   
    {id:6,p_name:"productF",p_price:50},   
]

// route params handle
app.get("/api/users",(req,res)=>{
    res.send(users);
})

app.get("/api/users/:id",(req,res)=>{
    console.log(req.params)
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        res.status(400).send({msg:"Invalid Id"})
    }
    const user = users.find((user)=> user.id === id);
    if(user){
        return res.send(user)
    }
    return res.status(400).send({msg:"User Not found"})
})

// app.get("/api/products",(req,res)=>{
//     res.send(products);
// })

app.get("/api/products/:id",(req,res)=>{
    console.log(req.params)
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        res.status(400).send({msg:"Invalid Id"})
    }
    const product = products.find((product)=> product.id === id);
    if(product){
        return res.send(product)
    }
    return res.status(400).send({msg:"Product Not found"})
})
// --------------------------------
// query params

app.get("/api/products",(req,res)=>{
    const {query:{filter,value}} = req;
    console.log(filter,value);
    if(filter && value){
        return res.send(products.filter((product)=> product[filter].includes(value)));
    }
    res.send(products);
})

// middleware
app.use(express.json())
// Post REQUEST
app.post("api/products",(req,res)=>{
    return res.send(req.body)
})
app.listen(port,()=>{
    console.log("App running:",port)
})