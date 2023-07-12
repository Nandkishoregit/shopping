const express = require('express')
const router = express.Router()
const productList = require('../product.json')
const purchase = require('../purchase.json')

const { checkAndAplyPromotion } = require('../middlewares/checkAndAplyPromotion')
const { noPromotion } = require('../middlewares/noPromotion')
const { checkAmmount, confirmPurchase } = require('../middlewares/postPurchase')
const { checkProductAmount } = require('../middlewares/checkAmount')
const { slow } = require('../middlewares/slow')
router.get('/getAllProducts', async (req, res) => {

    try {
        return res.send(productList)
    } catch (error) {

    }
})

//this is a middle ware which chains a set of function and the function
//are executed in the given order 
router.get('/getProductByName', slow, checkProductAmount, checkAndAplyPromotion, noPromotion)


router.get('/getAllPurchase', async (req, res) => {
    try {
        res.send(purchase)
    } catch (error) {

    }
})

router.post('/postPurchase', checkAmmount, confirmPurchase)





module.exports = app => app.use('/product', router)