declare namespace Express {
  interface Request {
    objKey: any;
    keyStore: any;
    user: AuthPayload;
    refreshToken: string;
  }
}

interface AuthPayload {
  userId: string;
  email: string;
}