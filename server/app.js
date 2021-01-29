const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

console.log(process.env.DB_HOST);
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const credentials = {
  gmail: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
};
var emailService = require("./lib/email.js")(credentials);
//
// 正在測試的訂單寫入

app.post("/shoppingcart", function (req, res) {
  var getinsertId = "";
  const sqlInsert =
    "INSERT INTO cool_order (order_no, member_no, name, receiver_address, receiver_cellphone, pickup_store, invoice, date, price, status, coupon) " +
    "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, '1', ?) ";
  const sqlInsert2 =
    "INSERT INTO cool_order_detailed ( order_id,product_id,name,amount,size,brand,color,price ) VALUES ( ?,?,?,?,?,?,?,? ) ";

  console.log(req.body.data);
  db.query(
    sqlInsert,
    [
      req.body.orderno,
      req.body.member_no,
      req.body.name,
      req.body.addresseeaddress,
      req.body.addresseecellphone,
      req.body.pickup_store,
      req.body.invoice,
      req.body.date,
      req.body.price,
      req.body.coupon,
    ],
    (err, result, fields) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
      getinsertId = result.insertId;
      for (let i = 0; i < req.body.data.length; i++) {
        db.query(
          sqlInsert2,
          [
            getinsertId,
            req.body.data[i].id,
            req.body.data[i].name,
            req.body.data[i].amount,
            req.body.data[i].size,
            req.body.data[i].brand,
            req.body.data[i].color,
            req.body.data[i].price,
          ],
          (err, result, fields) => {
            if (err) {
              res.send({ err: err });
            }
          }
        );
      }
    }
  );
  // -------------
});

// 商品首頁 get
app.get("/product", function (req, res) {
  db.query("SELECT * FROM product", "", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(JSON.stringify(result));
  });
});

// 商品詳細頁 get product_image
app.get("/detail/:brand/:id", function (req, res) {
  db.query(
    // 兩張表成功
    "SELECT * FROM product INNER JOIN product_images ON product.id = product_images.product_id  WHERE product.id =" +
      req.params.id +
      " ORDER BY color",

    (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      res.send(JSON.stringify(result));
    }
  );
});

// 商品詳細頁 get favorites
app.get("/detail/favorite/:userId/:productId", function (req, res) {
  db.query(
    "SELECT * FROM favorites WHERE member_no = " + req.params.userId + "",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(JSON.stringify(result));
    }
  );
});

// 商品詳細頁 post favorites
app.post("/detail/favorite/:userId/:productId", function (req, res) {
  db.query(
    "INSERT INTO favorites (member_no ,product_no ,valid) VALUES (" +
      req.params.userId +
      "," +
      req.params.productId +
      ", 1)",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      // res.send(JSON.stringify(result));
    }
  );
});

// 商品詳細頁 post favorites
app.put("/detail/favorite/:userId/:productId", function (req, res) {
  db.query(
    "UPDATE favorites SET valid = 1 WHERE member_no = " +
      req.params.userId +
      " AND product_no = " +
      req.params.productId +
      "",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      // res.send(JSON.stringify(result));
    }
  );
});

// 商品詳細頁 post product_stock
app.post("/detail/:brand/:id", function (req, res) {
  db.query(
    "SELECT * FROM product INNER JOIN product_stock ON product.id = product_stock.product_id  WHERE product.id =" +
      req.params.id +
      " ORDER BY color , size",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      res.send(JSON.stringify(result));
    }
  );
});

//clothing
app.get("/clothing", function (req, res) {
  db.query(
    "SELECT * FROM pages_data WHERE clothing_id != '' ORDER BY CONVERT(clothing_id,SIGNED ) ",
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      res.send(JSON.stringify(result));
    }
  );
});

//clothing
app.get("/clothing/:id", function (req, res) {
  db.query(
    "SELECT * FROM product " + "WHERE clothing_id = ? ORDER BY category",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send(JSON.stringify(result));
    }
  );
});

//clothingBackstage
app.get("/clothingBackstage/:category", function (req, res) {
  db.query(
    "SELECT DISTINCT brand FROM product " + "WHERE category = ?",
    [req.params.category],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send(JSON.stringify(result));
    }
  );
});
app.get("/clothingBackstage/:brand/:category", function (req, res) {
  db.query(
    "SELECT name FROM product " + "WHERE brand = ? AND category = ?",
    [req.params.brand,req.params.category],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send(JSON.stringify(result));
    }
  );
});


