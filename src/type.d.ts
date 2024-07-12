declare namespace Express {
  interface Request {
    objKey: any;
    keyStore: any;
    user: AuthPayload;
  }
}

interface AuthPayload {
  userId: string;
  email: string;
}