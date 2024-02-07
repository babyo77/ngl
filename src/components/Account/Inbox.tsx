import { DrawerCard } from "..";
import {
  auth,
  msgCollection,
  usersCollection,
} from "@/firebase/firebaseConfig";
import { Loader } from "../Loaders/Loader";
import { messages } from "@/interface";
import { useEffect, useState } from "react";
import {
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useInView } from "react-intersection-observer";
function Inbox() {
  const [data, setData] = useState<messages[]>([]);
  const [limitN, setLimit] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      const user = auth.currentUser;

      if (user) {
        const uid = doc(usersCollection, user.uid);

        const messagesQuery = query(
          msgCollection,
          where("ref", "==", uid),
          orderBy("date", "desc"),
          limit(limitN)
        );

        try {
          const snapshot = await getDocs(messagesQuery);
          const newMessages: messages[] = snapshot.docs.map((doc) => ({
            ...(doc.data() as messages),
          }));

          setData(newMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadMessages();
  }, [limitN]);

  useEffect(() => {
    if (inView) {
      setLimit((prev) => prev + 5);
    }
  }, [inView]);

  return (
    <div className="flex  flex-col gap-4 ">
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

export default Inbox;
