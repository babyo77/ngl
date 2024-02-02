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
  country:string
  isp:string
  regionName:string
  city:string
}

interface info{
  country:string
  isp:string
  regionName:string
  city:string
}
export type { user,messages ,info};
