export async function fetchMeals() {
  try {
    const response = await fetch("http://localhost:3000/meals");

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    return response.json();
  } catch (e) {
    console.error(e);
  }
}

