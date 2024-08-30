import User from '../models/User.js';

// READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// READ FRIENDS
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const friends = await Promise.all(
            user.friends.map((friendId) => User.findById(friendId))
        );
        const formattedFriends = friends
            .filter(friend => friend) // Filter out any null results
            .map(({ _id, firstName, lastName, occupation, location, picturePath }) => ({
                _id, firstName, lastName, occupation, location, picturePath
            }));
        res.status(200).json(formattedFriends);
    } catch (error) {
        console.error('Error fetching user friends:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// UPDATE FRIENDS
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (!user || !friend) return res.status(404).json({ message: 'User or friend not found' });

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((fId) => fId !== friendId);
            friend.friends = friend.friends.filter((fId) => fId !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((fId) => User.findById(fId))
        );
        const formattedFriends = friends
            .filter(friend => friend) // Filter out any null results
            .map(({ _id, firstName, lastName, occupation, location, picturePath }) => ({
                _id, firstName, lastName, occupation, location, picturePath
            }));

        res.status(200).json(formattedFriends);
    } catch (error) {
        console.error('Error adding/removing friend:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
