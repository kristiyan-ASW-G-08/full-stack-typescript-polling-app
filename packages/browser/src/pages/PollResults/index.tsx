import React, { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import getPoll from "utilities/getPoll";
import Poll from "types/Poll";
import Option from "types/Option";

const PollResults: FC = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [optionVotes, setVotes] = useState<number[]>([]);
  useEffect(() => {
    getPoll(pollId || "")
      .then((response: { poll: Poll; options: Option[] }) => {
        setPoll(response.poll);
        setLabels(response.options.map(({ name }) => name));
        setVotes(response.options.map(({ votes }) => votes));
      })
      .catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(pollId);
  return (
    <section
      style={{ height: "90vh" }}
      className="flex items-center flex-col  justify-center w-screen"
    >
      <h1 className="text-4xl">{poll?.name}</h1>
      <p className="text-3xl">{poll?.description}</p>
      <div className="w-full lg:w-1/2 h-64" style={{ height: "50vh" }}>
        <Bar
          options={{ maintainAspectRatio: false, aspectRatio: 1 }}
          data={{
            labels,
            datasets: [
              {
                label: poll?.name,
                fill: true,
                data: optionVotes,
                backgroundColor: ["#4DC0B5", "#3490DC", "#6574CD", "#FFED4A"]
              }
            ]
          }}
        />
      </div>
    </section>
  );
};

export default PollResults;
