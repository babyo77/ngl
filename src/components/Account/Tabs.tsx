import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PLay from "./PLay";
import Inbox from "./Inbox";
import Settings from "./Settings";
import { auth, usersCollection } from "@/firebase/firebaseConfig";
import { msgCollection } from "../../firebase/firebaseConfig";
import { TbMailPlus } from "react-icons/tb";
import {
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
export function Tab() {
  const [unseenMessagesCount, setUnseenMessagesCount] = useState<number>(0);
  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      const uid = doc(usersCollection, user.uid);

      const unseenMessagesQuery = query(
        msgCollection,
        where("seen", "==", false),
        where("ref", "==", uid),
        orderBy("seen"),
        limit(11)
      );

      onSnapshot(unseenMessagesQuery, (snapshot) => {
        const unseenMessagesCount = snapshot.size;
        setUnseenMessagesCount(unseenMessagesCount);
      });
    }
  }, []);

  return (
    <Tabs defaultValue="play" className="fade-in">
      <TabsList className="w-full bg-transparent py-2.5 rounded-none z-10 fixed top-0 bg-white h-fit items-center justify-between px-4 border-b">
        <div className="relative mr-1">
          <TbMailPlus className="h-8  w-8 text-zinc-300" />
          {unseenMessagesCount > 0 && (
            <h1
              className={`absolute   bottom-3.5 ml-1 right-0 ${
                unseenMessagesCount >= 10 && " left-[1.1rem]"
              }  font-extrabold text-[#EC1187]`}
            >
              {unseenMessagesCount >= 10 ? "9+" : `${unseenMessagesCount}`}
            </h1>
          )}
        </div>
        <div>
          <TabsTrigger value="play">PLAY</TabsTrigger>
          <TabsTrigger value="inbox">
            INBOX
            {unseenMessagesCount > 0 && (
              <div className="rounded-full bg-red-500 h-3 w-3 ml-1 mb-0.5"></div>
            )}
          </TabsTrigger>
        </div>
        <Settings />
      </TabsList>

      <TabsContent value="play" className="mt-[4.2rem]">
        <PLay />
      </TabsContent>

      <TabsContent value="inbox" className="mt-[4.5rem]">
        <Inbox />
      </TabsContent>
    </Tabs>
  );
}
