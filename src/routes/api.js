const mysql = require("mysql");
const dbconfig = require(__dirname + "/../config/database");
const conn = mysql.createConnection(dbconfig);
const router = require("express").Router();

conn.connect();

router.get("/home", function(req, res) {
  let storeQuery = "select * from crawl_store;";
  let storeArr = [];

  conn.query(storeQuery, function(err, rows) {
    if (err) {
      res.send(err);
    }

    for (let index = 0; index < rows.length; index++) {
      const store = {
        id: rows[index].id,
        name: rows[index].name,
      };
      storeArr.push(store);
    }

    res.send(storeArr);
  });
});

router.get("/store/:storeId/menu", function(req, res) {
  var storeId = req.params.storeId;

  var menuQuery =
    " select cs.name as 'storeName', " +
    "       cc.name as 'categoryName', " +
    "         cm.name as 'menuName', " +
    "         cm.price as 'price', " +
    "         cm.image as image, " +
    "         cc.id as 'categoryId' " +
    " from crawl_menu as cm " +
    " join crawl_category as cc on cm.category_id = cc.id " +
    " join crawl_store as cs on cm.store_id = cs.id " +
    " where cm.store_id = ? ;";

  conn.query(menuQuery, storeId, function(err, rows) {
    if (err) {
      res.send(err);
    }

    let result = [];
    let menuListObject = [];

    for (let index = 0; index < rows.length; index++) {
      const categoryId = rows[index].categoryId; // 1

      let menu = {
        name: rows[index].menuName,
        price: rows[index].price,
        image: rows[index].image,
      };
      menuListObject.push(menu);

      if (index < rows.length - 1) {
        if (categoryId !== rows[index + 1].categoryId) {
          result.push({
            category: rows[index].categoryName,
            menu: menuListObject,
          });
          menuListObject = [];
        }
      } else if (index === rows.length - 1) {
        result.push({
          category: rows[index].categoryName,
          menu: menuListObject,
        });
      }
    }

    res.send(result);
  });
});

module.exports = router;
