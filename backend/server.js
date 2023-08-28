const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded images

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'letsgrowmore'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/register', upload.single('image'), (req, res) => {
    const { fullname, email, rollno, year, section } = req.body;
    const image = req.file.filename;
    console.log(req.body)

    const sql = "INSERT INTO users (fullname, email, rollno, year, section, image) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [fullname, email, rollno, year, section, image], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        console.log(fullname,email) 
        return res.json({ message: 'Registration successful!' });
    });
});

app.get('/',(req,res)=>{
    return res.json("Backend API for the Enroll form")
})

app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        return res.json(data);
    });
});

app.listen(3001, () => {
    console.log('Listening on port 3001');
});
