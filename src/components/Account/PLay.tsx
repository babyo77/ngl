import { useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { FaLink } from "react-icons/fa";
function PLay() {

const handleShare = async ()=>{
  try {
    if(navigator.share){
      await navigator.share({
        title:"send me anonymous messages!",
        text: "send me anonymous messages!",
        url:window.location.origin
      })
    }
  } catch (error) {
    alert((error as {message:string}).message)
  }
}
    const linkRef = useRef<HTMLInputElement>(null)
    const handleCopy = ()=>{
        if(linkRef.current){
            navigator.clipboard.writeText(linkRef.current?.value).then(()=>{
                alert("🔗 link copied")
            })
        }
    }
  return (
    <div className="px-3 py-2 flex  flex-col gap-4 justify-center items-center">
       <div className="border gap-2   bg-black/90 backdrop-blur-lg w-[90dvw] py-11 flex-col rounded-[2.2rem] shadow-lg  flex justify-center items-center">
       <Avatar className="border-white  border-[.2rem] h-16 w-16">
      <AvatarImage src="https://github.com/babyo7.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <h1 className="text-white font-bold text-2xl text-center">send me anonymous messages!</h1>
       </div>
 
       <div className="  bg-zinc-100 backdrop-blur-lg py-7 mt-1 w-[90dvw] flex-col rounded-3xl gap-3 flex justify-center items-center">
      
    <h1 className="text-black font-bold text-lg  text-center">Step 1: Copy your link</h1>
    <input value="ngl-drx.vercel.app" readOnly ref={linkRef} className="text-zinc-500 font-semibold text-xs tracking-tighter bg-transparent uppercase text-center"></input>
       
       <Button onClick={handleCopy} className="flex items-center justify-center tracking-normal font-extrabold border-[#EC1187] bg-gradient-to-br from-[#EC1187] to-[#FF8D10] border-[.2rem] py-4 text-sm px-6 bg-clip-text text-[#EC1187]  rounded-full shadow-none"> <FaLink className="mr-2"/> copy link</Button>  
       </div>

       <div className="  bg-zinc-100 backdrop-blur-lg py-6 w-[90dvw] flex-col rounded-3xl gap-3 flex justify-center items-center">
      
    <h1 className="text-black font-bold text-lg  text-center">Step 2: Share link on social media</h1>
       <Button onClick={handleShare} className=" bg-transparent px-32 text-lg py-7  flex items-center justify-center tracking-normal font-extrabold  bg-gradient-to-br from-[#EC1187] to-[#FF8D10] rounded-full shadow-none">Share</Button>  
       </div>
    </div>
  )
}

export default PLay