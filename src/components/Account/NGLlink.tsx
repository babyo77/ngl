
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRef } from "react"
 
function NGLlink() {
    const linkRef = useRef<HTMLInputElement>(null)
    const handleCopy = ()=>{
        if(linkRef.current){
            navigator.clipboard.writeText(linkRef.current?.value).then(()=>{
                alert("link copied")
            })
        }
    }
  return (
    <div>
        <h1>Your Link </h1>
        <div  className="mt-2 flex space-x-2 items-center">
      <Input ref={linkRef} readOnly  className="shadow-none rounded-md w-52 text-xs text-zinc-500 uppercase"  value={"ngl-drx.vercel.app/babyo7_"}/>
      <Button variant={"secondary"} className="px-5" onClick={handleCopy} type="submit">Copy Link</Button>
        </div>
    </div>
  )
}




export default NGLlink