// 會員登錄 註冊 忘記密碼
app.post("/profile/:logintype", function (req, res) {
  if ("login" === req.params.logintype) {
    if (req.body.account.length === 0) {
      res.send({ message: "請輸入帳號" });
      return;
    } else if (req.body.password.length === 0) {
      res.send({ message: "請輸入密碼" });
      return;
    } else {
      const sqlSelect =
        "SELECT id, CASE name WHEN '' THEN 'Hi' ELSE name END AS name,account,password,phone,email,address,birth,letter,type " +
        "FROM member " +
        "WHERE account = ? and password = ? and type = 'N' ";
      db.query(
        sqlSelect,
        [req.body.account, req.body.password],
        (err, result, fields) => {
          if (err) res.send({ err: err });

          if (result.length > 0) {
            const sqlSelect2 =
              "SELECT a.id, CASE a.name WHEN '' THEN 'Hi' ELSE a.name END AS name,a.account,a.password,a.phone,a.email,a.address,a.birth,a.letter,a.type " +
              ", IFNULL(SUM(b.price),0) AS total " +
              "FROM member a LEFT JOIN cool_order b ON a.id = b.member_no " +
              "WHERE a.account = ? and a.password = ? and a.type = 'N' ";
            db.query(
              sqlSelect2,
              [req.body.account, req.body.password],
              (err, result, fields) => {
                if (err) res.send({ err: err });

                if (result.length > 0) res.send(result);
              }
            );
          } else {
            res.send({ message: "帳號 / 密碼錯誤" });
          }
        }
      );
    }
  } else if ("signup" === req.params.logintype) {
    if (req.body.account.length === 0) {
      res.send({ message: "請輸入帳號" });
    } else if (req.body.password.length === 0 && req.body.type === "N") {
      res.send({ message: "請輸入密碼" });
    } else if (req.body.email.length === 0) {
      res.send({ message: "請輸入信箱" });
    } else {
      const sqlSelect = "SELECT * FROM member WHERE account = ? ";
      db.query(sqlSelect, [req.body.account], (err, result, fields) => {
        if (err) res.send({ err: err });

        if (result.length > 0) {
          res.send({ message: "帳號已存在" });
        } else {
          const sqlSelect = "SELECT * FROM member WHERE email = ? ";
          db.query(sqlSelect, [req.body.email], (err, result, fields) => {
            if (err) res.send({ err: err });
            if (result.length > 0) {
              res.send({ message: "此EMAIL已註冊" });
            } else {
              const sqlInsert =
                "INSERT INTO member (account, password, email, letter, type) " +
                "VALUES (?, ?, ?, ?, 'N') ";
              db.query(
                sqlInsert,
                [
                  req.body.account,
                  req.body.password,
                  req.body.email,
                  req.body.letter,
                ],
                (err, result, fields) => {
                  if (err) {
                    res.send({ err: err });
                  }
                  res.send(result);
                }
              );
            }
          });
        }
      });
    }
  } else if ("certificate" === req.params.logintype) {
    if (req.body.email.length === 0) res.send({ message: "請輸入信箱" });
    else {
      const sqlSelect = "SELECT * FROM member WHERE email = ? and type = 'N' ";
      db.query(sqlSelect, [req.body.email], (err, result, fields) => {
        if (err) res.send({ err: err });

        if (result.length > 0) {
          const sqlUpdate =
            "UPDATE member SET password = ? WHERE id = ? and type = 'N' ";
          db.query(
            sqlUpdate,
            ["00000000", result[0].id],
            (err, result, fields) => {
              if (err) {
                res.send({ err: err });
                return;
              }
            }
          );
          emailService.send(
            `"COOL" <${process.env.EMAIL}>`,
            `"${result[0].name}" <${result[0].email}>`,
            "COOL 取回密碼",
            "<h1>Hello</h1><p>你的密碼是00000000</p>"
          );
          res.send(result);
        } else {
          const sqlSelect =
            "SELECT * FROM member WHERE email = ? and type = 'G' ";
          db.query(sqlSelect, [req.body.email], (err, result, fields) => {
            if (err) res.send({ err: err });

            if (result.length > 0) {
              res.send({ message: "請使用Google登入" });
            } else {
              res.send({ message: "EMAIL不存在" });
            }
          });
        }
      });
    }
  } else if ("googlelogin" === req.params.logintype) {
    // console.log(req.body.name);
    const sqlSelect =
      "SELECT id, CASE name WHEN '' THEN 'Hi' ELSE name END AS name,account,password,phone,email,address,birth,letter,type " +
      "FROM member " +
      "WHERE email = ? and type = 'G' ";
    // console.log(req.body.email);
    db.query(sqlSelect, [req.body.email], (err, result, fields) => {
      if (err) res.send({ err: err });

      if (result.length > 0) {
        const sqlSelect2 =
          "SELECT a.id, CASE a.name WHEN '' THEN 'Hi' ELSE a.name END AS name,a.account,a.password,a.phone,a.email,a.address,a.birth,a.letter,a.type " +
          ", IFNULL(SUM(b.price),0) AS total " +
          "FROM member a LEFT JOIN cool_order b ON a.id = b.member_no " +
          "WHERE a.email = ? and a.type = 'G' ";
        db.query(sqlSelect2, [req.body.email], (err, result, fields) => {
          if (err) res.send({ err: err });

          if (result.length > 0) res.send(result);
        });
      } else {
        const sqlInsert =
          "INSERT INTO member (name, account, password, email, letter, birth, phone, address, type) " +
          "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ";
        db.query(
          sqlInsert,
          [
            req.body.name,
            req.body.account + req.body.birth2,
            req.body.password,
            req.body.email,
            req.body.letter,
            req.body.birth,
            req.body.phone,
            req.body.address,
            req.body.type,
          ],
          (err, result, fields) => {
            if (err) {
              res.send({ err: err });
            }
            const sqlSelect =
              "SELECT a.id, CASE a.name WHEN '' THEN 'Hi' ELSE a.name END AS name,a.account,a.password,a.phone,a.email,a.address,a.birth,a.letter,a.type " +
              ", IFNULL(SUM(b.price),0) AS total " +
              "FROM member a LEFT JOIN cool_order b ON a.id = b.member_no " +
              "WHERE a.email = ? and a.type = 'G' ";
            db.query(sqlSelect, [req.body.email], (err, result, fields) => {
              if (err) res.send({ err: err });

              if (result.length > 0) {
                res.send(result);
              }
            });
          }
        );
      }
    });
  }
});

