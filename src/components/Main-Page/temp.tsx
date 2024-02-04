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
import { Link } from "react-router-dom";
import { useState } from "react";

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

  const [show, setShow] = useState<boolean>(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
      return data
  }



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
                  className="w-[40rem] max-md:w-[21rem] min-h-[9rem] text-lg font-semibold rounded-b-[1.5rem] placeholder:text-xl placeholder:font-semibold bg-white/40 rounded-t-none border-none placeholder:text-black/25 resize-none py-4  px-5 backdrop-blur-md"
                />
              </FormControl>

              <FormMessage className="text-white" />
              <span
               
                className="bg-white/40 px-1.5 selection:bg-none cursor-pointer py-1 rounded-full absolute text-lg z-10 bottom-3.5   right-3"
              >
                🎲
              </span>
            </FormItem>
          )}
        />
        <p className="text-center mt-4 text-white text-sm max-md:text-xs">
          🔒 anonymous q&a
        </p>

     
          
        
        {!show && (
          <div className=" relative top-[29vh]   max-md:w-[21rem]  w-[40rem]">
            <p className="text-center mt-4 text-white text-lg font-bold max-md:text-sm">
              👇 get your own tap this button 👇
            </p>
            <Link to={"/da/account"}>
              <Button
                className="w-full py-7 animated-button bg-black hover:bg-black shadow-xl  text-lg mt-3 font-bold text-white 
            rounded-full"
              >
                Get your own messages!
              </Button>
            </Link>
            <p className="text-center mt-3 text-white/60 font-bold text-xs">
              Inspired by NGL.
            </p>
          </div>
        )}
      </form>
    </Form>
  );
}
