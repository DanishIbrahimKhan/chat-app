const pool = require('../config/db');

async function profileUpdate(req, res) {
    const { userID, firstname, lastname, email, profile_image } = req.body;
    if (!firstname || !lastname) {
        res.status(400).json({ message: "first and lastname is required" });
        return;
    }
    try {
        const profileInsertQuery = `
            INSERT INTO user_profiles (userID, firstname, lastname,  profile_image, email) 
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                firstname = VALUES(firstname),
                lastname = VALUES(lastname),
                profile_image = VALUES(profile_image),
                email = VALUES(email);
        `;
        const [results] = await pool.execute(profileInsertQuery, [userID, firstname, lastname, profile_image, email]);
        return res.status(200).json({ message: "user info updated successfully", username: results.firstname });
    } catch (err) {
        return res.status(500).json({ error_message: err })
    }

}
async function getProfileData(req, res) {
    const { userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: "userId required" });
    };
    try {
        const getProfileQuery = `SELECT * FROM Users WHERE id = ?`;
        const [results] = await pool.execute(getProfileQuery, [userId]);
        if (results.length === 0) {
            return res.status(404).json({ message: "data with this user not found" });
        }
        return res.status(200).json({ data: results })
    } catch (err) {
        return res.status(500).json({ error: err })
    }
}
async function getUsersEmail(req, res) {
    const { email } = req.params;
    try {
        const getUsersEmailQuery = 'SELECT email,id,firstName,lastName,profileImage FROM Users WHERE email LIKE ? ORDER BY email ASC';
        const [results] = await pool.execute(getUsersEmailQuery, [`%${email}%`]);
        if (!email) {
            return res.json(400).json({ message: "must contain any letter" })
        }
        if (results === 0) {
            return res.status(404).json({ message: "no user found" })
        }
        return res.status(200).json({ data: results })
    } catch (err) {
        return res.status(500).json({ err })
    }

}

const updateProfileImage = async (req, res) => {
    const { file } = req;
    const { id } = req.body;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    const MAX_SIZE = 1024 * 1024; // 1 MB
    if (file.size > MAX_SIZE) {
        return res.status(400).json({ message: 'File size exceeds 1 MB limit.' });
    }

    try {
        // Get the binary data of the uploaded file (file.buffer for BLOB)
        const profileImage = file.buffer;

        const uploadImageQuery = 'UPDATE Users SET profileImage = ? WHERE id = ?';

        const [results] = await pool.execute(uploadImageQuery, [profileImage, id]);

        res.status(200).json({ message: 'Profile image updated successfully', results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update profile image.', error: err.message });
    }
};


module.exports = { profileUpdate, getProfileData, getUsersEmail, updateProfileImage }