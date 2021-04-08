import { action, observable } from "mobx";
import MealDocument from "../documents/MealDocument";

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
        MealDocument.getInstance().get().then((meals) => this.favMeals = meals);
    }

    @action
    addMealToFav(meal) {
        const filteredMeal = this.favMeals.filter(favMeals => {
            return favMeals._id === meal._id;
        });

        if (filteredMeal.length === 0) {
            this.favMeals.push(meal);
            MealDocument.getInstance().add(meal);
        }
    }

    @action 
    getFavMeals() {
        return this.favMeals;
    }

    @action
    removeFavMeal(meal) {
        const index = this.favMeals.indexOf(meal);
        
        if (index > -1) {
            this.favMeals.splice(index, 1);
            MealDocument.getInstance().delete(meal)
        }
    }
}


export function getMealService() { return instance || (instance = new MealService()) }