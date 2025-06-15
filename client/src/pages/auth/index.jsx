import React, { useState } from 'react'
import victory from "@/assets/victory.svg"
import background from "@/assets/chat-image.png"
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login, register } from '@/services/auth'
import { useNavigate } from 'react-router-dom'
import useAppStore from '@/store/store'

function Auth() {
  const setId = useAppStore((state)=>(state.setId));
  const setEmailStore = useAppStore((state) => state.setEmailStore);
  const setToken = useAppStore((state)=>state.setToken);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmSignUpPassword, setConfirmSignUpPassword] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      console.log(data)
      setId(data.userId);
      setEmailStore(data.email);
      setToken(data.token)
      navigate(`/chat`)
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleRegister = async ( ) => {
    try{
    const data = await register(signUpEmail,signupPassword,firstname,lastname);
    console.log(data) 
    }catch{

    }
  }

  return (
    <div className="h-[100vh] bg-white w-[100vw] flex items-center justify-center">
      <div className='h-[80vh] bg-white border-white border-2 text-opacity-90 shadow-2xl w-[80vw] md:w-[80vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2 '>
        <div className='flex flex-col items-center justify-center'>
          <div className='flex items-center justify-center'>
            <h1 className='text-5xl font-bold md:text-6xl'> welcome</h1>
            <img src={victory} alt='victory image' className='h-[100px]' />
          </div>
          <p className='font-medium text-center'>
            fill in details for getting started with best chat app
          </p>
          <div className='flex items-center justify-center w-full'>
            <Tabs defaultValue='login' className='w-3/4'>
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="login">Log in</TabsTrigger>
                <TabsTrigger className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300" value="signup">Sign up</TabsTrigger>
              </TabsList>
              <TabsContent value='signup' className='flex flex-col gap-3 mt-10'>
                <div className='flex flex-row'>

                <Input
                  placeholder="firstname"
                  type="firstname"
                  className="rounded-full w-1/2 p-6"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  />
                <Input
                  placeholder="lastname"
                  type="lastname"
                  className="rounded-full w-1/2 p-6"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  />
                  </div>
                <Input
                  placeholder="email"
                  type="email"
                  className="rounded-full p-6"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  className="rounded-full p-6"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <Input
                  placeholder="confirm password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmSignUpPassword}
                  onChange={(e) => setConfirmSignUpPassword(e.target.value)}
                />
                {(signupPassword !== confirmSignUpPassword) && <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">doens't match</span> confirm the password.
</div>}
                {/* <Error>{(signupPassword !== confirmSignUpPassword) ? "password doenst match":""}</Error> */}
                {signupPassword === confirmSignUpPassword && <Button className="rounded-full p-6" onClick={handleRegister}>Sign Up</Button>}
              </TabsContent>
              <TabsContent value='login' className='flex flex-col gap-5'>
                <Input
                  placeholder="email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin} className="rounded-full p-6">Log in</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className='hidden xl:flex justify-center items-center'>
          <img src={background} className='h-[400px]' />
        </div>
      </div>
    </div>
  )
}

export default Auth