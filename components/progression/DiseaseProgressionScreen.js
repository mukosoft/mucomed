import LineChart from "@components/common/LineChart";
import { getUiService } from "@service/UiService";
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Navigation } from 'react-native-navigation';
import AppContainer from "../common/AppContainer";
import Text from '@components/common/Text';
import { alignItems, border, borderRadius, flex, fontStyle, height, justifyContent, margin, padding, textAlign, width } from "../../configs/styles";
import { getVitaldataService } from "../../service/VitaldataService";
import { DateTimeConverterService } from "../../service/DateTimeConverterService";
import Button from '@components/common/Button';
import { observer } from "mobx-react";
import infoIcon from "@assets/icons/information.png";

/**
 * Renders the progression screen.
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export class DiseaseProgressionScreen extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.getAverageTemp();
    }

    render() {
        return (
            <AppContainer>
                <ScrollView showsVerticalScrollIndicator={false} style={padding.padding_3}>
                    <Text title style={textAlign.textCenter}>Mein Verlauf</Text>
                    <View>
                        <Text heading>BMI</Text>
                        { this.renderTile("Der normale BMI liegt zwischen 18,5 und 24,9 kg/m².", "info")}
                        { (getVitaldataService().getBMIData().length > 0) && this.renderTile(`Derzeitiger BMI: ${this.getCurrentBMI()} kg/m²`)}
                        {getVitaldataService().getBMIData().length > 1 ?
                            <>
                                <LineChart chartType="history" data={getVitaldataService().getBMIData()} labels={getVitaldataService().getBMIDate()} />
                            </> : this.renderNotEnoughValues()}
                        <Text heading>FEV1</Text>
                        {(getVitaldataService().getVitaldataByKey("fev1").length > 1) ?
                            <>
                                <LineChart chartType="history"
                                    data={getVitaldataService().getVitaldataByKey("fev1").map((item) => parseFloat(item.value))}
                                    labels={getVitaldataService().getVitaldataByKey("fev1").map((item) => item.date)}
                                    id="fev1"
                                    unit="%"
                                    isDeletable />
                                {(((getVitaldataService().chartSelectedId === "fev1")
                                    && getVitaldataService().chartSelectedDate
                                    && getVitaldataService().chartSelectedValue)) && this.renderDetailView()}
                            </> : this.renderNotEnoughValues()
                        }
                        <Text heading>Temperatur</Text>
                        { (getVitaldataService().getVitaldataByKey("temperature").length > 0) && this.renderTile(`Durschnittliche Temperatur: ${this.getAverageTemp()} °C`)} 
                        {(getVitaldataService().getVitaldataByKey("temperature").length > 1) ?
                            <LineChart chartType="history"
                                data={getVitaldataService().getVitaldataByKey("temperature").map((item) => parseFloat(item.value))}
                                labels={getVitaldataService().getVitaldataByKey("temperature").map((item) => item.date)}
                                id="temperature"
                                unit="%"
                                isDeletable /> : this.renderNotEnoughValues()
                        }

                        {(((getVitaldataService().chartSelectedId === "temperature")
                            && getVitaldataService().chartSelectedDate
                            && getVitaldataService().chartSelectedValue)) && this.renderDetailView()}
                    </View>
                </ScrollView>
            </AppContainer>
        )
    }

    getCurrentBMI() {
        return (getVitaldataService().getBMIData()[getVitaldataService().getBMIData().length - 1]) || "Noch keine Daten";
    }

    getAverageTemp() {
        let averageTemp = 0;

        getVitaldataService().getVitaldataByKey("temperature").map((temp) => {
            averageTemp += parseInt(temp.value);
        });

        averageTemp = averageTemp / getVitaldataService().getVitaldataByKey("temperature").length;

        return averageTemp || "Noch keine Daten";
    }

    renderTile(content, extra = "") {
        let extraStyle;

        if (extra === "info") {
            extraStyle = { 
                backgroundColor: getUiService().theme.background,
                borderWidth: border.borderXL.borderWidth,
                borderColor: getUiService().theme.primary
            };
        }
        
        return <View style={[detailContainer, extraStyle, flex.flexRow]}>
            { (extra === "info") && <Image source={infoIcon} style={infoIconStyle} /> }
            <Text style={[fontStyle.bold, flex.flexWrap, flex.flex_1]}>{content}</Text>
        </View>

    }

    renderDetailView() {
        return <View style={detailContainer}>
            <Text title>{getVitaldataService().chartSelectedId.toUpperCase()}</Text>
            <View style={detailContentContainer}>
                <Text>Am {DateTimeConverterService.formatDate(getVitaldataService().chartSelectedDate)} hattest du
                einen Wert von {getVitaldataService().chartSelectedValue} {getVitaldataService().chartSelectedUnit}.</Text>
            </View>
            <Button primary onPress={() => this.deleteVitaldata()}>Wert löschen</Button>
        </View>
    }

    renderNotEnoughValues() {
        return <View>
            <Text>Noch nicht genügend Werte eingetragen, um den Verlauf in einem Liniendiagramm darzustellen.</Text>
        </View>
    }

    deleteVitaldata() {
        let obj = {
            id: getVitaldataService().chartSelectedId,
            date: getVitaldataService().chartSelectedDate
        };

        getVitaldataService().deleteVitaldata(obj);

        getVitaldataService().chartSelectedValue = null;
        getVitaldataService().chartSelectedDate = null;
        getVitaldataService().chartSelectedId = null;
        getVitaldataService().chartSelectedUnit = null;
    }
}

const infoIconStyle = StyleSheet.flatten([
    width.width_25,
    height.height_25,
    margin.margin_x_4
])

const detailContainer = StyleSheet.flatten([
    flex.flexCol,
    padding.padding_3,
    margin.margin_y_3,
    borderRadius.roundedMD,
    justifyContent.justifyCenter,
    alignItems.itemsCenter,
    { backgroundColor: getUiService().theme.secondary }
])

const detailContentContainer = StyleSheet.flatten([
    flex.flexCol
])