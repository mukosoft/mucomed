import { action, observable } from "mobx";

import MealDocument from "../documents/MealDocument";
import Logger from './../util/Logger';

let instance;

/**
 * Service class, holding meal data.
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export default class MealService {
    @observable favMeals = [];

    @action
    init() {
        Logger.log("Initializing MealService", "init()");
        return new Promise((resolve, reject) => {
            MealDocument.getInstance().get().then((meals) => this.favMeals = meals);
            resolve(true);
        })
    }

    @action
    addFavoriteMeal(meal) {
        const filteredMeal = this.favMeals.filter(favMeals => {
            return favMeals._id === meal._id;
        });

        if (filteredMeal.length === 0) {
            this.favMeals.push(meal);
            MealDocument.getInstance().add(meal);
        }
    }

    @action 
    getFavoriteMeals() {
        return this.favMeals;
    }

    @action
    removeFavoriteMeal(meal) {
        const index = this.favMeals.indexOf(meal);
        
        if (index > -1) {
            this.favMeals.splice(index, 1);
            MealDocument.getInstance().delete(meal)
        }
    }
}


export function getMealService() { return instance || (instance = new MealService()) }