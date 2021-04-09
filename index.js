import { InformationScreen } from "@components/information/InformationScreen";
import { MedicationCreationScreen } from "@components/medication/MedicationCreationScreen";
import { MedicationScreen } from '@components/medication/MedicationScreen';
import { ProfileScreen } from "@components/profile/ProfileScreen";
import { RecipeBookScreen } from '@components/recipebook/RecipeBookScreen';
import { RecipeInstructionScreen } from '@components/recipebook/RecipeInstructionScreen';
import { VitaldataScreen } from "@components/vitaldata/VitaldataScreen";
// Screens
import { LogBox } from "react-native";
// Components
import { Navigation } from "react-native-navigation";
import { MedicationPlanScreen } from "./components/medication/MedicationPlanScreen";
import { MedicationStockScreen } from "./components/medication/MedicationStockScreen";
import { DiseaseProgressionScreen } from "./components/progression/DiseaseProgressionScreen";
import { ReportsScreen } from "./components/reports/ReportsScreen";
import { SettingsScreen } from "./components/settings/SettingsScreen";

// Services
import { getDateService } from "./service/DateService";
import { getMealService } from "./service/MealService";
import { getMedicationService } from "./service/MedicationService";
import { getUiService } from "./service/UiService";
import { getVitaldataService } from "./service/VitaldataService";
import { getSettingsService } from "./service/SettingsService";
import { CreditsScreen } from "./components/credits/CreditsScreen";
import { selfhelpScreen } from "./components/selfhelp/SelfhelpScreen";

// register screens to Navigation
Navigation.registerComponent('ProfilScreen', () => ProfileScreen);
Navigation.registerComponent('MedicationScreen', () => MedicationScreen);
Navigation.registerComponent('RecipeBookScreen', () => RecipeBookScreen);
Navigation.registerComponent('InformationScreen', () => InformationScreen);
Navigation.registerComponent('ReportsScreen', () => ReportsScreen);
Navigation.registerComponent('DiseaseProgressionScreen', () => DiseaseProgressionScreen);
Navigation.registerComponent('MedicationCreationScreen', () => MedicationCreationScreen);
Navigation.registerComponent('MedicationPlanScreen', () => MedicationPlanScreen);
Navigation.registerComponent('MedicationStockScreen', () => MedicationStockScreen);
Navigation.registerComponent('VitaldataScreen', () => VitaldataScreen);
Navigation.registerComponent('RecipeInstructionScreen', () => RecipeInstructionScreen);
Navigation.registerComponent('InformationScreen', () => InformationScreen);
Navigation.registerComponent('SettingsScreen', () => SettingsScreen);
Navigation.registerComponent('CreditsScreen', () => CreditsScreen);
Navigation.registerComponent('selfhelpScreen', () => selfhelpScreen);


LogBox.ignoreAllLogs()

// initialize services
getSettingsService().init();
getDateService().init();
getMedicationService().init();
getMealService().init();
getVitaldataService().init();
getUiService().init();

// set navigation structure
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                id: "MainStack",
                children: [
                    {
                        component: {
                            name: 'ProfilScreen',
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