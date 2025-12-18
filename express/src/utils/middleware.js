const {products, users} = require('./constant')

const getById = (req,res,next) =>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).send({msg:"Invalid Id"})
    }
    console.log(id)
    const productIndex = products.findIndex((product)=> product.id === id);
    if(productIndex === -1){
        return res.status(400).send({msg:"Product Not found"})
    }
    req.productIndex = productIndex
    next()
}

const getUserById = (req,res,next) =>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).send({msg:"Invalid Id"})
    }
    const userIndex = users.findIndex((u)=> u.id === id);
    if(userIndex === -1){
        return res.status(400).send({msg:"User Not found"})
    }
    req.userIndex = userIndex
    next()
}

module.exports = {
  getById,
  getUserById,
};
