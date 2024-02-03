import {
    Drawer,
    DrawerContent,
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
import { Timestamp } from "firebase/firestore"
export function DrawerCard({msg,id,seen,time,country,city,isp,regionName}:{msg:string,id:string,seen:boolean,time:Timestamp,country:string,city:string,isp:string,regionName:string}){
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
    </DrawerHeader>
    <div className="flex justify-center items-center" >
    <Cards  ref={cardRef} msg={msg}/>
    </div>
    <DrawerFooter>
    <Button variant={"secondary"}  className="rounded-none hover:bg-none  shadow-none border-b-[.05rem] border-zinc-200  justify-start rounded-t-2xl mt-3 bg-zinc-100 text-black   py-6 text-lg font-bold">Country - {country || "Not found"}</Button>
    <Button variant={"secondary"}  className="rounded-none hover:bg-none shadow-none border-b-[.05rem]  border-zinc-200   justify-start bg-zinc-100 text-black -mt-2   py-6 text-lg font-bold">Region - {regionName || "Not Found"}</Button>
    <Button variant={"secondary"}  className="rounded-none hover:bg-none shadow-none border-b-[.05rem]  border-zinc-200   justify-start bg-zinc-100 text-black -mt-2   py-6 text-lg font-bold">City - {city || "Not Found"}</Button>
    <Button variant={"secondary"}  className=" rounded-none hover:bg-none shadow-none     justify-start rounded-b-2xl mb-4 bg-zinc-100 text-black -mt-2  py-6 text-lg font-bold">ISP - {isp || "Not Found"}</Button>
  
      <Button onClick={download} className="rounded-3xl py-6 text-lg font-bold">Download</Button>
    
    </DrawerFooter>
  </DrawerContent>
</Drawer>
)   

}