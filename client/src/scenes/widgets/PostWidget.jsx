import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined
} from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from 'components/FlexBetween';
import Friend from "components/Friend";
import WidgetWrapper from 'components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const loggedInUser = useSelector((state) => state.user._id);

    const [isComments, setIsComments] = useState(false);
    const [localLikes, setLocalLikes] = useState(likes);
    const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUser]));
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const likeCount = Object.keys(localLikes).length;
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const patchLike = async () => {
        try {
            const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: loggedInUser })
            });

            if (!response.ok) {
                throw new Error("Failed to update like");
            }

            const updatedPost = await response.json();
            dispatch(setPost({ post: updatedPost }));

            setIsLiked((prev) => !prev);
            setLocalLikes((prevLikes) => {
                const newLikes = { ...prevLikes };
                if (newLikes[loggedInUser]) {
                    delete newLikes[loggedInUser];
                } else {
                    newLikes[loggedInUser] = true;
                }
                return newLikes;
            });

        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subutile={location}
                userPicturePath={userPicturePath}
            />
            <Typography color={main} sx={{ mt: "1rem" }}>
                {description}
            </Typography>
            {picturePath && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{ borderRadius: "0.75rem", marginTop: "0.65rem" }}
                    src={`http://localhost:3001/assets/${picturePath}`}
                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary }} />
                            ) : (
                                <FavoriteBorderOutlined />
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>
                </FlexBetween>
                <IconButton>
                    <ShareOutlined />
                </IconButton>
            </FlexBetween>
            {isComments && (
                <Box mt="0.5rem">
                    {comments.map((comment, index) => (
                        <Box key={`${postId}-${index}`}>
                            <Divider />
                            <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
                                {comment}
                            </Typography>
                        </Box>
                    ))}
                    <Divider />
                </Box>
            )}
        </WidgetWrapper>
    );
};

export default PostWidget;
