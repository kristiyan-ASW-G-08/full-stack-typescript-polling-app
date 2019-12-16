import mongoose, { Document, Model } from 'mongoose';
import RESTError, { errors } from '@utilities/RESTError';

interface FindQuery {
  name: string;
  value: number | string | mongoose.Types.ObjectId;
}
const getResource = async <T extends Document>(
  model: Model<T>,
  query: { [key: string]: string | number | mongoose.Types.ObjectId },
  select: string = '',
): Promise<T> => {
  const resource = await model.findOne(query).select(select);
  if (!resource) {
    const { status, message } = errors.NotFound;
    throw new RESTError(status, message);
  }
  return resource;
};

export default getResource;
