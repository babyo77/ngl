import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const Cards = React.forwardRef<
  HTMLDivElement,
  { msg: string; ref2: React.RefObject<HTMLDivElement> }
>(({ msg, ref2 }, ref) => {
  return (
    <div>
      <div
        ref={ref}
        className="w-[300px] hidden  h-[300px]    flex-col items-center"
      >
        <nav className="bg-gradient-to-br from-[#EC1187] to-[#FF8D10] p-4 py-7 text-center text-white font-bold text-2xl">
          Send me anonymous messages
        </nav>
        <div className=" overflow-auto font-semibold text-center rounded-b-xl border-r border-l border-b  w-full h-full flex justify-center items-center text-2xl">
          {msg}
        </div>
      </div>
      <Card
        ref={ref2}
        className="rounded-3xl border-none shadow-none w-[90dvw] m-0 p-0"
      >
        <CardHeader className="rounded-3xl">
          <CardTitle className="bg-gradient-to-br from-[#EC1187] to-[#FF8D10]  text-white py-4 px-3 rounded-t-3xl text-center text-2xl font-bold">
            Send me anonymous messages
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-wrap  flex justify-center items-center bg-white text-black   border-b border-r border-l  text-lg py-4  font-semibold  rounded-b-3xl">
          <span className=" overflow-auto">{msg}</span>
        </CardContent>
      </Card>
    </div>
  );
});

export default Cards;
