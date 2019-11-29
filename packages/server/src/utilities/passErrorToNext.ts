import { NextFunction } from 'express';
import RESTError, { errors } from '@utilities/RESTError';

const passErrorToNext = (err: any | RESTError, next: NextFunction): void => {
  if (err.status !== undefined) {
    next(err);
  } else {
    const { status, message } = errors.InternalServerError;
    const error = new RESTError(status, message, err);
    next(error);
  }
};
export default passErrorToNext;
