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

const FormSchema = z.object({
  messageInput: z.string().min(0),
});

export default function Temp() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      messageInput: "",
    },
  });

  return (
    <Form {...form}>
      <form>
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
              <span className="bg-white/40 max-md:px-2 px-1.5  max-md:text-base selection:bg-none cursor-pointer py-1 max-md:py-1.5 rounded-full absolute text-lg z-10 bottom-4  right-4">
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
