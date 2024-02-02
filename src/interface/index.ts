import { Timestamp } from "firebase/firestore";

interface user {
  avatar: string;
  email: string;
  sociallink: string;
  username: string;
  uid:string
}

interface messages {
  date:Timestamp
  msg:string
  seen:boolean
  id:string
}


export type { user,messages };
