import express from 'express';
const router = express.Router();

//controllers
import { addUser, getAllUsers } from '../controllers/usersDetails';

router.post('/addUser', addUser);
router.get('/getallusers', getAllUsers);

module.exports = router;
