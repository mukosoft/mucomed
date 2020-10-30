import {getUiStore} from "../stores/UiStore";
import {observer} from "mobx-react";

export class DateTimeConverterService {

    static convertDateToTime(dateObj = new Date()) {
        console.log(dateObj.getHours())
        console.log(dateObj.getMinutes())

        return `${(dateObj.getHours() < 10 ? '0' + dateObj.getHours() : dateObj.getHours())}:${(dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes())}`;
    }

    static formatDate(dateObj, withYear = true):String {
        let date = `${(dateObj.getDate())}.${(dateObj.getMonth() + 1)}.`;

        if (withYear === true) {
            date += `${dateObj.getFullYear()}`;
        }

        return date;
    }

    static convertSelectedDateToDateObj(selectedDate:String) {
        let day = selectedDate.split('.')[0];
        let month = selectedDate.split('.')[1];
        let year = selectedDate.split('.')[2];

        let date = new Date();
        date.setDate(day);
        date.setMonth(month-1);
        date.setFullYear(year);

        return DateTimeConverterService.getDateName(date);
    }

    static getDateName(dateObj:Date):String {
        const days = getUiStore().getTranslation('days');
        return days[dateObj.getDay()];
    }
}