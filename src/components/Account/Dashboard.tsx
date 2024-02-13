import { auth, googleAuthProvider } from "../../firebase/firebaseConfig";
import { Desktop, Mobile } from "..";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Loader } from "../Loaders/Loader";
import { apiUrl } from "@/API/api";
import { Link } from "react-router-dom";
function Dashboard() {
  const isDesktop = window.innerWidth <= 768;
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [randomGradient, setRandomGradient] = useState<string>();

  const randomBg = () => {
    const random = Math.floor(Math.random() * 3);
    const gradient = [
      "bg-gradient-to-br from-blue-500 to-purple-800",
      "bg-gradient-to-br from-[#EC1187] to-[#FF8D10]",
      "bg-gradient-to-br from-pink-500 via-purple-600 to-purple-900",
    ];
    setRandomGradient(gradient[random]);
  };
  useEffect(() => {
    randomBg();
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
    setLoading(true);
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
        });
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
      <div
        className={`flex ${randomGradient} h-dvh justify-center items-center`}
      >
        <Loader />
      </div>
    );
  }
  return (
    <div>
      {loggedIn ? (
        <Mobile />
      ) : (
        <div
          className={`flex flex-col gap-1 ${randomGradient} h-dvh justify-center items-center`}
        >
          <h1 className="text-white font-extrabold">NGLdrx.</h1>
          <Button
            onClick={Login}
            className="border-none rounded-3xl font-extrabold py-6 px-8 text-[1rem]"
          >
            Continue with Google
          </Button>
          <Link to={"/"}>
            {!window.matchMedia("(display-mode: standalone").matches && (
              <p className="underline text-white font-extrabold underline-offset-4 mt-1">
                Go back
              </p>
            )}
          </Link>
        </div>
      )}
    </div>
  );
}

export { Dashboard };
