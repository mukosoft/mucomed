import { modalAnimations } from "@res/animations";
import { action, observable } from "mobx";
import { Navigation } from "react-native-navigation";
import MealDocument from "../documents/MealDocument";
import MedicationDocument from "../documents/MedicationDocument";

let instance;

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

    static openMealInstruction(meal) {
        Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            name: 'RecipeInstructionScreen',
                            passProps: {
                                meal: meal
                            },
                            options: {
                                topBar: {
                                    title: {
                                        text: 'Rezept',
                                    },
                                },
                                animations: modalAnimations
                            },
                        },
                    },
                ],
            },
        })
    }
}


export function getMealService() { return instance || (instance = new MealService()) }