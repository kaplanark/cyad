const Product = require("../models/product");

const newProduct = async (req,res) => {
  try {
    const { title, description, date, totalAmount } = req.body;
    let image = req.file.buffer.toString("base64");
    if (!(title && description  && image && date && totalAmount)) {
      res.status(400);
      req.flash("message","tüm girişleri kontrol edin");

    }
    const product = await Product.create({
      title,
      description,
      image: image,
      date,
      totalAmount,
      remainingAmount: totalAmount,
    });
    req.flash("message","Ürün Kaydedildi");
    res.status(201).redirect("/admin");
  } catch (error) {
    console.log(error);
  }
};

const seeProduct = async (req,res) => {
  Product.findById(req.params.productid)
    .then((found) => {
      res.render("pages/show", {found: found });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

const allProduct = async (req,res) => {
    Product.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.render("admin/product/all", { found: found });
    }
  });
};

const deleteProduct = async (req,res) => {
    Product.deleteOne({ _id: req.params.productid }, (err, post) => {
    if (err) {
      res.send(err);
    } else {
      req.flash("success", "Transaction successful");
      res.redirect("/admin/allproducts");
    }
  });
};

const editProduct = async (req,res) => {
    Product.findById(req.params.productid)
    .then((found) => {
      res.render("admin/product/edit", { found: found });
    })
    .catch((err) => {
      res.send(err);
    });
};

const updateProduct = async (req,res) => {
  const { id, title, description, date, totalAmount } = req.body;
  let image  = req.file.buffer.toString("base64");
  let updateproduct = {
    title,
    description,
    image: image,
    date,
    totalAmount,
  };
  await Product.findByIdAndUpdate({ _id: id }, updateproduct)
    .then((updateproduct) => {
      req.flash("message","Ürün Güncellendi")
      res.status(201).redirect("/admin/allproducts");
    })
    .catch((err) => {
      console.log(err);
      req.flash("error","Ürün Güncelleme Başarısız");
      res.redirect("/admin/allproducts");
    });
};

module.exports = {
  newProduct,
  seeProduct,
  deleteProduct,
  editProduct,
  updateProduct,
  allProduct,
};
