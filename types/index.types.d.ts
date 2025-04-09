// DECLARE GLOBAL TYPES HERE
// RESTART EDITOR IF CHANGES DON'T APPEAR ON TYPESCRIPT LSP

import "express";

// extend the Express.User to have an optional id field
declare global {
  namespace Express {
    interface User {
      id?: string;
    }
  }
}
