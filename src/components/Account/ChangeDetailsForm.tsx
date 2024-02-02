"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";
import { auth, usersCollection } from "@/firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { user } from "@/interface";
import { Loader } from "../Loaders/Loader";
import axios from "axios";
import { apiUrl } from "@/API/api";
import { useMutation } from "react-query";

const FormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
});

export function ChangeDetailsForm() {
  const [loggedData, setLoggedData] = useState<user>();
  const { mutateAsync, isSuccess, isLoading, isError } =
    useMutation(updateUsername);
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const uid = doc(usersCollection, user.uid);
      const unsubscribe = onSnapshot(uid, (userDetails) => {
        if (userDetails.exists()) {
          setLoggedData(userDetails.data() as user);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  async function updateUsername(token: { token: string; username: string }) {
    const res = await axios.post(`${apiUrl}/api/user/update/username`, token);
    return res.data;
  }
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const token = {
      token: (await auth.currentUser?.getIdToken()) ?? "",
      username: data.username,
    };
    await mutateAsync(token);
  }

  return (
    <Form {...form}>
      <div className="flex justify-center">
        <Avatar
          onClick={() => alert("adding soon...")}
          className="border-white  border-[.2rem] h-24 w-24"
        >
          <AvatarImage src={loggedData?.avatar} alt={loggedData?.username} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="text-center">
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormControl>
                <Input
                  placeholder={loggedData?.username}
                  {...field}
                  className=" rounded-xl"
                />
              </FormControl>
              {isError && <FormMessage>username already exist</FormMessage>}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          {!isSuccess ? (
            <Button
              type="submit"
              className="text-[1rem] w-full py-6 mt-2 font-bold rounded-2xl"
            >
              {isLoading ? <Loader /> : "Save changes"}
            </Button>
          ) : (
            <Button className="text-[1rem] w-full py-6 mt-2 font-bold rounded-2xl">
              Profile updated
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