// 訂單紀錄
app.get("/member/order/:status", function (req, res) {
  let status = "";
  if ("processing" === req.params.status) status = 1;
  if ("solved" === req.params.status) status = 2;
  if ("refundlist" === req.params.status) status = 3;
  const sqlSelect =
    "SELECT * FROM cool_order WHERE status = ? and member_no = ? ";
  db.query(sqlSelect, [status, req.query.memberNo], (err, result, fields) => {
    res.send(result);
  });
});

// 會員等級
app.get("/member/member", function (req, res) {
  const sqlSelect =
    "SELECT COUNT(id) AS count, IFNULL(SUM(price), 0) AS total " +
    "FROM cool_order " +
    "WHERE member_no = ? ";
  db.query(sqlSelect, [req.query.memberNo], (err, result, fields) => {
    res.send(result);
    // console.log(result)
  });
});

// 訂單紀錄
app.get("/member/orderdetail", function (req, res) {
  const sqlSelect =
    "SELECT a.order_no, b.product_id, b.name, b.amount, b.size, b.brand, b.color, b.price " +
    "FROM cool_order a , cool_order_detailed b " +
    "WHERE a.id = b.order_id AND a.member_no = ? ";
  db.query(sqlSelect, [req.query.memberNo], (err, result, fields) => {
    res.send(result);
    // console.log(result)
  });
});

// 蒐藏清單
app.get("/member/favorites", function (req, res) {
  const sqlSelect =
    "SELECT favorites.id AS fav_ID,  product.id AS pro_ID, CONCAT(product.brand,'^',product.name) AS name, product.brand, product.price, product.image " +
    "FROM favorites " +
    "INNER JOIN product on favorites.product_no = product.id " +
    "WHERE favorites.member_no = ? AND favorites.valid = ? ";
  db.query(
    sqlSelect,
    [req.query.memberNo, req.query.valid],
    (req, result, fields) => {
      res.send(result);
      // console.log(result);
    }
  );
});

app.delete("/member/favorites", function (req, res) {
  const sqlDelete = "UPDATE favorites SET valid = ? WHERE id = ? ";
  db.query(sqlDelete, [req.body.valid, req.body.id], (req, result, fields) => {
    res.send(result);
  });
});

// 帳號設定
app.get("/member/setting", function (req, res) {
  const sqlSelect =
    "SELECT name, account, password, phone, email, address, DATE_FORMAT(birth, '%Y-%m-%d') as birth, type " +
    "FROM member " +
    "WHERE id = ? ";
  db.query(sqlSelect, [req.query.id], (req, result, fields) => {
    res.send(result);
  });
});

