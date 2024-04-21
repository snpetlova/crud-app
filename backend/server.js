const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());    

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "3939",
    database: "crud-app"
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to database!');
}); 


app.get('/', (req, res) => {
    const sql = "SELECT * FROM student";
    connection.query(sql, (err, data) => {
        if(err) return res.json('Error');
        return res.json(data);
    })
})

const PORT = 8081;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
})