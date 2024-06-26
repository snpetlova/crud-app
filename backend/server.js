const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());  
app.use(express.json());  

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
});

app.post('/create', (req, res) => {
     const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
     const values = [
        req.body.name,
        req.body.email  
     ]

     connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            return res.status(500).json({ error: 'Error creating student' });
        }
        return res.status(200).json({ message: 'Student created successfully', result });
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE student SET `Name` = ?, `Email` = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.email
    ];
    const id = req.params.id;

    connection.query(sql, [...values, id], (err, result) => {
        if (err) {
            console.error('Error updating student:', err);
            return res.status(500).json({ error: 'Failed to update student' });
        }
        return res.status(200).json({ message: 'Student updated successfully', result });
    });
});

app.delete('/student/:id', (req, res) => {
    const sql = "DELETE FROM student WHERE Id = ?";
    const id = req.params.id;
    
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            return res.status(500).json({ error: 'Failed to delete student' });
        }
        return res.status(200).json({ message: 'Student deleted successfully', result });
    });
});

const PORT = 8081;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
})