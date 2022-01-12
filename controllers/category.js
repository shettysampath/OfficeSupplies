const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");
const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category)
      return res.status(400).json({ error: "The category does not exist" });
    req.category = category;
    next();
  });
};

exports.getAll = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) return res.status(400).json({ error: errorHandler(err) });
    res.json(data);
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.photo = (req, res, next) => {
  if (req.category.photo.data) {
    res.set("Content-Type", req.category.photo.contentType);
    return res.send(req.category.photo.data);
  }
  next();
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    console.log("Files : ", files);
    let category = new Category(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1 MB in size",
        });
      }

      category.photo.data = fs.readFileSync(files.photo.path);
      console.log(files.photo);
      category.photo.contentType = files.photo.type;
    }

    category.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
