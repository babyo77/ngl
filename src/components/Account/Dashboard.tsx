import { auth, googleAuthProvider } from "../../firebase/firebaseConfig";
import { Desktop, Mobile } from "..";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Loader } from "../Loaders/Loader";
import { apiUrl } from "@/API/api";

function Dashboard() {
  const isDesktop = window.innerWidth <= 768;
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const Login = async () => {
setLoading(true)
    if (!auth.currentUser) {
      try {
        const details = await signInWithPopup(auth, googleAuthProvider);
        const user = details.user;
       await fetch(`${apiUrl}/api/user`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!isDesktop) {
    return <Desktop />;
  }
  if (loading) {
    return (
      <div className="flex h-dvh justify-center items-center">
        <Loader color="#EC1187" />
      </div>
    );
  }
  return (
    <div>
      {loggedIn ? (
        <Mobile />
      ) : (
        <div className="flex flex-col gap-1 bg-gradient-to-br from-[#EC1187] to-[#FF8D10] h-dvh justify-center items-center">
          <h1 className="text-white font-extrabold">NGLdrx.</h1>
          <Button
            onClick={Login}
            className="border-none rounded-3xl font-extrabold py-6 px-8 text-[1rem]"
          >
            Continue with Google
          </Button>
        </div>
      )}
    </div>
  );
}

export { Dashboard };
