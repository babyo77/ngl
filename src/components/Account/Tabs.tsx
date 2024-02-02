import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import PLay from "./PLay"
import { IoIosSettings } from "react-icons/io";
import Inbox from "./Inbox";
import Settings from "./Settings";
import { auth, usersCollection} from "@/firebase/firebaseConfig";
import { msgCollection } from "../../firebase/firebaseConfig";
import { doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
export function Tab() {
const [newMsg,setNewMsg] = useState<boolean>()

useEffect(() => {
  
  const user = auth.currentUser;

  if (user) {
    const uid = doc(usersCollection,user.uid);
 
    const messagesQuery = query(
      msgCollection,
      where('ref', '==', uid)
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        ...doc.data()
    }));
    const hasSeenMessage = newMessages.some((message) => message.seen !== true);
        if(hasSeenMessage){
          setNewMsg(true)
        }else{
          setNewMsg(false)
        }
    });

    return () => unsubscribe();
  }
}, []); 

  return (
    <Tabs defaultValue="play" className="fade-in">
      <TabsList className="w-full bg-transparent py-2.5 z-10 fixed top-0 bg-white h-fit items-center justify-between px-4 border-b">
        <IoIosSettings className="h-8   w-8 text-white" />
        <div className="">
        <TabsTrigger value="play">PLAY</TabsTrigger>
        <TabsTrigger value="inbox">INBOX 
        {
          newMsg &&(
            <div className="rounded-full bg-red-500 h-3 w-3 ml-1"></div>
          )
        }
        </TabsTrigger>
        </div>
        <Settings/>
      </TabsList>

      <TabsContent value="play" className="mt-[10dvh]">
      <PLay/>
      </TabsContent>


      <TabsContent value="inbox" className="mt-[10dvh]">
      <Inbox/>
      </TabsContent>


    </Tabs>
  )
}
