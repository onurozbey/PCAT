// 3rd party modules
const express = require("express");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
// core modules
// custom modules
const PageController = require("./controllers/PageController");
const PhotoController = require("./controllers/PhotoController");

const app = express();

// connect db
mongoose.connect("mongodb://localhost/pcat-test-db");

// Template engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["GET", "POST"],
  })
);

// -- PHOTO OPERATIONS

// Index - getting all photos
app.get("/", PhotoController.getAllPhotos);

// Photo detail page - getting a single photo and its details by id
app.get("/photos/:id", PhotoController.getPhoto);

// Create photo - get the photo that uploaded from web
app.post("/photos", PhotoController.createPhoto);

// Update photo and after
app.put("/photos/:id", PhotoController.updatePhoto);

// Delete photo and after redirect
app.delete("/photos/:id", PhotoController.deletePhoto);

// --- PAGES ---

// About
app.get("/about", PageController.getAboutPage);

// Add
app.get("/add", PageController.getAddPage);

// Edit photo
app.get("/photos/edit/:id", PageController.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is active at ${port}.`);
});
