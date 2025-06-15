import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getColor } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { profileinfo, profileInfoUpdate } from '@/services/profile';
import useAppStore from '@/store/store';

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColour, setselectedColour] = useState(5);
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef(null);
  const id = useAppStore((state) => (state.id))
  const emailStore = useAppStore((state) => state.emailStore);
  const token = useAppStore((state) => state.token);
  console.log("token store",token)


  const saveChanges = async () => { };
  const handleEdit = () => {
    setEditMode(!editMode)
  }
  const handleProfileInfoUpdate = async () => {
    try{
      await profileInfoUpdate(id,firstName,lastName,emailStore,image);
    }catch(err){

    }
    setEditMode(!editMode)
    console.log("image",image)
  }
  const handleProfileInfo = async () => {
    try {
      const data = await profileinfo(id);
      setFirstName(data.data[0].firstname);
      setLastName(data.data[0].lastname);
    } catch (err) {
      console.log(err)
    }
  }
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Check file size (4MB = 4 * 1024 * 1024 bytes)
      if (file.size > 4 * 1024 * 1024) {
        setImage(null);
        return;
      }

      setImage(URL.createObjectURL(file)); // For preview
    }
  };
  useEffect(()=>(
    handleProfileInfo
  ), [])
  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center gap-10'>
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className='text-4xl lg:text-6xl text-white text-opacity-90 cursor-pointer' />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div className="h-full w-full md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => editMode?setHovered(true):""}
            onMouseLeave={() => editMode?setHovered(false):""}
          >
            <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full overflow-hidden">
              {image ? (<AvatarImage src={image} />) : <div className={`uppercase h-32 w-32 md:h-48 md:w-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColour)}`}>
                D</div>}
            </Avatar>

            {hovered && (<div onClick={()=>fileInputRef.current?.click()} className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full text-white'>{image ? <FaTrash className='text-3xl cursor-pointer' /> : <FaPlus className='text-3xl cursor-pointer' />}</div>)}
          <input className='hidden' ref={fileInputRef} type='file' accept='.jpg' onChange={handleImageUpload} />
          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center'>
            <div className='w-full'>
              <Input style={{color:"white !important"}} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" type="text" disabled={!editMode} className="rounded-lg p-6  bg-[#2c2e3b] border-none disabled:text-white" value={firstName} />
            </div>
            <div className='w-full'>
              <Input onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" type="text" disabled={!editMode} className="rounded-lg p-6  bg-[#2c2e3b] border-none text-white" value={lastName} />
            </div>
            {/* <div className='w-full'>
              <Input placeholder="email" type="email" disabled className="rounded-lg p-6  bg-[#2c2e3b] border-none text-white" value="email2" />
            </div> */}
            <div></div>
          </div>
        </div>
        <div className='w-full'>
          <Button onClick={editMode ? handleProfileInfoUpdate : handleEdit} className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300">{editMode ? "Save Changes" : "Edit Profile"}</Button>
        </div>
      </div>
    </div>
  )
}

export default Profile;