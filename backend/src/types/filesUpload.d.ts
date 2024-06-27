import 'express-fileupload';

declare global {
  namespace Express {
    interface Request {
      files?: import('express-fileupload').FileArray | null;
    }
  }
}
