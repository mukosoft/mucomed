import {Navigation} from "react-native-navigation";
import bottomTabsNavigation from "@components/navigation/BottomTabNavigation";
import {HomeScreen} from "@components/screens/HomeScreen";
import {VirtualCookbook} from "@components/screens/VirtualCookbook";
import {InformationScreen} from "./components/screens/InformationScreen";
import {ProfileScreen} from "./components/screens/ProfileScreen";
import React from "react";
import {AddMedicationScreen} from "./components/screens/AddMedicationScreen";
import {getDateStorage} from "./stores/DateStorage";
import {VitaldataScreen} from "./components/screens/VitaldataScreen";
import {MealInstructionScreen} from "./components/screens/MealInstructionScreen";
import InformationPostScreen from "./components/screens/InformationPostScreen";
import {colors} from "./configs/colors";
import { API_BASE_URL } from './configs/config';
import { getUiStore } from "./stores/UiStore";

Navigation.registerComponent('HomeScreen', () => HomeScreen);
Navigation.registerComponent('CookbookScreen', () => VirtualCookbook);
Navigation.registerComponent('InformationScreen', () => InformationScreen);
Navigation.registerComponent('ProfilScreen', () => ProfileScreen);
Navigation.registerComponent('AddMedicationScreen', () => AddMedicationScreen);
Navigation.registerComponent('VitaldataScreen', () => VitaldataScreen);
Navigation.registerComponent('MealInstructionScreen', () => MealInstructionScreen);
Navigation.registerComponent('InformationPostScreen', () => InformationPostScreen);

getDateStorage().init();
getUiStore().init();

// DateStorageService.getInstance().createNewStorageIfNotExists();
// MedicationService.getInstance().createNewStorageIfNotExists();

// fetch(API_BASE_URL`?query=*[_type%20=="post"]`)
//            .then(response => response.json())
//            .then(data => console.log(data))

/**
 * Create a navigation bar
 *
 * @package react-native-navigation
 */
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            bottomTabs: bottomTabsNavigation
        }
    });

    Navigation.setDefaultOptions({
        topBar: {
            title: {Text: 'MucoMed', color: 'black'},
            leftButtons: [{
                icon: require('./ic_launcher_round.png'),
            }],
            elevation: 0
        }
    });
});