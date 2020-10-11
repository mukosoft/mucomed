import {observable} from "mobx";
import Meals from "../models/Meals";

let instance;

/**
 * MealStore
 *
 * @author Dominique Börner
 */
export class MealStore {

    constructor() {}

    @observable favMeals = [];
    @observable mealsObj = [Meals, {
        date: "4.10.2020",
        time: [],
        name: "Schinken",
        amount: "2 Scheiben",
    }, {
        date: "4.10.2020",
        time: [],
        name: "Schinken",
        amount: "2 Scheiben",
    }, {
        date: "4.10.2020",
        time: [],
        name: "Schinken",
        amount: "2 Scheiben",
    }];
}

export function getMealStore() { return instance || (instance = new MealStore()) }