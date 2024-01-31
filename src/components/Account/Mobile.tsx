import { DrawerCard } from ".."
import NGLlink from "./NGLlink"
import Profile from "./Profile"

function Mobile() {
  return (
<>
 
     
     <Profile/>
    <div className="flex pt-20 font-semibold justify-between px-7">
        <NGLlink/> 
    </div>
    <div className="flex  font-semibold justify-between px-7 mt-1">
        <p className="text-red-500"><span></span></p> 
    </div>
    <div className="flex flex-col gap-3 pb-1 mt-4  h-[104svw] overflow-scroll ">
      <DrawerCard  msg="help ho ate isahdsj  jskahdj sdsa
      dsdsadsad sdsadas dasdsad"/>
      <DrawerCard msg="help ho ate isahdsj  jskahdj sdsa
      dsdsadsad sdsadas dasdsad"/>
      <DrawerCard msg="help "/>
      <DrawerCard msg="help 
      dsdsadsad sdsadas da"/>
      <DrawerCard msg="dfadas"/>
      <DrawerCard msg="dfadas"/>
      <DrawerCard msg="dfadas"/>
      <DrawerCard msg="dfadas"/>
      <DrawerCard msg="dfadas"/>
      <DrawerCard msg="dfadas"/>
      <DrawerCard msg="dfadas"/>
    </div>
    <div className="flex justify-center items-center pt-10">
        <a href="" className="text-xs font-bold text-zinc-300">NGLdrx.</a>
    </div>
    </>
  )
}

export  {Mobile}