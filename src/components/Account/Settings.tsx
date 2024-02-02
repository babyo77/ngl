import {
    Drawer,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  
import { IoIosSettings } from "react-icons/io"
import { Button } from "../ui/button"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase/firebaseConfig"
import { DeleteDialog } from "./Delete "
// import axios from "axios"
// import { apiUrl } from "@/API/api"

  
function Settings() {

  // const updateUsername = async()=>{
  //   const data = {
  //     token:await auth.currentUser?.getIdToken(),
  //     username:"babyo7_"
  //   }
  //  const res = await axios.post(`${apiUrl}/api/user/update/username`,data)
  //  console.log();
  // }

  return (
    <Drawer>
    <DrawerTrigger>
    <IoIosSettings className="h-8   w-8 text-zinc-300" />
    </DrawerTrigger>
    <DrawerContent className="px-7">
      <DrawerHeader>
        <DrawerTitle className="font-extrabold text-zinc-500">Account Settings</DrawerTitle>
      </DrawerHeader>
      <Button variant={"secondary"} onClick={()=>alert("adding soon...")} className="text-[1rem] mt-3 font-bold rounded-2xl py-6">Change account details</Button>
      <Button variant={"secondary"} onClick={()=>window.open("https://tanmayo7.vercel.app")} className="text-[1rem] mt-3 font-bold rounded-2xl py-6">Who made this?</Button>
     <DeleteDialog/>
      <Button variant={"destructive"} onClick={async()=>{await signOut(auth); window.location.reload()}} className="text-[1rem] mt-3 font-bold rounded-2xl py-6">Log out</Button>
      <DrawerFooter/>
    </DrawerContent>
  </Drawer>
  
  )
}

export default Settings