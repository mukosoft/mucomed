import { action, observable } from "mobx";
import { CALENDAR_DEFAULT_DATE_AMOUNT } from "../configs/config";
import SettingsDocument from "../documents/SettingsDocument";
import { LANGUAGES } from "../models/Languages";
import { getUiService } from "./UiService";

/**
 * Service for managing user settings.
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export class SettingsService {
    @observable calendarDateAmount = CALENDAR_DEFAULT_DATE_AMOUNT;
    @observable settings = [
        { id: "language", value: LANGUAGES.german }
    ];

    init() {
        // SettingsDocument.getInstance().delete();
        SettingsDocument.getInstance().get().then(data => {
            console.debug(`Load SettingsDocument with data: ${JSON.stringify(data)}`)
            if (data.length < 1) {
                console.debug("Populate SettingsDocument with initial settings.");
                this._addInitialSettings();
            }

            this.settings = data;       
        });
    }

    @action
    getCreon() {
        return creon = getSettingsService().settings
            .filter(settings => settings.id === "creonIntake")
            .map(creonSetting => creonSetting.value)[0]
    }

    @action
    changeCreon(amount) {
        SettingsDocument.getInstance().update({ id: "creonIntake" }, { id: "creonIntake", value: amount }).then(() => {
            this.loadSettings();
        })
    }

    @action
    getCurrentLanguage() {
        return language = getSettingsService().settings
            .filter(settings => settings.id === "language")
            .map(languageSetting => languageSetting.value)[0];
    }

    @action
    changeLanguage(language) {
        SettingsDocument.getInstance().update({ id: "language" }, { id: "language", value: language }).then(() => {
            this.loadSettings();
        })
    }

    @action
    getCurrentCalendarDateAmount() {
         return getSettingsService().settings
            .filter(settings => settings.id === "calendarDateAmount")
            .map(amountSetting => amountSetting.value)[0];
    }

    @action
    changeCalendarDateAmount(amount) {
        SettingsDocument.getInstance().update({ id: "calendarDateAmount" }, { id: "calendarDateAmount", value: amount }).then(() => {
            this.loadSettings();
        })
    }

    loadSettings() {
        SettingsDocument.getInstance().get().then(settings => this.settings = settings);
    }

    _addInitialSettings() {
        SettingsDocument.getInstance().add({ id: "calendarDateAmount", value: CALENDAR_DEFAULT_DATE_AMOUNT });
        SettingsDocument.getInstance().add({ id: "language", value: LANGUAGES.english });
        SettingsDocument.getInstance().add({ id: "creonIntake", value: 4000 });
    }

    /**
     * Check, if an value exists in SettingsDocument. 
     * If not, adds this setting to SettingsDocument.
     * 
     * @param {String} id 
     * @param {String} value 
     */
    _addAdditionalSetting(id, value) {
        const filter = this.data.filter(setting => {
            setting.id === id
        });

        if (filter.length > 1) {
            SettingsDocument.getInstance().add({ id: key, value: value });
        }
    }
}

let instance;
export function getSettingsService() { return instance || (instance = new SettingsService()) }