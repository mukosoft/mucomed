import Datastore from "react-native-local-mongodb";
import AsyncStorage from '@react-native-community/async-storage';
import {DateStorage, getDateStorage} from "../stores/DateStorage";
import DateStorageModel from "../models/DateStorageModel";

let instance: DateStorageService;

export default class DateStorageService {

    static getInstance(): DateStorageService {
        return instance || (instance = new DateStorageService());
    }

    db:Datastore;

    constructor() {
        this.db = new Datastore({
            filename: 'DateStorage',
            storage: AsyncStorage,
            autoload: true
        });
    }

    getDateData(query = {}):Promise {
        return this.db.findAsync(query);
    }

    addDateData(dateData) {
        return this.db.insertAsync(dateData);
    }
rr
    updateDateData(updateQuery , data) {
        return this.db.updateAsync(updateQuery, data);
    }

    deleteAllDateData() {
        return this.db.removeAsync({}, { multi: true });
    }

    createNewStorageIfNotExists() {
        this.getDateData({ date: getDateStorage().getSelectedDate()}).then((result) => {
            if (result.length === 0) {
                let dateStorageModel = DateStorageModel;
                dateStorageModel.date = getDateStorage().getSelectedDate();
                this.addDateData(DateStorageModel).then((result) => {
                    getDateStorage().setSelectedDate(result.date);
                    console.log(`DEBUG: added document ${JSON.stringify(result)} to DateStorageService`);
                });
            } else {
                getDateStorage().setSelectedDate(result[0].date)
            }
        })
    }
}