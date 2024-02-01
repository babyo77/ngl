interface user {
  avatar: string;
  email: string;
  sociallink: string;
  username: string;
}

interface messages {
  date:string
  msg:string
  seen:boolean
  id:string
}

export type { user,messages };
