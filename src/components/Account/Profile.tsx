import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

  import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
// import { ModeToggle } from "../toggle"
import { Button } from "../ui/button"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase/firebaseConfig"


  function Profile() {
    return (
        <nav className="flex fixed w-full backdrop-blur-md  items-center justify-between px-7 py-4">
        <p className="font-bold  text-lg">@babyo7_</p>

        <div className="flex items-center gap-2">
        {/* <ModeToggle/> */}

        <Dialog>
  <DialogTrigger>
  <Avatar>
          <AvatarImage src="https://github.com/babyo7.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
  </DialogTrigger>
  <DialogContent className="w-[80vw] rounded-lg">
    <DialogHeader>
      <DialogTitle>Settings</DialogTitle>
    </DialogHeader>
      <Button onClick={() => signOut(auth).then(()=>window.location.reload())}>Logout</Button>
  </DialogContent>
</Dialog>


</div>
 
  </nav>
    )
  }
  
  export default Profile