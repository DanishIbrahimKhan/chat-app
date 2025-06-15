const express = require('express');
const router = express.Router();
const multer = require('multer')
const profileUpdateController = require('../controllers/profileControllers');
const { authenticateToken } = require('../middleware/authenticateUser');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }); 

router.post('/update-profile', profileUpdateController.profileUpdate);
router.post('/update-profile-image',upload.single('profileImage'), profileUpdateController.updateProfileImage);
router.get('/users-email/:email',authenticateToken,profileUpdateController.getUsersEmail);
router.get('/get-profile/:userId',profileUpdateController.getProfileData);

module.exports = router;