
import { Request } from 'express';

// Extending Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
        subject?: string;
      };
    }
  }
}
