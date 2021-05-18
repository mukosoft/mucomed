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

import { CreditsScreen } from "./components/credits/CreditsScreen";
import { InformationArticleScreen } from "./components/information/InformationArticleScreen";
import { SelfhelpScreen } from "./components/information/SelfhelpScreen";
import IntroductionScreen from "./components/introduction/IntroductionScreen";
import { MedicationPlanScreen } from "./components/medication/MedicationPlanScreen";
import { MedicationStockScreen } from "./components/medication/MedicationStockScreen";
import { DiseaseProgressionScreen } from "./components/progression/DiseaseProgressionScreen";
import { ReportsScreen } from "./components/reports/ReportsScreen";
import { SettingsScreen } from "./components/settings/SettingsScreen";
// Services
import { getDateService } from "./service/DateService";
import { getMealService } from "./service/MealService";
import { getMedicationService } from "./service/MedicationService";
import { getSettingsService } from "./service/SettingsService";
import { getUiService } from "./service/UiService";
import { getVitaldataService } from "./service/VitaldataService";

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
Navigation.registerComponent('InformationArticleScreen', () => InformationArticleScreen);
Navigation.registerComponent('SettingsScreen', () => SettingsScreen);
Navigation.registerComponent('CreditsScreen', () => CreditsScreen);
Navigation.registerComponent('SelfhelpScreen', () => SelfhelpScreen);
Navigation.registerComponent('IntroductionScreen', () => IntroductionScreen);

LogBox.ignoreAllLogs();


async function loadSettings() {
    const settingsPromise = await getSettingsService().init();
    const datePromise = await getDateService().init();
    const mealPromise = await getMealService().init();
    const medicationPromise = await getMedicationService().init();
    const vitaldataPromise = await getVitaldataService().init();
    const uiPromise = await getUiService().init();

    await Promise.all([settingsPromise, uiPromise, datePromise, mealPromise, medicationPromise, vitaldataPromise]);
}



loadSettings().then(Navigation.events().registerAppLaunchedListener(() => {
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
    })
);

