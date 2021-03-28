import AsyncStorage from "@react-native-community/async-storage";
import Datastore from "react-native-local-mongodb";
import AbstractMongoDocument from "../abstracts/AbstractMongoDocument";

let instance: SettingsDocument;

/**
 * Document, which stores settings like language, theme and notification stuff.
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export default class SettingsDocument extends AbstractMongoDocument {
    // properties
    db:Datastore;

    static getInstance(): SettingsDocument {
        return instance || (instance = new SettingsDocument());
    }

    constructor() {
        super();
        
        this.db = new Datastore({
            filename: 'SettingsDocument',
            storage: AsyncStorage,
            autoload: true
        });
    }
}