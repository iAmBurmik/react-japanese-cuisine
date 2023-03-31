import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import styles from "./MealList.module.css";


const MealList = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState();

  useEffect(() => {
    const getMeals = async () => {
      setIsLoading(true);
      const response = await fetch("https://japan-cuisine-default-rtdb.firebaseio.com/meals.json");
      
      if(!response.ok) {
        throw new Error("Что-то пошло не так");
      }

      const data = await response.json();
      
      let loadedMeals = []
      for (let key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    }

    getMeals().catch(err => {
      setIsLoading(false);
      setHttpErrorMessage(err.message)
    });
  }, []);

  if(isLoading) {
    return (
      <section className={styles.meals}>
        <Card>
            <ul><p>Загрузка данных...</p></ul>
        </Card>
      </section>
    )
  }

  if(httpErrorMessage) {
    return (
      <section className={styles.meals}>
        <Card>
            <ul><p>{httpErrorMessage}</p></ul>
        </Card>
      </section>
    )
  }

    const mealList = meals.map(meal => <MealItem name={meal.name} description={meal.description} price={meal.price} key={meal.id} id={meal.id}/>)
    return <section className={styles.meals}>
        <Card>
            <ul>{mealList} </ul>
        </Card>
    </section>
    
}

export default MealList;