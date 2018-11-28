const express = require('express')
const app = express()
const port = 8000
var mysql = require('mysql')
var cors = require('cors')
var fileUpload = require('express-fileupload')
var base64Img = require('base64-img');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aniruddh97',
    database: 'photography'
});
app.use(cors())

app.get('/', (req, res, next) => {
    category = req.query.category;
    // base64Img.base64('/home/devil/Downloads/Saatmiseks/Owl/6.jpg', function (err, data) {
    //     connection.query(`INSERT INTO images (image, category) VALUES ("${data}", "Owl");`, function (err, rows, fields) {
    //         if (err) {
    //             console.log(err, 'error')
    //         }
    //         else {
    //             console.log(rows, 'rows')
    //             // var finalRow = []
    //             // rows.map((data, index) => {
    //             //     var buffer = new Buffer(data.image, "base64")
    //             //     var bufferBase64 = buffer.toString('base64');
    //             //     finalRow.push({ id: data.id, image: bufferBase64 })
    //             // })
    //             // res.send(finalRow)
    //         }
    //     })
    // })

    connection.query(`SELECT id, image from images where category = "${category}";`, function (err, rows, fields) {
        if (err) {
            console.log(err)
        }
        else {
            var finalRow = []
            rows.map((data, index) => {
                var buffer = new Buffer(data.image, "base64")
                var bufferBase64 = buffer.toString('base64');
                finalRow.push({ id: data.id, image: bufferBase64 })
            })
            res.send(finalRow)
        }
    })
}
)

app.get('/contact', (req, res, next) => {
    var name = req.query.name;
    var email = req.query.email;
    var subject = req.query.subject;
    var message = req.query.message;
    connection.query(`INSERT INTO contact (name, email, subject, message) VALUES ("${name}", "${email}", "${subject}", "${message}");`, function (err, rows, fields) {
        if (err) {
            console.log(err)
        }
        else {
            res.send('Successfully Submitted Form');
        }
    })
}
)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))