import {Navigation} from "react-native-navigation";
import bottomTabsNavigation from "@components/navigation/BottomTabNavigation";
import {HomeScreen} from "@components/screens/HomeScreen";
import {VirtualCookbook} from "@components/screens/VirtualCookbook";
import {InformationScreen} from "./components/screens/InformationScreen";
import {ProfileScreen} from "./components/screens/ProfileScreen";
import React from "react";
import {AddMedicationScreen} from "./components/screens/AddMedicationScreen";
import DateStorageService from "./service/DateStorageService";
import {DateTimeConverterService} from "./service/DateTimeConverterService";
import {getDateStorage} from "./stores/DateStorage";
import {getMedicationStore} from "./stores/MedicationStore";
import MedicationService from "./service/MedicationService";
import {VitaldataScreen} from "./components/screens/VitaldataScreen";

Navigation.registerComponent('HomeScreen', () => HomeScreen);
Navigation.registerComponent('CookbookScreen', () => VirtualCookbook);
Navigation.registerComponent('InformationScreen', () => InformationScreen);
Navigation.registerComponent('ProfilScreen', () => ProfileScreen);
Navigation.registerComponent('AddMedicationScreen', () => AddMedicationScreen);
Navigation.registerComponent('VitaldataScreen', () => VitaldataScreen);

DateStorageService.getInstance().createNewStorageIfNotExists();
MedicationService.getInstance().createNewStorageIfNotExists();

console.log(`DEBUG: initial set selectedDate to ${getDateStorage().selectedDate}`);

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