import {action, observable} from "mobx";
import {darkTheme, lightTheme} from "../configs/PaperTheme";
import {LANGUAGES} from "../models/Languages";
import i13n from "../configs/i13n";
import { Navigation } from "react-native-navigation";
import BottomTabNavigation from "../components/navigation/BottomTabNavigation";

/**
 * Stores basic UI configurations, handles translation and theme
 *
 * TODO: make global toast notification visible
 *
 * @author Dominique Börner
 */
export class UiService {

    // TODO: make this for react native paper provider
    @observable theme = lightTheme;
    @observable language = LANGUAGES.german;
    @observable language_text = i13n;
    @observable medicationCreationVisible = false;
    @observable navigationActivePage = BottomTabNavigation[0].componentId;

    @action
    changeTheme(theme = lightTheme) {
        this.theme = theme;
    }

    @action
    switchTheme() {
        this.theme === lightTheme ? this.theme = darkTheme : this.theme = lightTheme;
    }

    @action
    getTranslation(key) {
        return this.language_text[this.language][key];
    }

    @action 
    openMedicationCreation() {
        this.medicationCreationVisible = true;
    }

    @action 
    hideMedicationCreation() {
        this.medicationCreationVisible = false;
    }
    @action
    init() {
        // TODO: load language from config
    }

    navigateToComponent(componentId) {
        if (componentId !== this.navigationActivePage) {
            this.navigationActivePage = componentId;

            Navigation.setStackRoot("MainStack", {
                component: {
                    name: componentId,
                    options: {
                        topBar: {
                            visible: false
                        },
                        animations: {
                            push: {
                                content: {
                                    alpha: {
                                        from: 0,
                                        to: 1,
                                        duration: 250
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    }
}

let instance: UiService;
export function getUiService() { return instance || (instance = new UiService()) }