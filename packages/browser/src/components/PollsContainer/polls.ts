import axios from "axios";

const wrapPromise = (promise: Promise<any>) => {
  let status = "pending";
  let result: any;
  const suspender = promise.then(
    res => {
      console.log(res, "Res");
      status = "success";
      result = res;
    },
    err => {
      console.log(err);
      status = "error";
      result = err;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
};
const getPolls = () => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/polls`)
    .then(res => res.data)
    .catch(err => console.log(err));
};

const fetchData = () => {
  const pollsPromise = getPolls();

  return {
    polls: wrapPromise(pollsPromise)
  };
};

export default fetchData;
