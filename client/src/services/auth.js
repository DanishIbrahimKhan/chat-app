import axios from "axios";

export const login = async (email,password) => {
 try{
    const responce = await axios.post(`${"http://localhost:3001"}/auth/login`,
        {email,password}
    )
    return responce.data;
 }catch(err){
    throw err.responce;
 }
} 
export const register = async (email, password, firstname, lastname, profileImage) => {
   try {
       const response = await axios.post('http://localhost:3001/auth/register', {
           email,
           password,
           firstname,
           lastname,
           profileImage,
       });
       return response.data;
   } catch (err) {
       throw err.response || err;
   }
};
