import AbstractMongoDocument from "../abstracts/AbstractMongoDocument";

let instance: MedicationDocument;

/**
 * Defines an MedicationDocument
 */
export default class MedicationDocument extends AbstractMongoDocument {
    // properties
    db:Datastore;

    static getInstance(): MedicationDocument {
        return instance || (instance = new MedicationDocument());
    }

    constructor() {
        this.db = new Datastore({
            filename: 'MedicationDocument',
            storage: AsyncStorage,
            autoload: true
        });
    }
}