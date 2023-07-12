const promotion = require("../promotion.json");
const {
  dateRule,
  moreDate,
  productListPromo,
  moreThan
} = require("../promotionRules/promotionRules");

function checkAndAplyPromotion(req, res, next) {
  try {
    const query = req.query;
    let product = res.locals.product

    if (!product) {
      throw { error: `product ${product.name} not available` }
    }
    query.price = product.price
    query.name = product.name
    if (!product?.promotion) {
      next();
    } else {
      let promo = promotion.filter(function (element) {
        return element.id === product.promotionId;
      });


      if (promo[0].rule == "date") {
        const data = dateRule(promo[0], query, product, promo[0])
        return res.send(data);
      }
      if (promo[0].rule == "more then & date") {
        return res.send(moreDate(promo[0], query, product, promo[0]));
      }
      if (promo[0].rule == "more then") {
        return res.send(moreThan(promo[0], query, product, promo[0]));
      }
      if (promo[0].rule == "product List") {
        return res.send(productListPromo(promo[0], query, product, promo[0]));
      }
    }
  } catch (error) {
    // console.log(error)
    res.send(error)
  }
}

module.exports = {
  checkAndAplyPromotion,
};
