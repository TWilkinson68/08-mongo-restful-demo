// VIEW CONTROLLER

//var ObjectId = require("mongodb").ObjectId;
const dbo = require("../db/connection");
var ObjectId = dbo.getObjectId();

module.exports = {
  index: function (req, res) {
    console.dir(req.session);
    return res.render("index", {
      title: "Welcome",
      message: "Demo Node Site.",
    });
  },

  main: function (req, res) {
    return res.render("main", {
      title: "EJS Example from Parts",
      message: "Hello Template built in parts",
      showMsg: true,
      headingOne: "Page made from parts",
    });
  },
  // async as waiting for connection details
  viewAll: async function (req, res) {
    dbo
      .getDb()
      .collection("filmsCollection")
      .find({})
      .toArray(function (err, docs) {
        //console.dir(docs)
        if (err) {
          console.error(err);
        }
        return res.render("films", {
          title: "All Films",
          films: docs,
        });
      });
  },

  viewAllJSON: function (req, res) {
    console.info("View All JSON controller");
    dbo
      .getDb()
      .collection("filmsCollection")
      .find({})
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        res.json(docs);
      });
  },

  getJSon: function(req, res){
    console.info(JSON)
    dbo
    .getDb()
    .collection("filmsCollection")
    .find({JSON})
    .toArray(function(err, docs){
      if(err){
        console.error(err);
      }
      res.json(docs)
    })
  },

  getItem: async function (req, res, view, viewTitle) {
    console.info("Get Item controller");
    let filmID = req.params.filmID;
    var o_id = new ObjectId(filmID);

    dbo
      .getDb()
      .collection("filmsCollection")
      .find({ _id: o_id })
      .toArray(function (err, docs) {
        if (err) {
          console.error(err);
        }
        console.dir(docs);
        return res.render(view, {
          title: `${viewTitle} ${docs[0].filmTitle}`,
          film: docs[0],
        });
      });
  },

  searchResults: function (req, res) {
    console.info("View All controller");
    var searchVal = req.query.searchVal;
    console.info(searchVal);

    dbo
      .getDb()
      .collection("filmsCollection")
      .find({ filmTitle: { $regex: new RegExp(searchVal, "i") } })
      .toArray(function (err, docs) {
        // console.dir(docs);
        if (err) {
          console.error(err);
        }
        return res.render("films", {
          title: "Search Results for " + searchVal,
          searchMsg: `Your Search Found ${docs.length} films.`,
          films: docs,
        });
      });
  },

  cms: function (req, res) {
    console.info("CMS List controller");
    dbo
      .getDb()
      .collection("filmsCollection")
      .find({})
      .toArray(function (err, docs) {
        //console.dir(docs)
        if (err) {
          console.error(err);
        }
        return res.render("cms", {
          title: "All Films",
          films: docs,
        });
      });
  },

  insert: function (req, res) {
    return res.render("insert", {
      title: "Add Film",
    });
  },

  insertItem: function (req, res) {
    console.info("Insert Form Post controller");
    var newFilm = req.body;
    dbo
      .getDb()
      .collection("filmsCollection")
      .insertOne(newFilm, function (err, dbResp) {
        if (err) {
          console.error(err);
        }
        if (dbResp.acknowledged === true) {
          res.redirect("/cms/");
        } else {
          res.redirect("/cms/error");
        }
      });
  },

  amendItem: function (req, res) {
    console.info(" Amend POST controller");
    var amendFilm = req.body;
    let filmID = amendFilm.id;
    var o_id = new ObjectId(filmID);
    dbo
      .getDb()
      .collection("filmsCollection")
      .updateOne(
        { _id: o_id },
        {
          $set: {
            filmTitle: amendFilm.filmTitle,
            filmCertificate: amendFilm.filmCertificate,
            filmDescription: amendFilm.filmDescription,
            filmImage: amendFilm.filmImage,
            filmPrice: amendFilm.filmPrice,
            filmReview: amendFilm.filmReview,
            releaseDate: amendFilm.releaseDate,
          },
        },
        function (err, dbResp) {
          if (err) {
            console.error(err);
          }
          if (dbResp.modifiedCount === 1) {
            res.redirect("/cms");
          } else {
            res.redirect("/cms/error");
          }
        }
      );
  },
  deleteItem: function (req, res) {
    console.info("Delete Form controller");
    var formData = req.body;
    let filmID = formData.filmID;
    var o_id = new ObjectId(filmID);
    console.info(filmID);
    console.dir(o_id);
    dbo
      .getDb()
      .collection("filmsCollection")
      .deleteOne({ _id: o_id }, function (err, dbResp) {
        if (err) {
          console.error(err);
        }
        console.dir(dbResp);
        if (dbResp.deletedCount == 1) {
          res.redirect("/cms");
        } else {
          res.redirect("/cms/error");
        }
      });
  },
};
