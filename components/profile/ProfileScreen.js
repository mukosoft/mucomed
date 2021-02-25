import LineChart from "@components/common/LineChart";
import { defaultStyles } from "@configs/styles";
import BottomNavigation from '@navigation/BottomNavigation';
import { getUiService } from "@service/UiService";
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Navigation } from 'react-native-navigation';
import { Button } from "react-native-paper";
import AppContainer from "../common/AppContainer";
import FavoriteMeals from "../recipebook/FavoriteMeals";
import Title from '../common/Title';

/**
 * Renders the user profile.
 *
 * @author Dominique Börner
 */
export class ProfileScreen extends Component {

    state = {
        fev_chartType: 'history',
        bmi_chartType: 'history',
        meal: null
    };

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
        // if (!this.state.meal) {
        // this.getRandomMeal();
        // return (<ActivityIndicator animating={true} color={getUiService().theme.primary} size="large" />)
        // } else {
        return (
            <AppContainer>
                <View style={defaultStyles.defaultContentContainer}>
                    <ScrollView>
                        <Title>Deine Lieblingsspeißen</Title>
                        <FavoriteMeals />
                        <Title>{getUiService().getTranslation('medication')}</Title>
                        <View>
                            <Button mode="contained" style={styles.medikamenteBtn} onPress={() => getUiService().showModal('MedicationCreationScreen')}>Medikament hinzufügen</Button>
                            <Button mode="contained" style={styles.medikamenteBtn}>Medikamentenplan</Button>
                            <Button mode="contained" style={styles.medikamenteBtn}>Medikamentenvorrat</Button>
                        </View>
                        <Title>Lungenfunktion - FEV1</Title>
                        <LineChart chartType={this.state.fev_chartType} />
                        <Title>Berichte</Title>
                        <Button mode="contained" style={styles.medikamenteBtn}>Zu den Berichten</Button>
                    </ScrollView>
                </View>
                <BottomNavigation />
            </AppContainer>
        )
        // }
    }

    navigationButtonPressed(button) {
        if (button.buttonId === 'openSettings') {
            // TODO: switch to SettingsScreen
            alert("open_settings_screen")
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 10
    },
    randomRecipeContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    mealImg: {
        flex: 1,
        width: 150, aspectRatio: 1,
        borderRadius: 8
    },
    mealTextContainer: {
        flex: 1,
        marginLeft: 10,
    },
    medikamenteBtn: {
        margin: 5,
        backgroundColor: getUiService().theme.primary
    },

})