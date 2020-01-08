import CommonOption from "@poll/common/source/types/Option";

export default interface Option extends CommonOption {
  poll: string;
  _id: string;
}
