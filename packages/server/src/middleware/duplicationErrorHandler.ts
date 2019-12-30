import { NextFunction } from 'express';
import { Document } from 'mongoose';
import RESTError, { errors as restErrors } from '@utilities/RESTError';
import ValidationError from '@poll/common/source/types/ValidationError';

const duplicationErrorHandler = (
  { errors }: any,
  doc: Document,
  next: NextFunction,
): void => {
  const validationErrors: ValidationError[] = Object.values(errors).map(
    // @ts-ignore
    ({ path, value }): ValidationError => ({
      path,
      message: `${value} is already taken`,
    }),
  );
  const { status, message } = restErrors.Conflict;
  next(new RESTError(status, message, validationErrors));
};
export default duplicationErrorHandler;
