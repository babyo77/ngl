import { useState } from "react"

function NewMessage({msg}:{msg?:string}) {

    const [seen,setSeen] = useState<boolean>(false)
 const handleSeen = ()=>{
        setSeen(true)
 }
  return (
    <div className="flex  item-center px-6" onClick={handleSeen}>
       <div className={`h-14 w-14 rounded-xl text-3xl flex items-center justify-center ${seen ? "bg-zinc-200" : "bg-gradient-to-br from-[#EC1187] to-[#FF8D10]"}`}>
          💌
       </div>
       <div className="flex flex-col  items-center ml-4 mt-1 text-left">
        {seen?(      <h1 className="font-bold truncate w-[27dvw] ">{msg}</h1>):(
                  <h1 className="font-bold text-red-500">New Message</h1>
        )}
   
         <h2 className="text-sm -ml-2">31 minutes ago</h2>
       </div>
    </div>
  )
}

export default NewMessage