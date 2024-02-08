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
import React, { useEffect, useRef, useState } from "react";
import { auth, storage, usersCollection } from "@/firebase/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { user } from "@/interface";
import { Loader } from "../Loaders/Loader";
import axios from "axios";
import { apiUrl } from "@/API/api";
import { useMutation } from "react-query";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const FormSchema = z.object({
  username: z
    .string()
    .refine((data) => !data || (data.length >= 3 && !/[$*/#@]/.test(data)), {
      message: "Invalid username.",
    })
    .optional(),
  sociallink: z
    .string()
    .refine((data) => !data || z.string().url().safeParse(data).success, {
      message: "Invalid URL format.",
    })
    .optional(),
});

export function ChangeDetailsForm() {
  const [loggedData, setLoggedData] = useState<user>();
  const [uploadFile, setUploadFile] = useState<boolean>();
  const { mutateAsync, isSuccess, isLoading, isError } =
    useMutation(updateUsername);
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const uid = doc(usersCollection, user.uid);
      onSnapshot(uid, (userDetails) => {
        if (userDetails.exists()) {
          setLoggedData(userDetails.data() as user);
        }
      });
    }
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: undefined,
      sociallink: undefined,
    },
  });

  async function updateUsername(token: {
    token: string;
    username?: string;
    sociallink?: string;
  }) {
    const res = await axios.post(`${apiUrl}/api/user/update/username`, token);
    return res.data;
  }
  async function updateDp(token: { token: string; dp: string }) {
    await axios.post(`${apiUrl}/api/user/update/dp`, token);
    setUploadFile(false);
  }
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.sociallink || data.username) {
      const token = {
        token: (await auth.currentUser?.getIdToken()) ?? "",
        username: data?.username,
        sociallink: data?.sociallink,
      };

      await mutateAsync(token);
    }
  }
  const fileinput = useRef<HTMLInputElement>(null);

  const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setUploadFile(true);

    if (file) {
      await uploadBytes(ref(storage, auth.currentUser?.uid), file);
      const url = await getDownloadURL(ref(storage, auth.currentUser?.uid));
      const token = {
        token: (await auth.currentUser?.getIdToken()) ?? "",
        dp: url,
      };
      updateDp(token);
    }
  };
  return (
    <Form {...form}>
      <input
        type="file"
        ref={fileinput}
        accept="image/*"
        className="hidden"
        onChange={upload}
      />
      <div className="flex justify-center">
        <Avatar
          onClick={() => fileinput.current?.click()}
          className="border-white   border-[.2rem] h-24 w-24"
        >
          {uploadFile ? (
            <div className="flex w-full justify-center items-center h-full">
              <Loader color="black" />
            </div>
          ) : (
            <AvatarImage src={loggedData?.avatar} alt={loggedData?.username} />
          )}

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
        <FormField
          control={form.control}
          name="sociallink"
          render={({ field }) => (
            <FormItem className="text-center">
              <FormDescription>
                link account with custom social media link.
              </FormDescription>
              <FormControl>
                <Input
                  placeholder={"link"}
                  {...field}
                  className=" rounded-xl"
                />
              </FormControl>
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
            <Button
              disabled
              className="text-[1rem] w-full py-6 mt-2 font-bold rounded-2xl"
            >
              Profile updated
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
