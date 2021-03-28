import BottomNavigation from '@navigation/BottomNavigation';
import { getUiService } from "@service/UiService";
import React, { Component } from 'react';
import { LightTheme } from '@res/colors';
import { ScrollView, StyleSheet, View } from "react-native";
import { Navigation } from 'react-native-navigation';
import AppContainer from "../common/AppContainer";
import Button from '@components/common/Button';
import Text from '@components/common/Text';
import { aspectRatio_1_1, border, borderRadius, flex, fontSize, fontStyle, margin, opacity, padding, textAlign } from "../../configs/styles";
import { observer } from "mobx-react";
import MealDocument from "../../documents/MealDocument";
import MedicationDocument from "../../documents/MedicationDocument";
import VitaldataDocument from "../../documents/VitaldataDocument";
import { getMedicationService } from '../../service/MedicationService';
import { getVitaldataService } from '../../service/VitaldataService';
import { getMealService } from '../../service/MealService';

/**
 * Renders the SettingsScreen
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export class SettingsScreen extends Component {

    state = {
        showDataDeleteHint: false
    }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
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
            <Text title>Allgemein</Text>
            <Text heading>Kreoneinnahme am ende des Tages abfragen?</Text>
        </View>
    }

    renderNotificationSection() {
        return <View>
            <Text title>Benachrichtigungen</Text>
        </View>
    }

    renderLayoutSection() {
        return <View>
            <Text title>Design</Text>
            <Text heading>Farbschema</Text>
            <View>
                <Button primary={(LightTheme.prototype.isPrototypeOf(getUiService().theme)) ? true : false}
                    secondary={(LightTheme.prototype.isPrototypeOf(getUiService().theme)) ? false : true}>Helles Design</Button>
                <Button primary={(LightTheme.prototype.isPrototypeOf(getUiService().theme)) ? false : true}
                    secondary={(LightTheme.prototype.isPrototypeOf(getUiService().theme)) ? true : false}>Dunkles Design</Button>
            </View>
            <Text heading>Sprache</Text>
            <View>
                <Button primary={(LightTheme.prototype.isPrototypeOf(getUiService().theme)) ? true : false}
                    secondary={(LightTheme.prototype.isPrototypeOf(getUiService().theme)) ? false : true}>Deutsch</Button>
                <Button primary={(LightTheme.prototype.isPrototypeOf(getUiService().theme)) ? false : true}
                    secondary={(LightTheme.prototype.isPrototypeOf(getUiService().theme)) ? true : false}>English</Button>
            </View>
        </View>
    }

    renderDataSection() {
        return <View>
            <Text title>Daten</Text>
            <Text>Alle Daten werden für maximalen Datenschutz nur auf Ihrem Smartphone gespeichert.</Text>
            <Text heading>Verwaltung</Text>
            <Button primary>Daten exportieren</Button>
            <Text heading>Daten löschen</Text>
            <Button primary danger onPress={() => this.deleteAllData()}>{(this.state.showDataDeleteHint === false) ? "Alle Daten löschen" : "Löschen bestätigen"}</Button>
            {(this.state.showDataDeleteHint) && this.showDataDeleteHint()}
        </View>
    }

    showDataDeleteHint() {
        return <View>
            <Text heading danger>Achtung! Hierbei werden alle Daten (Gespeicherte Mahlzeiten, Medikamente und Vitaldaten) gelöscht!</Text>
            <View style={flex.flexRow}>
                <View style={[flex.flex_1, dangerInfoStyle]}>
                    <Text danger style={[textAlign.textCenter, fontSize.xl]}>{getMedicationService().medicationSchedule.length}</Text>
                    <Text danger style={[textAlign.textCenter, fontSize.sm, fontStyle.bold]}>Erfasste Medikationen</Text>
                </View>
                <View style={[flex.flex_1, dangerInfoStyle]}>
                    <Text danger style={[textAlign.textCenter, fontSize.xl]}>{getVitaldataService().vitaldata.length}</Text>
                    <Text danger style={[textAlign.textCenter, fontSize.sm, fontStyle.bold]}>Erfasste Vitaldaten</Text>
                </View>
                <View style={[flex.flex_1, dangerInfoStyle]}>
                    <Text danger style={[textAlign.textCenter, fontSize.xl]}>{getMealService().favMeals.length}</Text>
                    <Text danger style={[textAlign.textCenter, fontSize.sm, fontStyle.bold]}>Gespeicherte Mahlzeiten</Text>
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