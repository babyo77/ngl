import { useParams } from "react-router-dom";
import { Container } from "./components";
import { useEffect, useState } from "react";
import { user } from "./interface";
import { apiUrl } from "./API/api";
import { Temp } from "./components/Main-Page/temp";

function App() {
  const { username } = useParams();
  const [Found, setFound] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [details, setUser] = useState<user>();
  const [randomGradient, setRandomGradient] = useState<string>(
    "bg-gradient-to-br from-blue-500 to-purple-800"
  );

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
    const userExist = async () => {
      const user = await fetch(`${apiUrl}/user/${username || "tanmay"}`);
      const details: user = await user.json();
      setUser(details);
      user.ok
        ? (setFound(true), setLoading(false))
        : (setFound(false), setLoading(false));
    };
    userExist();
    randomBg();
  }, [username]);
  if (isLoading) {
    return (
      <>
        <div
          className={`absolute top-0 z-[-2] h-full w-screen ${randomGradient}`}
        ></div>
        <div className="flex justify-center pt-12 ">
          <Temp />
        </div>
      </>
    );
  }
  return (
    <>
      {Found ? (
        <>
          <div
            className={`absolute top-0 z-[-2] h-full w-screen ${randomGradient}`}
          ></div>
          <div className="flex justify-center pt-12 ">
            <Container userDetails={details} />
          </div>
        </>
      ) : (
        <>
          <div
            className={`absolute top-0 z-[-2] h-full w-screen ${randomGradient}`}
          ></div>
          <div className="flex justify-center items-center h-dvh">
            <h1
              onClick={() => (window.location.href = "/")}
              className="text-2xl cursor-pointer font-bold text-white underline-offset-8 underline"
            >
              Not Found Go back
            </h1>
          </div>
        </>
      )}
    </>
  );
}

export default App;