app.put("/member/setting", function (req, res) {
  const sqlUpdate =
    "UPDATE member SET name = ?, password = ?, phone = ? , email = ? , address = ? , birth = ? " +
    "WHERE id = ? ";
  db.query(
    sqlUpdate,
    [
      req.body.name,
      req.body.password,
      req.body.phone,
      req.body.email,
      req.body.address,
      req.body.birth,
      req.body.id,
    ],
    (req, result, fields) => {
      res.send(result);
    }
  );
});

//優惠券
app.get("/member/coupon", function (req, res) {
  const sqlSelect =
    "SELECT * FROM coupon " +
    "WHERE coupon.code NOT IN (SELECT cool_order.coupon FROM cool_order WHERE cool_order.member_no = ?) " +
    "ORDER BY coupon.amount DESC ";
  db.query(sqlSelect, [req.query.id], (req, result, fields) => {
    res.send(result);
  });
});

// 聯絡我們
app.post("/member/contact", function (req, res) {
  const sqlInsert =
    "INSERT INTO contact ( email, service, subject, content) " +
    "VALUES (?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [req.body.email, req.body.service, req.body.subject, req.body.content],
    (req, result, fields) => {
      res.send(result);
    }
  );
});

//news
app.get("/news", function (req, res) {
  db.query(
    "SELECT * FROM pages_data WHERE news_id != '' ORDER BY CONVERT(news_id,SIGNED ) ",
    [],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      // console.log(result);
      res.send(JSON.stringify(result));
    }
  );
});

//營運分析 基本報表
app.get("/dashboard/report/orderlist", function (req, res) {
  const sqlSelect =
    "SELECT id, order_no, date, name, receiver_cellphone AS phone, price " +
    ", CASE status WHEN '1' THEN '處理中' WHEN '2' THEN '已完成' WHEN '3' THEN '申請退款' ELSE '' END AS status " +
    "FROM cool_order ";
  db.query(sqlSelect, [], (req, result, fields) => {
    res.send(result);
  });
});

//營運分析 基本報表
app.get("/dashboard/report/orderdetail", function (req, res) {
  const sqlSelect =
    "SELECT * " +
    "FROM cool_order_detailed " +
    "ORDER BY order_id, CAST(product_id AS signed) ";
  db.query(sqlSelect, [], (req, result, fields) => {
    res.send(result);
  });
});

//營運分析 基本報表
// app.get("/dashboard/report/orderlist/chart", function (req, res) {
//   const time = req.query.time
//   const type = req.query.type === 'REVENUE' ? 'SUM(price)' : req.query.type === 'ORDERCOUNT' ? ' COUNT(id)' : ''
//   console.log(type)
//   const sqlSelect =`
//     SELECT YEAR(date) AS year, MONTH(date) AS time, ${type} AS sum 
//     FROM cool_order 
//     WHERE YEAR(date) in (?, ?) 
//     GROUP BY YEAR(date), ${time}(date) 
//     ORDER BY year, time
//     `;
//     db.query(sqlSelect, [req.query.year, req.query.lastyear], (req, result, fields) => {
//       res.send(result);
//     });
// });

//營運分析 基本報表
app.get("/dashboard/report/orderlist/chart", function (req, res) {
  const sqlSelect =`
    SELECT YEAR(date) AS year, MONTH(date) AS time, SUM(price) AS price, COUNT(id) AS sum 
    FROM cool_order 
    WHERE YEAR(date) in (?, ?) 
    GROUP BY YEAR(date), MONTH(date) 
    ORDER BY year, time
    `;
    db.query(sqlSelect, [req.query.year, req.query.lastyear], (req, result, fields) => {
      res.send(result);
    });
});

//營運分析 基本報表
app.get("/dashboard/report/orderlist/doughnutandpie", function (req, res) {
  const sort = req.query.sort
  const sqlSelect =`
    SELECT ${sort}, SUM(amount) AS amount, ROUND(SUM(amount)/(SELECT SUM(amount) FROM cool_order_detailed)*100, 2) AS percent
    FROM cool_order_detailed 
    GROUP BY ${sort}
    ORDER BY amount DESC
    `;
    db.query(sqlSelect, [], (req, result, fields) => {
      res.send(result);
    });
});

app.listen(3001, () => {
  console.log("port 3001");
});
