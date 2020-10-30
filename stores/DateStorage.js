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
    @observable calendarSelectionDateId;

    @action
    setCalendarSelection(date) {
        this.calendarSelection = date;
        this.calendarSelectionDateId = this.getDateId(date);
    }

    @action
    isDate(date) {
        console.log(this.getCalendarSelection());
        return date.getDay() === this.calendarSelection.getDay();
    }

    @action
    init() {
       this.setCalendarSelection(new Date());
    }

    getDateId(dateObj:Date):String {
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        return days[dateObj.getDay()];
    }

}

let instance: DateStorage;
export function getDateStorage() { return instance || (instance = new DateStorage()) }