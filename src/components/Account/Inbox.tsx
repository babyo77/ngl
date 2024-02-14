import { DrawerCard } from "..";
import {
  auth,
  msgCollection,
  usersCollection,
} from "@/firebase/firebaseConfig";
import { Loader } from "../Loaders/Loader";
import { messages } from "@/interface";
import React, { useCallback, useEffect, useState } from "react";
import {
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useInView } from "react-intersection-observer";
function InboxComp() {
  const [data, setData] = useState<messages[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { ref, inView } = useInView({
    trackVisibility: true,
    delay: 500,
    rootMargin: "10px",
  });

  const messages = useCallback(async () => {
    setIsLoading(false);
    const user = auth.currentUser;
    const uid = doc(usersCollection, user?.uid);
    const messagesQuery = query(
      msgCollection,
      where("ref", "==", uid),
      orderBy("date", "desc"),
      limit(70)
    );

    const unsubscribe = onSnapshot(messagesQuery, (doc) => {
      const msg: messages[] = doc.docs.map((msg) => msg.data() as messages);
      setData(msg);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messages();
  }, [messages]);

  const getMoreMessages = useCallback(async () => {
    if (inView) {
      const user = auth.currentUser;

      const uid = doc(usersCollection, user?.uid);
      const messagesQuery = query(
        msgCollection,
        where("ref", "==", uid),
        orderBy("date", "desc"),
        startAfter(data[data.length - 1].date),
        limit(10)
      );

      const QuerySnapshot = await getDocs(messagesQuery);
      const newMsg: messages[] = QuerySnapshot.docs.map(
        (snapshot) => snapshot.data() as messages
      );
      setData([...data, ...newMsg]);
      console.log(data.length);
    }
  }, [inView]);

  useEffect(() => {
    getMoreMessages();
  }, [getMoreMessages]);

  return (
    <div className="flex  flex-col gap-4">
      {isLoading && (
        <div className="w-full h-[90dvh] text-xl font-extrabold  flex justify-center items-center">
          <Loader color="#EC1187" />
        </div>
      )}

      {data &&
        data.map((msg, i) => (
          <div
            ref={ref}
            key={`_divider${msg.id}${i}`}
            className="flex fade-in flex-col gap-3"
          >
            <DrawerCard
              key={`message${msg.id}${i}`}
              id={msg.id}
              country={msg.country}
              city={msg.city}
              regionName={msg.regionName}
              msg={msg.msg}
              seen={msg.seen}
              time={msg.date}
            />
            <div className=" h-[.05rem] bg-zinc-200"></div>
          </div>
        ))}
    </div>
  );
}
const Inbox = React.memo(InboxComp);
export default Inbox;
