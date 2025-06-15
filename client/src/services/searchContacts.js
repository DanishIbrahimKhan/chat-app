import axios from "axios";

export const getUsersEmail = async (email, token) => {
    try {
        const response = await axios.get(`http://localhost:3001/profile/users-email/${email}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data || [];  // Make sure to access the correct property here (`response.data` not `response.body`).
    } catch (err) {
        console.error(err);
        return err;
    }
};
