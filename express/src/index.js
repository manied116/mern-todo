const express = require('express')
const app = express()
const { createProductValidationSchema } =  require('./utils/validationSchema')
const {checkSchema,matchedData,validationResult} = require('express-validator')
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
    if(filter && value){
        return res.send(products.filter((product)=> product[filter].includes(value)));
    }
    res.send(products);
})

// middleware
app.use(express.json())  //get json format data

// MIDDLEWARE
const getById = (req,res,next) =>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        res.status(400).send({msg:"Invalid Id"})
    }
    const productIndex = products.findIndex((product)=> product.id === id);
    if(productIndex === -1){
        return res.status(400).send({msg:"Product Not found"})
    }
    req.productIndex = productIndex
    next()
}
// Post REQUEST
// app.post("/api/products",(req,res)=>{
//     const {body} = req;
//     const new_product = {id:products[products.length-1].id+1,...body}
//     products.push(new_product);
//     return res.status(201).send(products)
// })

// PUT REQUEST - COMPLETE UPDATE
// app.put("/api/products/:id",getById,(req,res)=>{
//     // const id = parseInt(req.params.id);
//     // if(isNaN(id)){
//     //     res.status(400).send({msg:"Invalid Id"})
//     // }
//     // const productIndex = products.findIndex((product)=> product.id === id);
//     // if(productIndex === -1){
//     //     return res.status(400).send({msg:"Product Not found"})
//     // }
//     const {body,productIndex} = req;
//     products[productIndex] = {id:id,...body}
//     return res.status(200).send({msg:"Product updated successfully.!"})
// })

// PATCH REQUEST - SINGLE NODE UPDATE
// app.patch("/api/products/:id",getById,(req,res)=>{
//     // const id = parseInt(req.params.id);
//     // if(isNaN(id)){
//     //     res.status(400).send({msg:"Invalid Id"})
//     // }
//     // const productIndex = products.findIndex((product)=> product.id === id);
//     // if(productIndex === -1){
//     //     return res.status(400).send({msg:"Product Not found"})
//     // }
//     const {body,productIndex} = req;
//     products[productIndex] = {...products[productIndex],...body}
//     return res.status(200).send({msg:"New node updated successfully.!"})
// })

// DELETE -PARTICULAR ITEMS
// app.delete("/api/products/:id",getById,(req,res)=>{
//     // const id = parseInt(req.params.id);
//     // if(isNaN(id)){
//     //     res.status(400).send({msg:"Invalid Id"})
//     // }
//     // const productIndex = products.findIndex((product)=> product.id === id);
//     // if(productIndex === -1){
//     //     return res.status(400).send({msg:"Product Not found"})
//     // }
//     const {productIndex} = req
//     products.splice(productIndex,1)

//     return res.status(200).send({msg:"Deleted successfully.!"})
// })

// VALIDATION
app.post("/api/products", checkSchema(createProductValidationSchema), (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ error: result.array() });
  }

  const body = matchedData(req);  // FIXED
  console.log(body);

  const new_product = {
    id: products[products.length - 1].id + 1,
    ...body,
  };

  products.push(new_product);

  return res.status(201).send(new_product);
});
app.listen(port,()=>{
    console.log("App running:",port)
})