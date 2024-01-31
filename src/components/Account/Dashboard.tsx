import { auth, googleAuthProvider } from "../../firebase/firebaseConfig" 
import { Desktop, Mobile } from "..";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Loader } from "../Loaders/Loader";
import { apiUrl } from "@/API/api";

function Dashboard() {
  const isDesktop = window.innerWidth <= 768;
  const [loggedIn,setLoggedIn] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(true)
  useEffect(()=>{ 
   const unsubscribe =  onAuthStateChanged(auth,user=>{
      if(user){
        setLoggedIn(true)
        setLoading(false)
      }else{
        setLoading(false)
      }
    })
    return () => unsubscribe();
  },[])

  const Login = async () => {
    if (!auth.currentUser) {
     const details = await signInWithPopup(auth,googleAuthProvider)
     const user = details.user
     await fetch(`${apiUrl}/api/user`,{
      method:"post",
      headers:{
        "content-type":"application/json"
      },
    body: JSON.stringify(user)
     }).catch(err=>{
        alert(err)
      });
    }
  };

  if (!isDesktop) {
    return (
      <Desktop/>
    );
  }
  if (loading) {
    return <div className="flex h-screen justify-center items-center"><Loader color="#EC1187"/></div>;
  }
  return (
     <div>
      {loggedIn ? (
        <Mobile />
        ) : (
          <div className="flex flex-col gap-1 h-screen justify-center items-center">
     
            <Button onClick={Login}>Continue with Google</Button>
        </div>
      )}
      </div>
  
  );
}

export { Dashboard };
