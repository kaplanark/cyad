const Payment = require("../models/payment");
const Product = require("../models/product");
const telegramBot = require("../helper/telegrambot");
const Iyzipay = require('iyzipay');
const dotenv = require("dotenv");
const moment = require("moment");
dotenv.config();

var iyzipay = new Iyzipay({
  apiKey: process.env.IYZIPAY_API_KEY,
  secretKey: process.env.IYZIPAY_SECRET_KEY,
  uri: process.env.IYZIPAY_URI
});

const makePayment = async (req, res) => {
  try {
    const { name, surname, email,phone, paidPrice, cardHolderName, cardNumber, date, cvc, productId } = req.body;
    if (!(name && surname && email && phone && paidPrice && cardHolderName && cardNumber && date && cvc && productId)) {
      res.status(400);
      req.flash("message", "Tüm Girişleri Kontrol Edin");
    }
    let month = date.split('/')[0];
    let year = date.split('/')[1];
    var request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: '123456789',
      price: paidPrice,
      paidPrice: paidPrice,
      currency: Iyzipay.CURRENCY.TRY,
      installment: '1',
      paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      paymentCard: {
        cardHolderName: cardHolderName,
        cardNumber: cardNumber,
        expireMonth: month,
        expireYear: `20${year}`,
        cvc: cvc,
        registerCard: '0'
      },
      buyer: {
        id: productId + name + surname,
        name: name,
        surname: surname,
        identityNumber: '74300864791',
        email: email,
        lastLoginDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        registrationDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        ip: '85.34.78.112',
        city: 'Istanbul',
        country: 'Turkey',
        zipCode: '34732'
      },
      shippingAddress: {
        contactName: 'Jane Doe',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34742'
      },
      billingAddress: {
        contactName: 'Jane Doe',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34742'
      },
      basketItems: [
        {
          id: productId,
          name: 'Binocular',
          category1: 'Collectibles',
          category2: 'Accessories',
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: paidPrice,
        },
      ]
    };
    iyzipay.payment.create(request, function (err, result) {
      result.status === 'success' ?
        paymentSuccess(result) : paymentFailed(result);
    });
    const paymentSuccess = async (result) => {
      await Payment.create({ name, surname, email,phone, paidPrice, productId, date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss") });
      var remainingAmount = await Product.findById({ _id: productId }, 'remainingAmount').exec();
      await Product.findByIdAndUpdate({ _id: productId }, { remainingAmount: remainingAmount?.remainingAmount - paidPrice });
      req.flash("success", "Bağışınız Başarılı");
      res.redirect("/");
      telegramBot.sendPayment(paidPrice);
    }
    const paymentFailed = (result) => {
      req.flash("error", "Ödemeniz Başarısız")
      res.redirect("/");
    }

  } catch (err) {
    console.log(err);
  }
}

const allPayment = async (req, res) => {
  Payment.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.render('admin/payment/all', { found: found });
    }
  });
}

const deletePayment = async (req,res)=>{
  Payment.deleteOne({ _id: req.params.pyid }, (err, post) => {
    if (err) {
      res.send(err);
    } else {
      req.flash("success", "İşlem Başarılı");
      res.redirect("/allpayment");
    }
  });
}

module.exports = {
  makePayment,
  allPayment,
  deletePayment
};
