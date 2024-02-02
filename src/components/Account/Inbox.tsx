import { apiUrl } from "@/API/api"
import { DrawerCard } from ".."
import { useQuery } from "react-query"
import { auth } from "@/firebase/firebaseConfig"
import { Loader } from "../Loaders/Loader"
import { messages } from "@/interface"

function Inbox() {

  const { data, isLoading, isError } = useQuery<messages[]>("messages", async () => {
    const response = await fetch(`${apiUrl}/api/get/messages`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: await auth.currentUser?.getIdToken(),
        username: auth.currentUser?.displayName?.toLowerCase(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    return response.json();
  }, {
    keepPreviousData:true,
    refetchOnWindowFocus:false
  });



  return (
    <div className="py-2 flex  flex-col gap-4 ">
     {isLoading && (
        <div className="w-full h-[90dvh] text-xl font-extrabold  flex justify-center items-center">
        <Loader color="#EC1187"/>
      </div>
     )}
     {isError&&(
         <div className="w-screen text-xl font-extrabold  flex justify-center items-center">
         Error Fetching data
       </div>
     )}
     {data && data.map((msg)=> (
      
      <div key={`_divider${msg.id}`} className="flex flex-col gap-3">
      <DrawerCard id={msg.id} msg={msg.msg} seen={msg.seen} time={msg.date}/>
<div   className=" h-[.05rem] bg-zinc-200"></div>
      </div>
  
  
     ))}
        </div>
  )
}

export default Inbox

