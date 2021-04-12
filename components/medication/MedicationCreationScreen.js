import { defaultStyles } from "@configs/styles";
import { getUiService } from "@service/UiService";
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Switch, View, TouchableWithoutFeedback } from "react-native";
import { Checkbox } from "react-native-paper";
import AppContainer from "../common/AppContainer";
import Medication, { MEDICATION_FORM } from "../../models/Medication";
import TextInput from "../common/Textinput";
import DatePicker from "@react-native-community/datetimepicker";
import MedicationRequest from "../../models/MedicationRequest";
import Timing from "../../models/Timing";
import Dosage from "../../models/Dosage";
import { getMedicationService } from "../../service/MedicationService";
import Text from "../common/Text";
import { alignSelf, flex, justifyContent, margin, padding } from "../../configs/styles";
import Button from '@components/common/Button';

/**
 * Renders the screen for creation a medication. The medication is saved
 * in MedicationDocument via MedicationService.
 * 
 * @todo create a mode (create, edit)
 * 
 * @see MedicationService
 * @author Dominique Börner (dominique@mukosoft.de)
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
        showTimePicker: false,
        times: [],
        showError: false,
        isValid: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppContainer>
                <ScrollView style={defaultStyles.defaultContentContainer}>
                    <Text title>Medikament hinzufügen</Text>
                    { (this.state.showError ? <Text error>Bitte überprüfen Sie die Eingaben.</Text> : <></>)}
                    <Text heading>Name:</Text>
                    <TextInput onChangeText={(value) => this.setState({ name: value })} />
                    <Text heading>Dosierung:</Text>
                    <TextInput onChangeText={(value) => this.setState({ dosage: value })} />

                    <Text heading>Form der Medikation:</Text>
                    <View style={styles.medicationForms}>
                        {MEDICATION_FORM.map((form) => {
                            return (<TouchableWithoutFeedback onPress={() => this.setState({ form: form.form })}>
                                <View style={[styles.medicationFormContainer, defaultStyles.defaultShadow, (this.state.form === form.form) ? styles.activeForm : null]}>
                                    <Image source={form.icon} style={styles.formIcon} /><Text heading style={alignSelf.selfCenter}>{getUiService().getTranslation(form.form)}</Text>
                                </View>
                            </TouchableWithoutFeedback>)
                        })}
                    </View>

                    <Text heading>Beschreibung:</Text>
                    <TextInput onChangeText={(value) => this.setState({ description: value })} multiline={true} />

                    <View style={styles.flexRow}>
                        <View style={styles.flexRow}>
                            <Text heading>Tägliche Einnahme?</Text>
                            <Switch style={styles.switch} value={this.state.daily} onValueChange={() => { this.setDaily() }} />
                        </View>
                    </View>
                    {(!this.state.daily) ? this.renderDayList() : <></>}

                    <Text heading>Zeiten wählen:</Text>
                    {this.state.showTimePicker && <DatePicker mode="time" format="hh:mm" value={new Date()} onChange={(event, time) => this.addTime(time)} />}
                    <Button primary onPress={() => this.setState({ showTimePicker: true })}>Zeit hinzufügen</Button>
                    {this.state.times.map((time) => {
                        return <View style={styles.singleTimeContainer}>
                            <Text style={styles.singleTimeText}>{`${time?.getHours()}:${(time?.getMinutes()<10?'0':'') + time?.getMinutes()}`} Uhr</Text>
                            <Button secondary onPress={() => this.removeTime(time)}>Entfernen</Button>
                        </View>
                    }
                    )}
                </ScrollView>
                <View style={buttonRow}>
                    <Button primary animation="pulse" onPress={() => this.saveMedication()}>Speichern</Button>
                </View>
            </AppContainer>
        )
    }

    saveMedication() {
        if (this.isFormValid()) {
            let medication = new Medication();
            medication.name = this.state.name;

            // remove empty space
            if (medication.name.charAt(medication.name.length -1) === " ") {
                medication.name = medication.name.slice(0, -1);
            }

            medication.form = this.state.form;
    
            let timing = new Timing();
    
            let dayOfWeek = [];
            if (this.state.monday) dayOfWeek.push('monday');
            if (this.state.tuesday) dayOfWeek.push('tuesday');
            if (this.state.wednesday) dayOfWeek.push('wednesday');
            if (this.state.thursday) dayOfWeek.push('thursday');
            if (this.state.friday) dayOfWeek.push('friday');
            if (this.state.saturday) dayOfWeek.push('saturday');
            if (this.state.sunday) dayOfWeek.push('sunday');
            timing.repeat.dayOfWeek = dayOfWeek;
    
            let times = [];
            this.state.times.map((time) => {
                let hours = time.getHours();
                let minutes = time.getMinutes();
    
                if ((hours) < 10) { hours = `0${hours}`} 
                if ((minutes) < 10) { minutes = `0${minutes}`} 
    
                times.push(`${hours}:${minutes}:00`)
            })
            timing.repeat.timeOfDay = times;
    
            let dosage = new Dosage();
            dosage.patientInstruction = this.state.description
            dosage.timing = timing;
            dosage.doseAndRate.dose = this.state.dosage;
    
            let medicationrequest = new MedicationRequest();
            medicationrequest.medication = medication;
            medicationrequest.dosageInstruction = dosage;
    
            getMedicationService().addMedicationRequest(medicationrequest);

            getUiService().navigateToComponent("MedicationScreen")
        } else {
            this.setState({ showError: true });
        }
    }

    isFormValid() {
        return (this.state.name !== "" && this.state.times.length > 0);
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

// style definitions

const buttonRow = StyleSheet.flatten([
    flex.flexRow,
    justifyContent.justifyEvenly,
    padding.padding_3,
    margin.margin_3
])

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