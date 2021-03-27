import AsyncStorage from "@react-native-community/async-storage";
import Datastore from "react-native-local-mongodb";
import AbstractMongoDocument from "../abstracts/AbstractMongoDocument";

let instance: VitaldataDocument;

/**
 * Defines an MedicationDocument
 */
export default class VitaldataDocument extends AbstractMongoDocument {

    static getInstance(): VitaldataDocument {
        return instance || (instance = new VitaldataDocument());
    }

    constructor() {
        super();
        
        this.db = new Datastore({
            filename: 'VitaldataDocument',
            storage: AsyncStorage,
            autoload: true
        });
    }
}