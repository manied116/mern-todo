const express = require("express");
const {getById} = require('../utils/middleware')
const {products} = require('../utils/constant')

const { createProductValidationSchema } =  require('../utils/validationSchema')
const {checkSchema,matchedData,validationResult} = require('express-validator')
const ProudctRouter = express.Router();



ProudctRouter.get("/", (req, res) => {
  console.log(req.session.id)
  req.sessionStore.get(req.session.id,(error,sessionData)=>{
    if(error){
      console.log(error)
    }else{
      console.log(sessionData)
    }
  })
  res.send({msg:"Root"})
});
ProudctRouter.get("/api/products", (req, res) => {
  // stop creating new session untill changes happen
  req.session.visited = true
  console.log(req.session.id)
  const {query:{filter,value}} = req;
    if(filter && value){
        return res.send(products.filter((product)=> product[filter].includes(value)));
    }
    res.send(products);
});

ProudctRouter.post("/api/products", checkSchema(createProductValidationSchema), (req, res) => {
  const result = validationResult(req);
    console.log(result)
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

ProudctRouter.get("/api/products/:id",(req,res)=>{
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

ProudctRouter.put("/api/products/:id",getById,(req,res)=>{
    const id = parseInt(req.params.id);
    const {body,productIndex} = req;
    products[productIndex] = {id:id,...body}
    console.log(body)
    return res.status(200).send({msg:"Product updated successfully.!"})
})

module.exports = ProudctRouter; // ✔ This is correct
