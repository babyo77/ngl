import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader } from "../Loaders/Loader";
import { apiUrl } from "@/API/api";
import { Link } from "react-router-dom";
import axios from "axios";
import { user } from "@/interface";

const FormSchema = z.object({
  messageInput: z.string().min(0).max(111),
});

export default function Container({ userDetails }: { userDetails?: user }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      messageInput: "",
    },
  });
  const [submitM, setSubmitM] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [another, setAnother] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [dice, setDice] = useState<string[]>(["hello how are you"]);
  const [info, setInfo] = useState<string>();
  const tapped = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const fetchDiceData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/dice`, {
          responseType: "text",
        });
        const chunks = response.data
          .split("\n")
          .filter(Boolean)
          .map((item: string) => item.replace(/"/g, ""));
        setDice(chunks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      const ip = await (await axios.get("https://api.ipify.org/")).data;
      setInfo(ip);
    };

    const count = setInterval(() => {
      let clickCount = parseInt(tapped.current?.textContent || "0", 10);
      clickCount += Math.floor(Math.random() * 5) - 1;
      if (tapped.current?.textContent) {
        tapped.current!.textContent = clickCount.toString();
      }
    }, 800);

    fetchDiceData();
    return () => clearInterval(count);
  }, []);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.messageInput.trim() !== "") {
      fetch(`${apiUrl}/api/message`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ip: info,
          uid: userDetails?.uid,
          ...data,
        }),
      }).then(() => {
        setSubmitM(false);
        setAnother(true);
        setTimeout(() => {
          setAnother(false);
          setShow(false);
        }, 777);
        form.setValue("messageInput", "");
      });
      setSubmitM(true);
    }
  }

  const ChangeInput = useCallback(() => {
    form.setValue("messageInput", dice[index]);
    setIndex((prev) => (prev + 1) % dice.length);
    setShow(true);
  }, [dice, form, index]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-white animate-fade-down rounded-t-[1.7rem]  flex items-center px-4 py-3">
          <a
            href={userDetails?.sociallink}
            target="_blank"
            className=" cursor-pointer"
          >
            <Avatar className="animate-fade-right">
              <AvatarImage className="" src={userDetails?.avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </a>
          <div className="ml-1.5 animate-fade-left">
            <a href={userDetails?.sociallink} target="_blank">
              <h1 className="text-[1rem] fade-in">@{userDetails?.username}</h1>
              <p className="-mt-1 animate-fade-left  text-sm font-bold">
                send me anonymous messages!
              </p>
            </a>
          </div>
        </div>

        <FormField
          control={form.control}
          name="messageInput"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormControl>
                <Textarea
                  maxLength={111}
                  onInput={(
                    e: React.ChangeEvent<HTMLTextAreaElement>
                  ): void => {
                    if (e.target.value.length > 0) {
                      setShow(true);
                    } else {
                      setShow(false);
                    }
                  }}
                  placeholder="send me anonymous messages..."
                  {...field}
                  className="w-[40rem] animate-fade-down  max-md:w-[21rem] min-h-[9rem] text-lg font-semibold rounded-b-[1.5rem] placeholder:text-xl placeholder:font-bold bg-gray-100/45 rounded-t-none border-none placeholder:text-black/25 resize-none py-4  px-5 backdrop-blur-md"
                />
              </FormControl>

              <FormMessage className="text-white" />
              <span
                onClick={ChangeInput}
                className="bg-white/40 animate-fade-left rounded-full aspect-square flex items-center justify-center w-10 h-10 cursor-pointer absolute z-10 bottom-4 right-4 text-lg"
              >
                🎲
              </span>
            </FormItem>
          )}
        />
        <p className="text-center mt-4 animate-fade-down text-white text-sm max-md:text-xs">
          🔒 anonymous q&a
        </p>

        {show && (
          <div>
            {another ? (
              <Button
                className="w-full py-7  bg-black hover:bg-black text-lg mt-3 font-bold shadow-xl text-white 
           rounded-full"
              >
                Message sent!
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={submitM}
                className="w-full py-7 animate-fade-up disabled:opacity-100 bg-black hover:bg-black text-lg mt-3 font-bold shadow-xl text-white 
          rounded-full"
              >
                {!submitM ? "Send!" : <Loader />}
              </Button>
            )}
          </div>
        )}
        {!show && (
          <div className=" relative top-[27vh]  animate-fade-up  max-md:w-[21rem]  w-[40rem]">
            <p className="text-center mt-4 fade-in  text-white text-lg font-bold max-md:text-sm">
              👇
              <span ref={tapped}>
                {" "}
                {Math.floor(Math.random() * 101) + 100}
              </span>{" "}
              people just tapped the button 👇
            </p>
            <Link to={"/da/account"}>
              <Button
                className="w-full py-7 animated-button bg-black hover:bg-black shadow-xl  text-lg mt-3 font-bold text-white 
            rounded-full"
              >
                Get your own messages!
              </Button>
            </Link>
            <p
              onClick={() => window.open("https://www.instagram.com/babyo7_/")}
              className="text-center fade-in cursor-pointer mt-3 text-white/60 font-bold text-xs"
            >
              By babyo7_
            </p>
          </div>
        )}
      </form>
    </Form>
  );
}
