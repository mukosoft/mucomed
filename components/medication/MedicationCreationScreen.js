import LineChart from "@components/common/LineChart";
import { defaultStyles } from "@configs/styles";
import BottomNavigation from '@navigation/BottomNavigation';
import { getUiService } from "@service/UiService";
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, View, TouchableWithoutFeedback } from "react-native";
import { Button, Checkbox } from "react-native-paper";
import AppContainer from "../common/AppContainer";
import Title from '../common/Title';
import Medication, { MEDICATION_FORM } from "../../models/Medication";
import TextInput from "../common/Textinput";
import NumericInput from "react-native-numeric-input";
import DatePicker from "@react-native-community/datetimepicker";

/**
 * Renders the screen for creation a medication.
 *
 * @author Dominique Börner
 */
export class MedicationCreationScreen extends Component {

    state = {
        name: "",
        dosage: "",
        description: "",
        form: MEDICATION_FORM[0].form,
        daily: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true,
        amount: 0,
        showTimePicker: false,
        times: []
    };

    constructor(props) {
        super(props);
    }

    render() {
        console.debug(this.state)
        return (
            <AppContainer>
                <ScrollView style={defaultStyles.defaultContentContainer}>
                    <Title>Medikament hinzufügen</Title>
                    <Text style={styles.heading}>Name:</Text>
                    <TextInput onChangeText={(value) => this.setState({ name: value })} />
                    <Text style={styles.heading}>Dosierung:</Text>
                    <TextInput onChangeText={(value) => this.setState({ dosage: value })} />
                    <View style={styles.flexRow}>
                        <View>
                            <Text style={styles.heading}>Anzahl:</Text>
                            <NumericInput onChange={(value) => this.setState({ amount: value })} />
                        </View>
                        <View style={styles.flexRow}>
                            <Text style={styles.heading}>Tägliche Einnahme?</Text>
                            <Switch style={styles.switch} value={this.state.daily} onValueChange={() => { this.setDaily() }} />
                        </View>
                    </View>

                    <Text style={styles.heading}>Form der Medikation:</Text>
                    <View style={styles.medicationForms}>
                        {MEDICATION_FORM.map((form) => {
                            return (<TouchableWithoutFeedback onPress={() => this.setState({ form: form.form })}>
                                <View style={[styles.medicationFormContainer, defaultStyles.defaultShadow, (this.state.form === form.form) ? styles.activeForm : null]}>
                                    <Image source={form.icon} style={styles.formIcon} /><Text style={styles.medicationFormText}>{getUiService().getTranslation(form.form)}</Text>
                                </View>
                            </TouchableWithoutFeedback>)
                        })}
                    </View>

                    <Text style={styles.heading}>Beschreibung:</Text>
                    <TextInput onChangeText={(value) => this.setState({ description: value })} multiline={true} />
                    {(!this.state.daily) ? this.renderDayList() : <></>}

                    <Text style={styles.heading}>Zeiten wählen:</Text>
                    {this.state.showTimePicker && <DatePicker mode="time" format="hh:mm" value={new Date()} onChange={(event, time) => this.addTime(time)} />}
                    <Button mode="text" color={getUiService().theme.primary} style={styles.addTimeBtn} onPress={() => this.setState({ showTimePicker: true })}>Zeit hinzufügen</Button>
                    {this.state.times.map((time) => {
                        return <View style={styles.singleTimeContainer}>
                            <Text style={styles.singleTimeText}>{`${time?.getHours()}:${(time?.getMinutes()<10?'0':'') + time?.getMinutes()}`} Uhr</Text>
                            <Button mode="text" color={getUiService().theme.primary} onPress={() => this.removeTime(time)}>Entfernen</Button>
                        </View>
                    }
                    )}
                </ScrollView>
                    <Button mode="contained" style={styles.saveBtn}>Speichern</Button>
            </AppContainer>
        )
    }

    saveMedication() {
        const medication = new Medication();
        medication.name = this.state.name;
        medication.dosage = this.state.dosage;
        medication.description = this.state.description;
        medication.times = this.state.times;
        medication.form = this.state.form;

        // TODO: Save to store
    }

