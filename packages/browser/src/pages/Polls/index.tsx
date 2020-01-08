import React, { FC, useEffect, useState, useRef, Suspense } from "react";
import Loader from "components/Loader";
import PollType from "types/Poll";
import useIntersection from "hooks/useIntersection";
import Poll from "components/Poll";
import getPolls from "./getPolls";

const Polls: FC = () => {
  const [polls, setPolls] = useState<PollType[]>([]);
  const [nextPage, setNext] = useState<string | null>(null);
  const pollsRef = useRef(polls);
  const nextPageRef = useRef(nextPage);
  const loadNext = async () => {
    try {
      if (nextPageRef?.current) {
        const { newPolls, next } = await getPolls(nextPageRef.current);
        setPolls([...pollsRef.current, ...newPolls]);
        setNext(next);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { setElement } = useIntersection(loadNext);
  useEffect(() => {
    getPolls(`${process.env.REACT_APP_API_URL}/polls`)
      .then(({ newPolls, next }) => {
        console.log(newPolls);
        setNext(next);
        setPolls(newPolls);
      })
      .catch(console.log);
  }, []);
  useEffect(() => {
    pollsRef.current = polls;
    nextPageRef.current = nextPage;
  }, [nextPage, polls]);

  return (
    <>
      <section className="flex flex-wrap -mx-2 mb-8  p-10" role="feed">
        <Suspense fallback={<Loader />}>
          {polls.map(poll => (
            <Poll key={poll._id} poll={poll} />
          ))}
        </Suspense>
      </section>
      {nextPage ? (
        <Loader ref={(e: HTMLParagraphElement) => setElement(e)} />
      ) : (
        ""
      )}
    </>
  );
};

export default Polls;
