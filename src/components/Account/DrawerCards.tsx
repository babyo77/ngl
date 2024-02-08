import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import Cards from "..";
import { useCallback, useRef, useState } from "react";
import { toBlob } from "html-to-image";
import NewMessage from "./NewMessage";
import axios from "axios";
import { apiUrl } from "@/API/api";
import { auth } from "@/firebase/firebaseConfig";
import { Timestamp } from "firebase/firestore";
import { RiTwitterXLine } from "react-icons/ri";
export function DrawerCard({
  msg,
  id,
  seen,
  time,
  country,
  city,
  regionName,
}: {
  msg: string;
  id: string;
  seen: boolean;
  time: Timestamp;
  country: string;
  city: string;
  regionName: string;
}) {
  const [seened, setSeen] = useState<boolean>();
  const twitterRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const updateMsg = async () => {
    if (!seen) {
      setSeen(true);
      const data = {
        token: await auth.currentUser?.getIdToken(),
        id: id,
      };
      await axios.post(`${apiUrl}/api/user/update/msg`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  const twitterShare = useCallback(() => {
    if (twitterRef.current === null) return;

    twitterRef.current.classList.replace("hidden", "flex");
    if (firstRender) {
      toBlob(twitterRef.current);
      setFirstRender(false);
    }
    toBlob(twitterRef.current, {
      cacheBust: true,
      style: {
        fontFamily: "Sen, sans-serif",
      },
    }).then((blob) => {
      if (blob !== null) {
        if (twitterRef.current) {
          twitterRef.current.classList.replace("flex", "hidden");
        }
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        const cleanMsg = msg.replace(/[^a-z0-9]/gi, "");

        reader.onload = () => {
          if (navigator.share) {
            navigator
              .share({
                files: [
                  new File([blob], `NGLdrx${cleanMsg}.png`, {
                    type: "image/png",
                  }),
                ],
              })
              .catch((err) => {
                console.log(err.message);
              });
          } else {
            console.log("not supported");
          }
        };
      } else {
        if (twitterRef.current) {
          twitterRef.current.classList.replace("flex", "hidden");
        }
        console.log("null blob");
      }
    });
  }, [twitterRef, msg, firstRender]);

  const share = useCallback(() => {
    if (cardRef.current === null) return;

    toBlob(cardRef.current, {
      cacheBust: true,
      style: {
        fontFamily: "Sen, sans-serif",
      },
    }).then((blob) => {
      if (blob !== null) {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => {
          if (navigator.share) {
            navigator
              .share({
                files: [new File([blob], `${msg}.png`, { type: "image/png" })],
              })
              .catch((err) => {
                console.log(err.message);
              });
          } else {
            console.log("not supported");
          }
        };
      } else {
        console.log("null blob");
      }
    });
  }, [cardRef, msg]);

  return (
    <Drawer>
      <DrawerTrigger onClick={updateMsg}>
        {seen ? (
          <NewMessage seen={seened || seen} msg={msg} timestamp={time} />
        ) : (
          <NewMessage seen={seened || seen} msg={msg} timestamp={time} />
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Who sent this?</DrawerTitle>
        </DrawerHeader>
        <div className="flex justify-center items-center">
          <Cards ref={twitterRef} msg={msg} ref2={cardRef} />
        </div>
        <DrawerFooter>
          <Button
            variant={"secondary"}
            className="rounded-none hover:bg-none  shadow-none border-b-[.05rem] border-zinc-200  justify-start rounded-t-2xl mt-3 bg-zinc-100 text-black   py-6 text-lg font-bold"
          >
            Country - {country || "Not found"}
          </Button>
          <Button
            variant={"secondary"}
            className="rounded-none hover:bg-none shadow-none border-b-[.05rem]  border-zinc-200   justify-start bg-zinc-100 text-black -mt-2   py-6 text-lg font-bold"
          >
            Region - {regionName || "Not Found"}
          </Button>
          <Button
            variant={"secondary"}
            className=" rounded-none hover:bg-none shadow-none     justify-start rounded-b-2xl mb-4 bg-zinc-100 text-black -mt-2  py-6 text-lg font-bold"
          >
            City - {city || "Not Found"}
          </Button>
          <Button
            onClick={twitterShare}
            className="rounded-3xl py-6 text-lg font-bold"
          >
            Reply on <RiTwitterXLine className="ml-1 mt-0.5" />
          </Button>

          <Button
            onClick={share}
            className="rounded-3xl py-6 text-lg font-bold"
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
