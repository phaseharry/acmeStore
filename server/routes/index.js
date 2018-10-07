const express = require('express')
const { Product, Order, LineItem } = require('../db').models

const router = express.Router()

router.get('/products', (req, res, next) => {
    Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

router.get('/orders', async (req, res, next) => {
    const attr = {
        status: 'CART'
    }
    try{
        let cart = await Order.findOne({where: attr});
        if(!cart){
            cart = await Order.create(attr)
        }
        const orders = await Order.findAll({
            include: [LineItem],
            order: [['createdAt', 'DESC']]
        })
        res.send(orders)
    }
    catch(ex){
        next(ex)
    }
})

//update line item
router.put('orders/:orderId/lineItems/:id', (req, res, next) => {
    LineItem.findById(req.params.id)
    .then(lineItem => lineItem.update(req.body))
    .then(lineItem => res.send(lineItem))
    .catch(next)
})

//delete line item
router.delete('/orders/:orderId/lineItems/:id', (req, res, next) => {
    LineItem.destroy({
        where: {
            orderId: req.params.orderId,
            id: req.params.id
        }
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

//create line item 
router.post('/orders/:orderId/lineItems', (req, res, next) => {
    LineItem.create({ orderId: req.params.orderId, quantity: req.body.quantity, productId: req.body.productID})
    .then(lineItem => res.send(lineItem))
    .catch(next)
})

//update order
router.put('/orders/:id', (req, res, next) => {
    Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(order => res.send(order))
    .catch(next)
})

module.exports = router