    addTime(time: Date) {
        if (time) {
            const newTimes = this.state.times;
            newTimes.push(time);
    
            this.setState({ times: newTimes });
            this.setState({ showTimePicker: false });
        }
    }

    removeTime(time: String) {

        const index = this.state.times.indexOf(time);
        const newTimes = this.state.times;

        if (index > -1) {
            newTimes.splice(index, 1);
        }

        this.setState({ times: newTimes });
    }

    navigationButtonPressed(button) {
        if (button.buttonId === 'openSettings') {
            // TODO: switch to SettingsScreen
            alert("open_settings_screen")
        }
    }

    setDaily() {
        this.setState({ daily: !this.state.daily });
        this.setState({ monday: true });
        this.setState({ tuesday: true });
        this.setState({ wednesday: true });
        this.setState({ thursday: true });
        this.setState({ friday: true });
        this.setState({ saturday: true });
        this.setState({ sunday: true });
    }

    renderDayList() {
        return (<><Text style={styles.heading}>Tage wählen:</Text>
            <View style={styles.dayList}>
                <View style={styles.dayContainer}>
                    <Text>Montag</Text>
                    <Checkbox status={(this.state.monday) ? 'checked' : 'unchecked'}
                        onPress={() => this.setState({ monday: !this.state.monday })} color={getUiService().theme.primary} />
                </View>
                <View style={styles.dayContainer}>
                    <Text>Dienstag</Text>
                    <Checkbox status={(this.state.tuesday) ? 'checked' : 'unchecked'}
                        onPress={() => this.setState({ tuesday: !this.state.tuesday })} color={getUiService().theme.primary} />
                </View>
                <View style={styles.dayContainer}>
                    <Text>Mittwoch</Text>
                    <Checkbox status={(this.state.wednesday) ? 'checked' : 'unchecked'}
                        onPress={() => this.setState({ wednesday: !this.state.wednesday })} color={getUiService().theme.primary} />
                </View>
                <View style={styles.dayContainer}>
                    <Text>Donnerstag</Text>
                    <Checkbox status={(this.state.thursday) ? 'checked' : 'unchecked'}
                        onPress={() => this.setState({ thursday: !this.state.thursday })} color={getUiService().theme.primary} />
                </View>
                <View style={styles.dayContainer}>
                    <Text>Freitag</Text>
                    <Checkbox status={(this.state.friday) ? 'checked' : 'unchecked'}
                        onPress={() => this.setState({ friday: !this.state.friday })} color={getUiService().theme.primary} />
                </View>
                <View style={styles.dayContainer}>
                    <Text>Samstag</Text>
                    <Checkbox status={(this.state.saturday) ? 'checked' : 'unchecked'}
                        onPress={() => this.setState({ saturday: !this.state.saturday })} color={getUiService().theme.primary} />
                </View>
                <View style={styles.dayContainer}>
                    <Text>Sonntag</Text>
                    <Checkbox status={(this.state.sunday) ? 'checked' : 'unchecked'}
                        onPress={() => this.setState({ sunday: !this.state.sunday })} color={getUiService().theme.primary} />
                </View>
            </View></>)
    }
}

const styles = StyleSheet.create({
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    heading: {
        paddingBottom: 5, paddingTop: 5,
        fontSize: 16
    },
    saveBtn: {
        backgroundColor: getUiService().theme.primary,
        padding: 10
    },
    medicationForms: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    medicationFormContainer: {
        display: 'flex',
        margin: 2,
        justifyContent: 'center',
        alignContent: 'center',
        width: 80, aspectRatio: 1,
        backgroundColor: getUiService().theme.background,
        borderRadius: 5
    },
    activeForm: {
        backgroundColor: getUiService().theme.secondary
    },
    formIcon: {
        flex: 2,
        width: 40, height: 40,
        alignSelf: 'center',
        margin: 5,
        resizeMode: 'contain'
    },
    medicationFormText: {
        flex: 1,
        color: getUiService().theme.primary,
        textAlign: 'center',
    },
    dayList: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    dayContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        width: 100
    },
    singleTimeContainer: {
        backgroundColor: getUiService().theme.secondary,
        margin: 4
    },
    singleTimeText: {
        fontSize: 24,
        textAlign: 'center',
        padding: 10,
    }
})