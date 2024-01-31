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
import { useCallback, useRef } from "react"
import { toPng} from "html-to-image"
import NewMessage from "./NewMessage"
export function DrawerCard({msg}:{msg:string}){
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
  <DrawerTrigger>
    <NewMessage msg={msg}/>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Who sent this?</DrawerTitle>
      <DrawerDescription>Location - sex</DrawerDescription>
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