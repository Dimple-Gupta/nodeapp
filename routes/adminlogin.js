const { response } = require("express");
var express = require("express");
const { PayloadTooLarge } = require("http-errors");
var router = express.Router();
var pool = require("./pool");

router.get("/adminlogin", function (req, res, next) {
  res.render("adminlogin", { msg: "" });
});
router.post("/chklogin", function (req, res, next) {
  pool.query("select * from adminlogin where emailid=? and password=?",[req.body.emailid, req.body.password],function (err, result) {
      if (err) {
        res.render("adminlogin", { msg: "Server Error...."});
      }
      else {
        console.log(result);
        if (result.length == 1)
        { res.render("dashboard");}
        else
        {res.render("adminlogin", {msg: "Invalid Login Id/Password"});
        }
      }
    }
  );
});

module.exports = router;
