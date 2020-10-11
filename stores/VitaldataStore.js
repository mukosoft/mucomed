import {observable} from "mobx";

let instance;

export class VitaldataStore {

    constructor() {
    }

    @observable vitaldataObj = {};

}

export function getVitaldataStore() { return instance || (instance = new VitaldataStore()) }