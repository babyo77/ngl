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

  
function Settings() {
  return (
    <Drawer>
    <DrawerTrigger>
    <IoIosSettings className="h-8 mb-3  w-8 text-zinc-300" />
    </DrawerTrigger>
    <DrawerContent className="px-7">
      <DrawerHeader>
        <DrawerTitle className="font-extrabold text-zinc-500">Account Settings</DrawerTitle>
      </DrawerHeader>
      <Button variant={"secondary"} className="text-[1rem] mt-3 font-bold rounded-2xl py-6">Change profile picture</Button>
      {/* <Button variant={"secondary"} className="text-[1rem] mt-3 font-bold rounded-2xl py-6">Change username</Button> */}
     <DeleteDialog/>
      <Button variant={"destructive"} onClick={async()=>{await signOut(auth); window.location.reload()}} className="text-[1rem] mt-3 font-bold rounded-2xl py-6">Log out</Button>
      <DrawerFooter/>
    </DrawerContent>
  </Drawer>
  
  )
}

export default Settings