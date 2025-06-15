import axios from "axios";

export const profileinfo = async (userId) => {
    try{
        const responce = await axios.get(`http://localhost:3001/profile/get-profile/${userId}`);
        return responce.data;
    }catch(err){
        return err;
    }
}
export const profileInfoUpdate = async (userId,firstname,lastname, email,profile_image) => {
    try{
        const responce = await axios.post('http://localhost:3001/profile/update-profile',{userId,firstname,lastname,email,profile_image});
        return responce.data
    }catch(err){
        return err
    }
}

export const getProfile = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/profile/get-profile/${userId}`);
      return response.data; // Assuming the API returns the profile data in the response
    } catch (err) {
      console.error('Error fetching profile:', err);
      throw err; // Re-throw error for the caller to handle
    }
  };