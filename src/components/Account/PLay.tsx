import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { FaLink } from "react-icons/fa";
import { auth,storage,usersCollection } from "@/firebase/firebaseConfig";
import { user } from "@/interface";
import { doc, onSnapshot } from "firebase/firestore";
import { Loader } from "../Loaders/Loader";
import axios from "axios";
import { apiUrl } from "@/API/api";
import { useLocation } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function PLay() {

  const [uploadFile, setUploadFile] = useState<boolean>();
  const [loggedData, setLoggedData] = useState<user>();
  const [isLoading, setIsLoading] = useState<boolean>();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fileinput = useRef<HTMLInputElement>(null)

  async function updateDp(token: { token: string; dp: string }) {
    await axios.post(`${apiUrl}/api/user/update/dp`, token);
    setUploadFile(false)
  }
  const upload = async(event:React.ChangeEvent<HTMLInputElement>)=>{
    const file = event.target.files?.[0]
    setUploadFile(true)
    
    if(file){
    
      await uploadBytes(ref(storage,auth.currentUser?.uid),file)
      const url = await getDownloadURL(ref(storage,auth.currentUser?.uid))
      const token = {
        token: (await auth.currentUser?.getIdToken()) ?? "",
        dp: url,
      };
        updateDp(token)
    }
    }
  useEffect(() => {
    const fetchData = async()=>{

      setIsLoading(true)
      const user = auth.currentUser;
      if (user) {
        const uid = doc(usersCollection, user.uid);
        onSnapshot(uid, (userDetails) => {
          if (userDetails.exists()) {
            setLoggedData(userDetails.data() as user);
            setIsLoading(false)
          }
        });
     
      }     
    if( searchParams.has("em")){
      axios.post(`${apiUrl}/em`,JSON.stringify({token:await auth.currentUser?.getIdToken()}),{
        headers:{
          "Content-Type":"application/json"
        }
      })
       history.pushState({},"",window.location.origin+"/da/account")
     }
    }
    fetchData()
  }, []);

  const handleShare = async () => {
    axios.post(`${apiUrl}/share`,JSON.stringify({token:await auth.currentUser?.getIdToken()}),{
      headers:{
        "Content-Type":"application/json"
      }
    })
    if (navigator.share) {
      await navigator.share({
        title: "send me anonymous messages!",
        text: "send me anonymous messages!",
        url: `${window.location.origin}/${loggedData?.username}`,
      });
    }
  };
  const handleCopy = async() => {
    axios.post(`${apiUrl}/share`,JSON.stringify({token:await auth.currentUser?.getIdToken()}),{
      headers:{
        "Content-Type":"application/json"
      }
    })
      navigator.clipboard
        .writeText(`${window.location.origin}/${loggedData?.username}`)
        .then(() => {
          alert("🔗 link copied");
        });
  };

  return (
    <>
    {isLoading &&(
            <div className="w-full h-[90dvh] text-xl font-extrabold  flex justify-center items-center">
            <Loader color="#EC1187"/>
          </div>
    )}
      {loggedData && (
        <div className="px-3 py-2 flex fade-in  flex-col gap-4 justify-center items-center">
          <div className="border gap-2   bg-black/90 backdrop-blur-lg w-[90dvw] py-11 flex-col rounded-[2.2rem] shadow-lg  flex justify-center items-center">
          <input type="file" ref={fileinput} accept="image/*" className="hidden" onChange={upload} />
            <Avatar onClick={()=>fileinput.current?.click()} className="border-white  border-[.2rem] h-16 w-16">
             
            {uploadFile ?(
            <div className="flex w-full bg-white justify-center items-center h-full">
              <Loader color="black"/>
            </div>

          ):(
            <AvatarImage src={loggedData?.avatar} alt={loggedData?.username} />
          )}
              
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-white font-bold text-2xl w-[70vw] text-center">
              send me anonymous messages!
            </h1>
          </div>

          <div className="  bg-zinc-100 backdrop-blur-lg py-7 mt-1 w-[90dvw] flex-col rounded-3xl gap-3 flex justify-center items-center">
            <h1 className="text-black font-bold text-lg  text-center">
              Step 1: Copy your link
            </h1>
            <p
              className="text-zinc-500  w-[70vw]  overflow-auto font-semibold text-[.7rem]  bg-transparent uppercase text-center"
            >
              {`${window.location.host}/${loggedData.username}`}
            </p>

            <Button
              onClick={handleCopy}
              className="flex items-center justify-center tracking-normal font-extrabold border-[#EC1187] bg-gradient-to-br from-[#EC1187] to-[#FF8D10] border-[.2rem] py-4 text-sm px-6 bg-clip-text text-[#EC1187]  rounded-full shadow-none"
            >
              {" "}
              <FaLink className="mr-2" /> copy link
            </Button>
          </div>

          <div className="  bg-zinc-100 backdrop-blur-lg py-6 w-[90dvw] flex-col rounded-3xl gap-3 flex justify-center items-center">
            <h1 className="text-black font-bold text-lg  text-center">
              Step 2: Share link on social media
            </h1>
            <Button
              onClick={handleShare}
              className=" bg-transparent px-32 text-lg py-7  flex items-center justify-center tracking-normal font-extrabold  bg-gradient-to-br from-[#EC1187] to-[#FF8D10] rounded-full shadow-none"
            >
              Share
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default PLay;
