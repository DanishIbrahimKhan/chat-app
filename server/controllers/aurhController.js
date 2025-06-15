const bcrypt = require('bcryptjs');
const pool = require('../config/db'); 
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
async function register(req, res) {
    const { email, password, firstname, lastname } = req.body;
    const profileImage = req.file ? req.file.buffer : null;


    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const checkQuery = 'SELECT id FROM Users WHERE email = ?';
        const [existingUser] = await pool.execute(checkQuery, [email]);

        if (existingUser.length > 0) {
            return res.status(409).json({ error: 'Email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = `
        INSERT INTO Users (email, password, firstName, lastName, profileImage) 
        VALUES (?, ?, ?, ?,?)
    `;
    
    const [results] = await pool.execute(insertQuery, [
        email ,
        hashedPassword ,
        firstname,
        lastname,
        profileImage || null,
    ]);
        return res.status(201).json({ 
            message: 'User registered successfully', 
            userId: results.insertId 
        });
    } catch (err) {
        console.error('Error during registration:', err);
        return res.status(500).json({ 
            error: 'An error occurred during registration', 
            details: err 
        });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }

    try {
        const query = 'SELECT id, password FROM Users WHERE email = ?';
        const [results] = await pool.execute(query, [email]);

        if (results.length === 0) {
            return res.status(404).json({ message: "Account with this email does not exist." });
        }

        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            const token = jwt.sign({userId:user.id,email},JWT_SECRET,{expiresIn:'1h'});
            return res.status(200).json({ 
                message: 'User loggerd in successfully', 
                userId: user.id,
                email: email,
                token:token,
            });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ 
            error: "An error occurred during login", 
            details: err.message 
        });
    }
}


module.exports = { register, login };
