declare namespace Express {
  interface Request {
    objKey: any;
    keyStore: any;
  }
}

interface AuthPayload {
  userId: string;
  email: string;
}