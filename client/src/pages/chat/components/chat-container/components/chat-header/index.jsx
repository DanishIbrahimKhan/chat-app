import { getProfile } from '@/services/profile';
import React, { useEffect, useState } from 'react';
import { RiCloseFill } from "react-icons/ri";
import useAppStore from '@/store/store';

function ChatHeader() {
  const recipientId = useAppStore((state) => state.recipientId);
  console.log("store recipientId", recipientId)
  const [profileImage, setProfileImage] = useState(null); // State to hold the Base64 image
  const [infoData, setInfoData] = useState({})
  const setLoading = useAppStore((state) => state.setLoading);

  const getProfileImageData = async () => {
    setProfileImage(null);
    setLoading(true);
    setInfoData({});
    try {
      const data = await getProfile(recipientId);
      if (data && data.data && data.data.length > 0) {
        const profileImageBuffer = data.data[0].profileImage;
        setInfoData(data.data[0]);

        // Check if profileImageBuffer is valid
        if (profileImageBuffer && profileImageBuffer.data) {
          // Convert the buffer to a Base64 string
          const base64Image = `data:image/jpeg;base64,${btoa(
            String.fromCharCode(...profileImageBuffer.data)
          )}`;
          setProfileImage(base64Image); // Update the state
        } else {
          console.log("Profile image is empty or not in the expected format.");
        }
      } else {
        console.log("No data found for the given profile.");
      }
    } catch (err) {
      console.error("Error fetching profile data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   getProfileImageData(); // Fetch profile image on component mount
  }, [recipientId]);

  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between">
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 justify-center items-center"></div>
        <img
          className="object-cover h-11 rounded-full w-11"
          src={profileImage} // Fallback to a default image
          alt="Profile"
        />
        <h6>{infoData.firstName + "  " + infoData.lastName}</h6>
      </div>
    </div>
  );
}

export default ChatHeader;
