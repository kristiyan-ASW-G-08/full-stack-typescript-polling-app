import { NextFunction } from 'express';
import { Document } from 'mongoose';
import RESTError, { errors } from '@utilities/RESTError';
import ValidationError from '@metp/common/source/types/ValidationError';

const duplicationErrorHandler = (
  error: any,
  doc: Document,
  next: NextFunction,
): void => {
  if (error.name === 'MongoError' && error.code === 11000) {
    const { path, value } = error;
    const { status, message } = errors.Conflict;
    const validationErrors: ValidationError[] = [
      { path, message: `${value} is already taken` },
    ];
    next(new RESTError(status, message, validationErrors));
  } else {
    next(error);
  }
};
export default duplicationErrorHandler;
