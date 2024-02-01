import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import PLay from "./PLay"
import { IoIosSettings } from "react-icons/io";
import Inbox from "./Inbox";
import Settings from "./Settings";
export function Tab() {
  return (
    <Tabs defaultValue="play">
      <TabsList className="w-full bg-transparent z-10 fixed top-0 bg-white h-fit items-center justify-between px-4 border-b">
        <IoIosSettings className="h-8   w-8 text-white" />
        <div className="mb-3">
        <TabsTrigger value="play">PLAY</TabsTrigger>
        <TabsTrigger value="inbox">INBOX <div className="rounded-full bg-red-500 h-3 w-3 ml-1"></div></TabsTrigger>
        </div>
        <Settings/>
      </TabsList>

      <TabsContent value="play" className="mt-[10dvh]">
      <PLay/>
      </TabsContent>


      <TabsContent value="inbox" className="mt-[10dvh]">
      <Inbox/>
      </TabsContent>


    </Tabs>
  )
}
