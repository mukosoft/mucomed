import React, { Component } from 'react';
import { observer } from "mobx-react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Navigation } from 'react-native-navigation';
import AppContainer from '@components/common/AppContainer';
import { alignItems, borderRadius, flex, justifyContent, margin, padding, textAlign } from '../../configs/styles';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import { getUiService } from '../../service/UiService';
import { Vitaldata, VITALDATA_MODEL } from '../../models/VitaldataModel';
import VitaldataItem from './VitaldataItem';
import DatePicker from "@react-native-community/datetimepicker";
import { getDateService } from '../../service/DateService';
import { DateTimeConverterService } from '../../service/DateTimeConverterService';
import { getVitaldataService } from '../../service/VitaldataService';


/**
 * Renders the screen, containing informations about vitaldata
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export class VitaldataScreen extends Component {

    state = {
        vitaldata: [],
        showDatePicker: false,
        showTimePicker: false,
        time: new Date(),
        date: new Date()
    };

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
        return (
            <AppContainer>
                <ScrollView>
                    <View style={vitaldataListContainer}>
                        <Text title style={titleStyle}>Vitaldaten erfassen</Text>
                        <View>
                            <View style={dateTimeContainer}>
                                {this.state.date
                                    ? <Text heading style={textAlign.textCenter}>{DateTimeConverterService.formatDate(this.state.date)}</Text>
                                    : <Text heading style={textAlign.textCenter}>Noch kein Datum</Text>}
                                <Button primary onPress={() => this.setState({ showDatePicker: true })}>Datum eingeben</Button>
                                {this.state.showDatePicker && <DatePicker mode="date" value={new Date()} onChange={(event, date) => {
                                    this.setState({ date: date });
                                    this.setState({ showDatePicker: false });
                                }} />}
                            </View>

                            <View style={dateTimeContainer}>
                                {this.state.time
                                    ? <Text heading style={textAlign.textCenter}>{getDateService().removeSecondsFromTime(getDateService().renderTime(this.state.time))} Uhr</Text>
                                    : <Text heading style={textAlign.textCenter}>Noch keine Uhrzeit</Text>}
                                <Button primary onPress={() => this.setState({ showTimePicker: true })}>Zeit eingeben</Button>
                            </View>

                            {this.state.showTimePicker && <DatePicker mode="time" format="hh:mm" value={new Date()} onChange={(event, time) => {
                                this.setState({ time: time });
                                this.setState({ showTimePicker: false })
                            }} />}
                        </View>
                        <View style={padding.padding_3}>
                            <Text heading>Beliebigen Wert erfassen:</Text>
                        </View>
                        <View style={flexRow}>
                            {VITALDATA_MODEL.map((vitaldata) => {
                                return <VitaldataItem vitaldata={vitaldata} onChangeText={(value) => this.setVitaldataState(vitaldata, value)} />
                            })}
                        </View>

                    </View>

                </ScrollView>
                <View style={buttonRow}>
                    <Button secondary onPress={() => getUiService().navigateToComponent("ProfilScreen")}>Zurück</Button>
                    <Button primary onPress={() => this.saveVitaldata()}>Speichern</Button>
                </View>
            </AppContainer>
        )
    }



    setVitaldataState(vitaldata, value) {
        const vitaldataObject = new Vitaldata();
        vitaldataObject.id = vitaldata.id;
        vitaldataObject.unit = vitaldata.unit;
        vitaldataObject.value = value;
        vitaldataObject.date = this.state.date;
        vitaldataObject.time = this.state.time;

        let newVitaldataArray = this.state.vitaldata;

        if (this.state.vitaldata.find(vitaldata => vitaldata.id === vitaldataObject.id)) {
            newVitaldataArray = this.state.vitaldata.filter(vitaldata => {
                return vitaldata.id !== vitaldataObject.id
            })

            newVitaldataArray.push(vitaldataObject);

        } else {
            newVitaldataArray.push(vitaldataObject);
        }


        this.setState({ vitaldata: newVitaldataArray });

    }

    saveVitaldata() {
        this.state.vitaldata.map(vitaldata => {
            getVitaldataService().addVitaldata(vitaldata);
        });
    }
}

const dateTimeContainer = StyleSheet.flatten([
    flex.flexCol,
    padding.padding_3,
    margin.margin_2,
    borderRadius.roundedMD,
    justifyContent.justifyCenter,
    { backgroundColor: getUiService().theme.secondary }
])

const flexRow = StyleSheet.flatten([
    flex.flexRow,
    flex.flexWrap,
    justifyContent.justifyCenter,
    alignItems.itemsCenter,
])

const titleStyle = StyleSheet.flatten([
    textAlign.textCenter
])

const vitaldataListContainer = StyleSheet.flatten([
    flex.flexCol,
    padding.padding_x_3,
    justifyContent.justifyCenter,
])

const buttonRow = StyleSheet.flatten([
    flex.flexRow,
    justifyContent.justifyEvenly,
    padding.padding_3,
    margin.margin_3
])
