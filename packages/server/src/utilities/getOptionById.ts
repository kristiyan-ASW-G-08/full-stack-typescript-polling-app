import Option from '@pollOptions/Option';
import OptionType from '@customTypes/Option';
import getResource from '@utilities/getResource';

const getOptionById = async (_id: string): Promise<OptionType> =>
  getResource<OptionType>(Option, { _id });
export default getOptionById;
