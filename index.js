// Screens
import { LogBox } from "react-native";
// Components
import { Navigation } from "react-native-navigation";

import { ProfileScreen } from "@components/profile/ProfileScreen";
import { MedicationScreen } from '@components/medication/MedicationScreen';
import { MedicationCreationScreen } from "@components/medication/MedicationCreationScreen";
import { InformationScreen } from "@components/information/InformationScreen";
import { InformationArticleScreen } from "@components/information/InformationArticleScreen";
import { RecipeBookScreen } from '@components/recipebook/RecipeBookScreen';
import { RecipeInstructionScreen } from '@components/recipebook/RecipeInstructionScreen';
import { VitaldataScreen } from "@components/vitaldata/VitaldataScreen";
// Services
import { getDateService } from "./service/DateService";
import { getMedicationService } from "./service/MedicationService";
import { getUiService } from "./service/UiService";

// register screens to Navigation, first component is rendered first
Navigation.registerComponent('MedicationScreen', () => MedicationScreen);
Navigation.registerComponent('RecipeBookScreen', () => RecipeBookScreen);
Navigation.registerComponent('InformationScreen', () => InformationScreen);
Navigation.registerComponent('ProfilScreen', () => ProfileScreen);
Navigation.registerComponent('MedicationCreationScreen', () => MedicationCreationScreen);
Navigation.registerComponent('VitaldataScreen', () => VitaldataScreen);
Navigation.registerComponent('RecipeInstructionScreen', () => RecipeInstructionScreen);
Navigation.registerComponent('InformationArticleScreen', () => InformationArticleScreen);


LogBox.ignoreAllLogs()

// initialize services
getDateService().init();
getUiService().init();
getMedicationService().init();

// DateServiceService.getInstance().createNewStorageIfNotExists();
// MedicationService.getInstance().createNewStorageIfNotExists();

// fetch(API_BASE_URL`?query=*[_type%20=="post"]`)
//            .then(response => response.json())
//            .then(data => console.log(data))

// set navigation structure
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                id: "MainStack",
                children: [
                    {
                        component: {
                            name: 'MedicationScreen',
                            options: {
                                topBar: {
                                    visible: false
                                }
                            }
                        },
                    },
                ]
            }
        },
    });
});