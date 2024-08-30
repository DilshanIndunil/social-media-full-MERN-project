import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}
                alt="user"
                src={`http://localhost:3001/assets/${image}`}
                onError={(e) => e.target.src = "path/to/default/image.jpg"} // Optional: Handle image loading errors
            />
        </Box>
    );
}

export default UserImage;
