import React, { useEffect, useState } from "react";
import classes from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://reacthttp-92850-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({ id: key, ...responseData[key]});
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>;
  }

  if (error) {
    return <section className={classes.mealsError}>
        <p>{error}</p>
      </section>;
  }

  const mealsList =  meals.map(meal => {
      return <MealItem key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}>
      </MealItem>;
  });
  return (
      <section className={classes.meals}>
        <Card>
          <ul>
            { mealsList }
          </ul>
        </Card>
      </section>
  );
};

export default AvailableMeals;