const express = require("express");

const router = express.Router();

// add myControllers
const myControllers = require("../controllers/controllers.js");

router.get("/", (req, res) => {
  myControllers.viewAll(req, res);
});

router.get("/api/allfilms", (req, res) => {
  myControllers.viewAllJSON(req, res);
});

router.get("/film/:filmID", (req, res) => {
  myControllers.getItem(req, res, "oneFilm", "View: ");
});

router.get("/search", (req, res) => {
  myControllers.searchResults(req, res);
});

// add POST, PUT AND DELETE ROUTES
router.get("/cms/", (req, res) => {
  myControllers.cms(req, res);
});

router.get("/cms/edit/:filmID", (req, res) => {
  myControllers.getItem(req, res, "edit", "Edit Film: ");
});

router.post("/cms/edit", (req, res) => {
  myControllers.amendItem(req, res);
});

router.get("/cms/insert", (req, res) => {
  myControllers.insert(req, res);
});

router.post("/cms/insert", (req, res) => {
  myControllers.insertItem(req, res);
});

router.get("/cms/delete/:filmID", (req, res) => {
  myControllers.getItem(req, res, "delete", "Delete Film: ");
});

router.get("/api/:film/:filmID", (req, res)=>{
  myControllers.getItem(req,res,)
})

router.post("/cms/delete", (req, res) => {
  myControllers.deleteItem(req, res);
});

module.exports = router;
