declare namespace Express {
  interface Request {
    userId: string;
    pagination: {
      limit: number;
      page: number;
    };
  }
}
