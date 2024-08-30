import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

const FriendListWidget = ({ userId }) => {
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const getFriends = async () => {
        try {
            const response = await fetch(
                `http://localhost:3001/users/${userId}/friends`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch friends');
            }

            const data = await response.json();
            dispatch(setFriends({ friends: data }));
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    useEffect(() => {
        if (userId && token) {
            getFriends();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, token, dispatch]);

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends.map((friend) => (
                    <Friend
                        key={friend._id} // Ensure friend._id is unique for each friend
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;
