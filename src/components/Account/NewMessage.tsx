
function NewMessage({msg,seen}:{msg?:string,seen:boolean}) {

  return (
   <>
    <div className="flex px-4  item-center">
       <div className={`py-3 px-3.5 rounded-2xl text-3xl flex items-center justify-center ${seen ? "bg-zinc-200" : "bg-gradient-to-br from-[#EC1187] to-[#FF8D10]"}`}>
          💌
       </div>
       <div className="flex flex-col justify-start  ml-4 mt-1.5 text-left">
        {seen?(      <h1 className="font-bold text-lg truncate w-[70dvw] ">{msg}</h1>):(
                  <h1 className="font-extrabold text-lg text-red-500">New Message</h1>
        )}
   
         <h2 className="text-lg font-bold text-zinc-400 ">31 minutes ago</h2>
       </div>
    </div>
       </>
  )
}

export default NewMessage