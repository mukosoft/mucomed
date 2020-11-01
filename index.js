
// Components
import { Navigation } from "react-native-navigation";

// Services
import { getDateService } from "./service/DateService";
import { getUiService } from "./service/UiService";

// Screens
import { HomeScreen } from "@components/screens/HomeScreen";
import { VirtualCookbook } from "@components/screens/VirtualCookbook";
import { InformationScreen } from "./components/screens/InformationScreen";
import { ProfileScreen } from "./components/screens/ProfileScreen";
import { AddMedicationScreen } from "./components/screens/AddMedicationScreen";
import { VitaldataScreen } from "./components/screens/VitaldataScreen";
import { MealInstructionScreen } from "./components/screens/MealInstructionScreen";
import { InformationPostScreen } from "./components/screens/InformationPostScreen";
import { getMedicationService } from "./service/MedicationService";

// register screens to Navigation, first component is rendered first
Navigation.registerComponent('HomeScreen', () => HomeScreen);
Navigation.registerComponent('CookbookScreen', () => VirtualCookbook);
Navigation.registerComponent('InformationScreen', () => InformationScreen);
Navigation.registerComponent('ProfilScreen', () => ProfileScreen);
Navigation.registerComponent('AddMedicationScreen', () => AddMedicationScreen);
Navigation.registerComponent('VitaldataScreen', () => VitaldataScreen);
Navigation.registerComponent('MealInstructionScreen', () => MealInstructionScreen);
Navigation.registerComponent('InformationPostScreen', () => InformationPostScreen);


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
                            name: 'HomeScreen',
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