import express from 'express';
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ user by ID
router.get('/:id', verifyToken, getUser);

// READ user friends
router.get('/:id/friends', verifyToken, getUserFriends);

// UPDATE add/remove friend
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
