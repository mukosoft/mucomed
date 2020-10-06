import {action, observable} from "mobx";

export class UiStore {

    @observable medicationWindowVisible = false;

    @action
    showMedicationWindow() {
        this.medicationWindowVisible = true;
    }

    @action
    hideMedicationWindw() {
        this.medicationWindowVisible = false;
    }

}

let instance: UiStore;
export function getUiStore() { return instance || (instance = new UiStore()) }