import BottomNavigation from '@navigation/BottomNavigation';
import { getUiService } from "@service/UiService";
import React, { Component } from 'react';
import { LightTheme } from '@res/colors';
import { ScrollView, StyleSheet, View } from "react-native";
import { Navigation } from 'react-native-navigation';
import AppContainer from "../common/AppContainer";
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import { border, borderRadius, flex, fontSize, fontStyle, margin, padding, textAlign } from "../../configs/styles";
import { observer } from "mobx-react";
import MealDocument from "../../documents/MealDocument";
import MedicationDocument from "../../documents/MedicationDocument";
import VitaldataDocument from "../../documents/VitaldataDocument";
import { getMedicationService } from '../../service/MedicationService';
import { getVitaldataService } from '../../service/VitaldataService';
import { getMealService } from '../../service/MealService';
import { getSettingsService } from '../../service/SettingsService';
import { LANGUAGES } from '../../models/Languages';

/**
 * Renders the SettingsScreen
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export class SettingsScreen extends Component {

    settings = [];

    state = {
        showDataDeleteHint: false
    }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
        // important, so that this screen rerenders after every change
        this.settings = getSettingsService().settings;

        return (
            <AppContainer>
                <ScrollView showsVerticalScrollIndicator={false} style={padding.padding_3}>
                    {this.renderGeneralSection()}
                    {this.renderNotificationSection()}
                    {this.renderLayoutSection()}
                    {this.renderDataSection()}
                </ScrollView>
                <BottomNavigation />
            </AppContainer>
        )
    }

    renderGeneralSection() {
        return <View>
            <Text title>{getUiService().getTranslation("settings_general")}</Text>
            <Text heading>{getUiService().getTranslation("settings_creon_notification")}</Text>
        </View>
    }

    renderNotificationSection() {
        return <View>
            <Text title>{getUiService().getTranslation("settings_notification")}</Text>
        </View>
    }

    renderLayoutSection() {
        return <View>
            <Text title>{getUiService().getTranslation("settings_design")}</Text>
            <Text heading>{getUiService().getTranslation("settings_color")}</Text>
            <View>
                <Button primary={(LightTheme.prototype.isPrototypeOf(getUiService().theme)) ? true : false}
                    secondary={(LightTheme.prototype.isPrototypeOf(getUiService().theme)) ? false : true}>{getUiService().getTranslation("settings_color_light")}</Button>
                <Button primary={(LightTheme.prototype.isPrototypeOf(getUiService().theme)) ? false : true}
                    secondary={(LightTheme.prototype.isPrototypeOf(getUiService().theme)) ? true : false}>{getUiService().getTranslation("settings_color_dark")}</Button>
            </View>
            <Text heading>Sprache</Text>
            <View>
                <Button primary={(getSettingsService().getCurrentLanguage() === LANGUAGES.german) ? true : false}
                    secondary={(getSettingsService().getCurrentLanguage() === LANGUAGES.german) ? false : true}
                    onPress={() => getSettingsService().changeLanguage(LANGUAGES.german)}>{getUiService().getTranslation("settings_language_german")}</Button>
                <Button primary={(getSettingsService().getCurrentLanguage() === LANGUAGES.english) ? true : true}
                    secondary={(getSettingsService().getCurrentLanguage() === LANGUAGES.english) ? false : true}
                    onPress={() => getSettingsService().changeLanguage(LANGUAGES.english)}>{getUiService().getTranslation("settings_language_english")}</Button>
            </View>
        </View>
    }

    renderDataSection() {
        return <View>
            <Text title>{getUiService().getTranslation("settings_data")}</Text>
            <Text>{getUiService().getTranslation("settings_data_description")}</Text>
            <Text heading>{getUiService().getTranslation("settings_data_management")}</Text>
            <Button primary>{getUiService().getTranslation("settings_data_export")}</Button>
            <Text heading>{getUiService().getTranslation("settings_data_delete")}</Text>
            <Button primary danger onPress={() => this.deleteAllData()}>{(this.state.showDataDeleteHint === false) ? getUiService().getTranslation("settings_data_delete_all") : getUiService().getTranslation("settings_data_delete_confirm")}</Button>
            {(this.state.showDataDeleteHint) && this.showDataDeleteHint()}
        </View>
    }

    showDataDeleteHint() {
        return <View>
            <Text heading danger>Achtung! Hierbei werden alle Daten (Gespeicherte Mahlzeiten, Medikamente und Vitaldaten) gelöscht!</Text>
            <View style={flex.flexRow}>
                <View style={[flex.flex_1, dangerInfoStyle]}>
                    <Text danger style={[textAlign.textCenter, fontSize.xl]}>{getMedicationService().medicationSchedule.length}</Text>
                    <Text danger style={[textAlign.textCenter, fontSize.sm, fontStyle.bold]}>{getUiService().getTranslation("settings_data_collected_medication")}</Text>
                </View>
                <View style={[flex.flex_1, dangerInfoStyle]}>
                    <Text danger style={[textAlign.textCenter, fontSize.xl]}>{getVitaldataService().vitaldata.length}</Text>
                    <Text danger style={[textAlign.textCenter, fontSize.sm, fontStyle.bold]}>{getUiService().getTranslation("settings_data_collected_vitaldata")}</Text>
                </View>
                <View style={[flex.flex_1, dangerInfoStyle]}>
                    <Text danger style={[textAlign.textCenter, fontSize.xl]}>{getMealService().favMeals.length}</Text>
                    <Text danger style={[textAlign.textCenter, fontSize.sm, fontStyle.bold]}>{getUiService().getTranslation("settings_data_collected_meals")}</Text>
                </View>
            </View>
        </View>
    }

    deleteAllData() {
        if (this.state.showDataDeleteHint) {
            MedicationDocument.getInstance().delete();
            VitaldataDocument.getInstance().delete();
            MealDocument.getInstance().delete();

            getMedicationService().medicationSchedule = [];
            getVitaldataService.vitaldata = [];
            getMealService().favMeals = [];

            this.setState({ showDataDeleteHint: false })
        } else {
            this.setState({ showDataDeleteHint: true })
        }
    }
}

const dangerInfoStyle = StyleSheet.flatten([
    { backgroundColor: getUiService().theme.dangerLight },
    margin.margin_3,
    padding.padding_3,
    borderRadius.roundedMD,
    border.borderXL,
    fontStyle.bold,
    fontSize.sm,
    { borderColor: getUiService().theme.danger }
])