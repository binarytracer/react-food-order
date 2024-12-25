import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

export default function Meals() {
  const { isLoading, data, error } = useHttp(
    "http://localhost:3000/meals",
    {},
    []
  );

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <ul id="meals">
      {data.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
