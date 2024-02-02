interface user {
  avatar: string;
  email: string;
  sociallink: string;
  username: string;
  uid:string
}

interface messages {
  date:firebaseTime
  msg:string
  seen:boolean
  id:string
}

interface firebaseTime{
  _seconds:number,
  _nanoseconds:number
}
export type { user,messages,firebaseTime };
