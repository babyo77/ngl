import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useEffect, useRef } from "react";

const FormSchema = z.object({
  messageInput: z.string().min(0, {
    message: "Message must be at least 7 characters.",
  }),
});

export function Temp() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      messageInput: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    return data;
  }

  const tapped = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const count = setInterval(() => {
      let clickCount = parseInt(tapped.current?.textContent || "0", 10);
      clickCount += Math.floor(Math.random() * 5) - 1;
      tapped.current!.textContent = clickCount.toString();
    }, 800);

    return () => clearInterval(count);
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-white rounded-t-[1.7rem]  flex items-center px-4 py-3">
          <a href={""} target="_blank">
            <Avatar>
              <AvatarImage className="fade-in" src={""} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </a>
          <div className="ml-1.5">
            <a href={""} target="_blank">
              <h1 className="text-[1rem] fade-in">@...</h1>
              <p className="-mt-1  text-sm font-bold">
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
                  placeholder="send me anonymous messages..."
                  {...field}
                  className="w-[40rem] max-md:w-[21rem] min-h-[9rem] text-lg font-semibold rounded-b-[1.5rem] placeholder:text-xl placeholder:font-semibold bg-white/40 rounded-t-none border-none placeholder:text-black/25 resize-none py-4  px-5 backdrop-blur-md"
                />
              </FormControl>

              <FormMessage className="text-white" />
              <span className="bg-white/40 px-1.5 selection:bg-none cursor-pointer py-1 rounded-full absolute text-lg z-10 bottom-3.5   right-3">
                🎲
              </span>
            </FormItem>
          )}
        />
        <p className="text-center mt-4 text-white text-sm max-md:text-xs">
          🔒 anonymous q&a
        </p>
      </form>
    </Form>
  );
}
