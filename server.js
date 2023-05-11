var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
require('dotenv').config()
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'mydb'
// });
const connection = mysql.createConnection(process.env.DATABASE_URL)
var app = express()
app.use(cors())
app.use(express.json())

app.get('/users', function (req, res, next) {
    connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            res.json(results);
        }
    );
})

app.get('/users/:id', function (req, res, next) {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [id],
        function (err, results) {
            res.json(results);
        }
    );
})

app.post('/users', function (req, res, next) {
    connection.query(
        'INSERT INTO `users`(`fname`, `lname`, `username`, `password`) VALUES (?, ?, ?, ?)',
        [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar],
        function (err, results) {
            res.json(results);
        }
    );
})

app.put('/users', function (req, res, next) {
    connection.query(
        'UPDATE `users` SET `fname`= ?, `lname`= ?, `username`= ?, `password`= ?  WHERE id = ?',
        [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.id],
        function (err, results) {
            res.json(results);
        }
    );
})

app.delete('/users', function (req, res, next) {
    connection.query(
        'DELETE FROM users WHERE id = ?',
        [req.body.id],
        function (err, results) {
            res.json(results);
        }
    );
})
////////////////////////////////////////////////////////////////////////////////////////////
//orders

app.get('/orders', function (req, res, next) {
    connection.query(
        'SELECT * FROM `orders`',
        function (err, results, fields) {
            res.json(results);
        }
    );
})

app.get('/orders/:order_ID', function (req, res, next) {
    const order_ID = req.params.order_ID;
    connection.query(
        'SELECT * FROM orders WHERE order_ID = ?',
        [order_ID],
        function (err, results) {
            res.json(results);
        }
    );
})

app.post('/orders', function (req, res, next) {
    connection.query(
        'INSERT INTO `orders`(`fname`,`lname`,`address`,`date`,`shipper_name`,`status`,`productCode`,`description`,`weight`) VALUES (?,?,?,?,?,?,?,?,?)',
        [req.body.fname, req.body.lname, req.body.address, req.body.date, req.body.shipper_name,
             req.body.status, req.body.productCode, req.body.description, req.body.weight],
        function (err, results) {
            res.json(results);
        }
    );
})

app.put('/orders', function (req, res, next) {
    connection.query(
        'UPDATE orders SET `fname`= ?,`lname`= ?,`address`= ? ,`date`= ? ,`shipper_name`= ? ,`status`= ? ,`productCode`= ? ,`description`= ? ,`weight`= ? WHERE order_ID = ?',
        [req.body.fname, req.body.lname, req.body.address, req.body.date, req.body.shipper_name, 
            req.body.status,req.body.productCode, req.body.description,req.body.weight,req.body.order_ID],
        function (err, results) {
            res.json(results);
        }
    );
})

app.delete('/orders', function (req, res, next) {
    connection.query(
        'DELETE FROM orders WHERE order_ID = ?',
        [req.body.order_ID],
        function (err, results) {
            res.json(results);
        }
    );

})

app.post('/login', function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
  
    connection.query(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      function(err, results) {
        if (err) {
          res.send({ err : err})
        }
  
        if (results.length > 0) {
        res.send({ results})
          
        }else{
        res.send({ message: "Wrong username or password"})
        }

    })
})

app.post('/track', function (req, res, next) {

    const productCode = req.body.productCode;
  
    connection.query(
      'SELECT * FROM orders WHERE productCode = ?',
      [productCode],
      function(err, results) {
        if (err) {
          res.send({ err : err})
        }
  
        if (results.length > 0) {
        res.send({ results})
          
        }else{
        res.send({ message: "Wrong username or password"})
        }

    })
})


app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000')
})