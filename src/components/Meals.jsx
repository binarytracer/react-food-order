import MealItem from "./MealItem";
import useHttp, { requestConfig } from "../hooks/useHttp";
import Error from "./Error";

export default function Meals() {
  const { isLoading, data, error } = useHttp(
    "http://localhost:3000/meals",
    requestConfig,
    []
  );

  if (isLoading) {
    return <p className="center">Fetching meals.</p>;
  }

  if (error) {
    return <Error message={error} title="Failed to fetch meals" />;
  }

  return (
    <ul id="meals">
      {data.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
