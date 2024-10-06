import { apiUrl } from "@/API/api";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader } from "../Loaders/Loader";
import { auth } from "@/firebase/firebaseConfig";

export function DeleteDialog() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const deleteUser = async () => {
    try {
      setLoading(true);
      const authToken = await auth.currentUser?.getIdToken();
      const data = {
        token: authToken,
      };
      const startDelete = await fetch(`${apiUrl}/api/del`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (startDelete.ok) {
        window.location.reload();
      }
    } catch (error) {
      alert((error as { message: string }).message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"secondary"}
          className="text-[1rem] mt-3 text-red-500 font-bold rounded-2xl py-6"
        >
          Delete account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[87dvw] rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant={"secondary"}
            className="text-[1rem] mt-3 font-bold rounded-2xl py-6 px-7"
          >
            <AlertDialogCancel className=" p-0 bg-transparent border-none">
              Cancel
            </AlertDialogCancel>
          </Button>
          {isLoading ? (
            <Button
              disabled
              className="text-[1rem] bg-red-500 mt-3 font-bold rounded-2xl py-6"
            >
              <Loader />
            </Button>
          ) : (
            <Button
              onClick={deleteUser}
              className="text-[1rem] bg-red-500 mt-3 font-bold rounded-2xl py-6"
            >
              Delete account
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
