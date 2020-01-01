import CommonPole from "@poll/common/source/types/Poll";

export default interface Poll extends CommonPole {
  _id: string;
  creator: string;
}
