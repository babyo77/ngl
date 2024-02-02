import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "../ui/button"
import Cards  from ".."
import { useCallback, useRef, useState } from "react"
import { toPng} from "html-to-image"
import NewMessage from "./NewMessage"
import axios from "axios"
import { apiUrl } from "@/API/api"
import { auth } from "@/firebase/firebaseConfig"
import { firebaseTime } from "@/interface"
export function DrawerCard({msg,id,seen,time}:{msg:string,id:string,seen:boolean,time:firebaseTime}){
  const [seened,setSeen] = useState<boolean>()

const updateMsg = async()=>{
  if(!seen){
    setSeen(true)
    const data = {
      token:await auth.currentUser?.getIdToken(),
      id:id
    }
    await axios.post(`${apiUrl}/api/user/update/msg`,JSON.stringify(data),{
      headers:{
        "Content-Type":"application/json"
      }
    })
  }
  
}
  
    const cardRef = useRef<HTMLDivElement>(null)

const download = useCallback(()=>{
    console.log("ok");
    
    if (cardRef.current === null) {
        return
      }
  toPng(cardRef.current,{
    cacheBust:true
  }).then((dataUrl)=>{
    const link = document.createElement('a')
    link.download = "message"
    link.href =dataUrl
    link.click()
  }).catch(err=>{
    console.log(err);
  })
},[cardRef])

 return(

     <Drawer>
  <DrawerTrigger id={id} onClick={updateMsg}>
    {seen ? (
       <NewMessage  seen={seened || seen} msg={msg} timestamp={time}/>
    ):(
      <NewMessage  seen={ seened||seen} msg={msg} timestamp={time}/>
    )}
   
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Who sent this?</DrawerTitle>
      <DrawerDescription>...</DrawerDescription>
    </DrawerHeader>
    <div className="flex justify-center items-center" >
    <Cards  ref={cardRef} msg={msg}/>
    </div>
    <DrawerFooter>
        
      <Button onClick={download} className="rounded-3xl py-6 text-lg font-bold">Download</Button>
    
    </DrawerFooter>
  </DrawerContent>
</Drawer>
)   

}