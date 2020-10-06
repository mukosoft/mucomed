import {observable} from "mobx";
import Meals from "../models/Meals";

let instance;

export class MealStore {

    constructor() {
        // MedicationService.getInstance().deleteAllMedications();
    }

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