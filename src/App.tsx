import { useParams } from "react-router-dom";
import { Container } from "./components";
import { useEffect, useState } from "react";
import { user } from "./interface";
import { apiUrl } from "./API/api";

function App() {
  const { username } = useParams();
  const [Found, setFound] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [details, setUser] = useState<user>();
  useEffect(() => {
    const userExist = async () => {
      const user = await fetch(`${apiUrl}/user/${username || "tanmay"}`);
      const details: user  = await user.json();
      setUser(details);
      user.ok
        ? (setFound(true), setLoading(false))
        : (setFound(false), setLoading(false));
    };
    userExist();
  }, [username]);
  if (isLoading) {
    return (
      <>
          <div className="absolute top-0 z-[-2] h-full w-screen bg-gradient-to-br from-[#EC1187] to-[#FF8D10]"></div>
          <div className="flex justify-center pt-12 ">
            <Container userDetails={details}/>
          </div>
        </>
    );
  }
  return (
    <>
      {Found ? (
        <>
          <div className="absolute top-0 z-[-2] h-full w-screen bg-gradient-to-br from-[#EC1187] to-[#FF8D10]"></div>
          <div className="flex justify-center pt-12 ">
            <Container userDetails={details}/>
          </div>
        </>
      ) : (
        <>
          <div className="absolute top-0 z-[-2] h-full w-screen bg-gradient-to-br from-[#EC1187] to-[#FF8D10]"></div>
          <div className="flex justify-center items-center h-dvh">
            <h1 onClick={()=>window.location.href = "/"} className="text-2xl font-bold text-white underline-offset-8 underline">
              
Not Found Go back

            </h1>
          </div>
        </>
      )}
    </>
  );
}

export default App;
