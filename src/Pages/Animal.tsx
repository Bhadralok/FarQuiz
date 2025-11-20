import { useQuery } from "@tanstack/react-query";
export default function Animal() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["quiz"],
    queryFn: async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        Loading...
      </div>
    );
  if (error) return <div>Error occurred: {(error as Error).message}</div>;
  console.log(data);

  // const random

  return (
    <div className="flex h-screen w-screen flex-col justify-center items-center">
      <h1>{data?.results[0].question}</h1>
      <div className="flex gap-5">
        <button>{data?.results[0]?.correct_answer}</button>
        <p>{data?.results[0].incorrect_answers[0]}</p>
        <p>{data?.results[0].incorrect_answers[1]}</p>
        <p>{data?.results[0].incorrect_answers[2]}</p>
      </div>
    </div>
  );
}
