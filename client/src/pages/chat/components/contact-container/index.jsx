import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getProfile } from '@/services/profile';
import { getUsersEmail } from '@/services/searchContacts';
import useAppStore from '@/store/store';
import React, { useEffect, useState } from 'react'
const ContactContainer = () => {
    const setLoading = useAppStore((state) => state.setLoading);
    const token = useAppStore((state) => state.token);
    const [searchContacts, setSearchContacts] = useState("");
    const [contactEmails, setContactEmails] = useState([]);
    const id = useAppStore((state) => state.id);
    const [infoData, setInfoData] = useState({});
    const [profileImage, setProfileImage] = useState(null); // State to hold the Base64 image
  
    const getProfileImageData = async () => {
      try {
        const data = await getProfile(id);
        if (data?.data?.length > 0) {
          const profile = data.data[0];
          setInfoData(profile);
          const profileImageBuffer = profile.profileImage;
  
          if (profileImageBuffer?.data) {
            const base64Image = `data:image/jpeg;base64,${btoa(
              String.fromCharCode(...profileImageBuffer.data)
            )}`;
            setProfileImage(base64Image);
          } else {
            setProfileImage(null); // Default to null if no profile image
          }
        } else {
          setInfoData({});
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };
  
    const handleSearchContacts = async () => {
      setLoading(true);
      try {
        const data = await getUsersEmail(searchContacts, token);
        const processedContacts = data.data.map((contact) => {
          if (contact.profileImage?.data) {
            const base64Image = `data:image/jpeg;base64,${btoa(
              String.fromCharCode(...contact.profileImage.data)
            )}`;
            return { ...contact, profileImage: base64Image };
          }
          return { ...contact, profileImage: null }; // Default to null if no profile image
        });
        setContactEmails(processedContacts);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getProfileImageData();
      handleSearchContacts();
    }, [searchContacts]);
  
    return (
      <div className="relative h-full md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
        <div className="h-[10vh] p-2 border-[#2f303b] border-b-2 flex items-center gap-3">
          <h6>logo here</h6>
        </div>
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="bg-transparent rounded-none w-full">
            <TabsTrigger
              className="data-[state=active]:bg-transparent text-gray-600 text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 border-b-gray-600 p-3 transition-all duration-300"
              value="contacts"
            >
              Contacts
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-transparent text-gray-600 text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-white data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 border-b-gray-600 p-3 transition-all duration-300"
              value="groups"
            >
              Groups
            </TabsTrigger>
          </TabsList>
          <TabsContent value="contacts" className="flex flex-col gap-5">
            <input
              type="text"
              className="flex-1 p-1 m-2 bg-gray-800 focus:border-none rounded-md focus:outline-none"
              placeholder="Search Contact"
              value={searchContacts}
              onChange={(e) => setSearchContacts(e.target.value)}
            />
            <div className="overflow-y-auto h-[55vh] scrollbar-custom">
              {Array.isArray(contactEmails) && contactEmails.length > 0 ? (
                contactEmails.map((data) => (
                  <Contacts
                    key={data.email}
                    id={data.id}
                    name={`${data.firstName} ${data.lastName}`}
                    email={data.email}
                    image={data.profileImage || "/default-avatar.png"} // Use default image if no profileImage
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center">No contacts found</p>
              )}
            </div>
          </TabsContent>
          <TabsContent value="groups" className="flex flex-col gap-5">
            groups here
          </TabsContent>
        </Tabs>
        <div className="w-full absolute bottom-0 h-[17vh] p-2 border-[#2f303b] border-t-2 flex items-center gap-3">
          <img
            className="object-cover h-11 rounded-full w-11"
            src={profileImage || "/default-avatar.png"}
            alt="Profile"
          />
          <h6>{`${infoData.firstName || ""} ${infoData.lastName || ""}`}</h6>
        </div>
      </div>
    );
  };
  
  const Contacts = ({ name, email, id, image }) => {
    const setRecipientIdstore = useAppStore((state) => state.setRecipientId);
    return (
      <div
        onClick={() => {
          console.log("Clicked");
          setRecipientIdstore(id);
        }}
        className="cursor-pointer flex items-center space-x-4 bg-gray-800 text-white p-4 rounded-lg shadow-md"
      >
        <img
          src={image}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
        />
        <div>
          <h3 className="text-lg">{name}</h3>
          <p className="text-sm text-gray-400">{email}</p>
        </div>
      </div>
    );
  };
  
  export default ContactContainer;
  