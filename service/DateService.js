import { action, observable } from "mobx";

import Logger from './../util/Logger';

/**
 * Store for date and times.
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export class DateService {
    @observable calendarSelection = new Date();
    @observable calendarSelectionDateId;
    @observable medicationTime;

    @action
    getMedicationTime() {
        return this.medicationTime;
    }

    @action
    setCalendarSelection(date) {
        this.calendarSelection = date;
        this.setCalendarSelectionDateId(date);
    }

    @action setMedicationTime(medicationTime) {
        this.medicationTime = medicationTime;
    }

    @action
    isDate(date) {
        return date.getDay() === this.calendarSelection.getDay();
    }

    @action
    init() {
        Logger.log('Initializing DateService', 'init()');
        return new Promise((resolve) => {
            const date = new Date();
            this.setCalendarSelection(date);
            this.setCalendarSelectionDateId(date);
            resolve(true);
        })
    }

    @action
    setCalendarSelectionDateId(dateObj: Date): String {
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const selectedDate = days[dateObj.getDay()];
        this.calendarSelectionDateId = selectedDate;
    }

    sortTimeArray(timeArray: Array) {
        let newTimeArray = [];
        let newTimeStringArray = [];

        timeArray.map((time) => {
            let medicationTimeNumber = `${time.split(':')[0]}${time.split(':')[1]}${time.split(':')[2]}`;
            newTimeArray.push(medicationTimeNumber);
        });

        newTimeArray.sort((a, b) => a - b)
        newTimeArray.map((time) => {

            let hour = time.toString().slice(0, 2);
            let minutes = time.toString().slice(2, 4);
            let seconds = time.toString().slice(4, 6);

            newTimeStringArray.push(`${hour}:${minutes}:${seconds}`);
        })

        return newTimeStringArray;
    }

    removeSecondsFromTime(timeString) {
        const hours = timeString?.split(':')[0];
        const minutes = timeString?.split(':')[1];

        return `${hours}:${minutes}`;
    }

    renderTime(time: Date) {
        let hours = time.getHours();
        let minutes = time.getMinutes();

        if ((hours) < 10) { hours = `0${hours}` }
        if ((minutes) < 10) { minutes = `0${minutes}` }

        return `${hours}:${minutes}:00`
    }

    getChristmas() {
        const date1 = new Date();
        date1.setDate(24);
        date1.setMonth(11);

        const date2 = new Date();
        date2.setDate(25);
        date2.setMonth(11);

        const date3 = new Date();
        date3.setDate(26);
        date3.setMonth(11);

        const dateArray = [date1, date2, date3];

        return dateArray;
    }

    getEaster() {
        const date = new Date();
        date.setDate(17);
        date.setMonth(3);
        
        return date;
    }

    getNewYear() {
        const date1 = new Date();
        date1.setDate(1);
        date1.setMonth(0);

        const date2 = new Date();
        date2.setDate(31);
        date2.setMonth(11);

        const dateArray = [date1, date2];

        return dateArray;
    }

    isTodayHoliday(date) {
        const today = new Date();
        let isHoliday = false;

        if (Array.isArray(date)) {
            const todayDates = date.filter(arrDate => (today.getDate() === arrDate.getDate()) && (today.getMonth() === arrDate.getMonth()))
            console.log(todayDates);
            isHoliday = todayDates.length > 0;

        } else {
            isHoliday = (today.getDate() === date.getDate()) && (today.getMonth() === date.getMonth())
        }

        return isHoliday;
    }
}

let instance: DateService;
export function getDateService() { return instance || (instance = new DateService()) }