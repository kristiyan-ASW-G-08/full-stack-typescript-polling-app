import mongoose, { Model, Document } from 'mongoose';

const findResources = async <
  T extends Document,
  Y = { [key: string]: string | mongoose.Types.ObjectId }
>(
  model: Model<T>,
  page: number,
  limit: number,
  query: Y,
): Promise<{
  documents: T[];
  count: number;
}> => {
  const documents = await model
    .countDocuments()
    .find(query)
    .skip((page - 1) * limit)
    .limit(limit);
  const count = (await model.countDocuments(query)) - page * limit;

  return {
    documents,
    count,
  };
};

export default findResources;
