import {action, observable} from "mobx";
import DateStorageModel from "../models/DateStorageModel";
import medication from "../models/Medication";
import {DateTimeConverterService} from "../service/DateTimeConverterService";

/**
 * Store for date and times.
 *
 * @author Dominique Börner
 */
export class DateStorage {
    @observable calendarSelection = new Date();

    @action
    setCalendarSelection(date) {
        this.calendarSelection = date;
    }

    @action
    isDate(date) {
        console.log(this.getCalendarSelection());
        return date.getDay() === this.calendarSelection.getDay();
    }

    @action
    init() {
        this.calendarSelection = new Date();
    }

}

let instance: DateStorage;
export function getDateStorage() { return instance || (instance = new DateStorage()) }