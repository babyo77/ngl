import { Timestamp } from "firebase/firestore";

function NewMessage({msg,seen,timestamp}:{msg?:string,seen:boolean,timestamp:Timestamp}) {

   function formatFirebaseTimestamp(time:Timestamp) {
    const date = new Date(Number(time.seconds) *1000 + Number(time.nanoseconds/1e6))
    const current = new Date()
    const diff = current.getTime() - date.getTime()

    if (diff < 60000) {  
      return 'Just now';
    } else if (diff < 3600000) {  
      const minutes = Math.floor(diff / 60000);
      return `${minutes} min ago`;
    } else if (diff < 86400000) {  
      const hours = Math.floor(diff / 3600000);
      return `${hours} hr ago`;
    } else if (diff < 31536000000){
      const days = Math.floor(diff / 86400000);
      return `${days} day ago`;
    }else {
      const years = Math.floor(diff / 31536000000);
      return `${years} year ago`;
    }
   
    }
     
const time = formatFirebaseTimestamp(timestamp)

  return (
   <>
    <div className="flex px-4  item-center">
       <div className={`py-3 px-3.5 rounded-2xl text-3xl flex items-center justify-center ${seen ? "bg-zinc-200" : "bg-gradient-to-br from-[#EC1187] to-[#FF8D10]"}`}>
          💌
       </div>
       <div className="flex flex-col justify-start ml-4 mt-1.5 text-left">
        {seen?(      <h1 className="font-bold text-lg truncate w-[70dvw] ">{msg}</h1>):(
                  <h1 className="font-extrabold text-lg text-red-500">New Message</h1>
        )}
   
         <h2 className="text-lg font-bold text-zinc-400">{time}</h2>
       </div>
    </div>
       </>
  )
}

export default NewMessage