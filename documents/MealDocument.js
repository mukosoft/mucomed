import AsyncStorage from "@react-native-community/async-storage";
import Datastore from "react-native-local-mongodb";
import AbstractMongoDocument from "../abstracts/AbstractMongoDocument";

let instance: MealDocument;

/**
 * Defines an MedicationDocument
 */
export default class MealDocument extends AbstractMongoDocument {

    static getInstance(): MealDocument {
        return instance || (instance = new MealDocument());
    }

    constructor() {
        super();
        
        this.db = new Datastore({
            filename: 'MealDocument',
            storage: AsyncStorage,
            autoload: true
        });
    }
}