import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const Cards = React.forwardRef<HTMLDivElement,{ msg: string }>(({ msg },ref) => {
  return (
    <Card className="rounded-3xl border-none shadow-none w-[90dvw] m-0 p-0" ref={ref}>
      <CardHeader className="rounded-3xl">
        <CardTitle className="bg-gradient-to-br from-[#EC1187] to-[#FF8D10]  text-white py-4 px-3 rounded-t-3xl text-center text-2xl font-bold">
          Send me anonymous messages
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center flex justify-center items-center bg-white text-black   border-b border-r border-l  text-lg py-4  font-semibold  rounded-b-3xl">
        {msg}
      </CardContent>
    </Card>
  );
});

export default Cards;
