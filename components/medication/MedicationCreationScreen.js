import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {Button, Card, Checkbox, Headline, Provider as PaperProvider, Text, TextInput} from "react-native-paper";
import days from "@models/Days";
import {lightTheme} from "@configs/PaperTheme";
import DateTimePicker from 'react-native-modal-datetime-picker';
import {DateTimeConverterService} from "@service/DateTimeConverterService";
import {colors} from "@configs/colors";
import {defaultStyles} from "@configs/styles";


/**
 * Screen for adding a medication
 *
 * @author Dominique Börner
 */
export class MedicationCreationScreen extends Component {

    state = {
        name: "",
        dosage: "",
        times: [],
        days: [],

        timePickerVisible: false
    }

    render() {
        return <View>

        </View>;
        return (
            <PaperProvider theme={lightTheme}>
                <ScrollView style={styles.addMedicationContainer}>
                    <Headline>Medikament hinzufügen</Headline>
                    <TextInput
                        mode="outlined"
                        label="Name"
                        value={this.state.name}
                        onChangeText={name => this.setState({name: name})}
                    />
                    <TextInput
                        mode="outlined"
                        label="Dosierung (optional)"
                        value={this.state.dosage}
                        onChangeText={dosage => this.setState({dosage: dosage})}
                    />
                    <Headline style={styles.headlineStyle}>Wochentage</Headline>
                    <Button mode="contained" onPress={() => {this.makeMedicationDaily()}}>Täglich</Button>
                    <View style={styles.checkboxListContainer}>
                        { this.renderDaysPicker() }
                    </View>
                    <Headline style={styles.headlineStyle}>Einnahmezeiten</Headline>
                    <Button mode="contained" style={defaultStyles.defaultButton}
                            onPress={() => {this.showTimerPicker()}}>Hinzufügen +</Button>
                    { (this.state.timePickerVisible) && <DateTimePicker
                        isVisible={this.state.timePickerVisible}
                        mode="time"
                        onCancel={() => this.hideDateTimePicker()}
                        onConfirm={(dateObj) => this.addTimeToState(dateObj)}
                    />}
                    { this.renderTimesList() }
                    <Button mode="contained" style={defaultStyles.defaultButton}
                            onPress={() => this.saveMedication()}>Medikament speichern</Button>
                </ScrollView>
            </PaperProvider>
        )
    }

    showTimerPicker() {
        this.setState({timePickerVisible: true});
    }

    makeMedicationDaily() {
        this.setState({days: days});
    }

    renderDaysPicker() {
        return days.map((day) => {
            return <View style={styles.checkboxContainer} key={day}>
                <Text>{day}</Text>
                <Checkbox onPress={() => this.addDayToState(day)}
                          status={this.getCheckboxStatus(day)}
                          style={styles.checkboxStyle}/>
            </View>
        })
    }

    addDayToState(day) {
        if (this.state.days.indexOf(day) === -1) {
            this.setState({days: [...this.state.days, day]});
        } else {
            let list = this.state.days.filter(((item, j) => item !== day));
            this.setState({days: list});
        }
    }

    addTimeToState(dateObj) {
        let time = DateTimeConverterService.convertDateToTime(dateObj);
        if (this.state.times.indexOf(time) === -1) {
            this.setState({times: [...this.state.times, time]});
        } else {
            let timeList = this.state.times.filter(((item, j) => item !== time));
            this.setState({times: timeList});
        }
        this.hideDateTimePicker();
    }

    getCheckboxStatus(day) {
        if (this.state.days.filter(((item, j) => item === day)).indexOf(day) === 0) {
            return 'checked';
        } else {
            return 'unchecked';
        }
    }

    hideDateTimePicker() {
        this.setState({timePickerVisible: false});
    }


    renderTimesList() {
        return this.state.times.map((time) => {
            return <Card style={styles.timeItem}>
                <Card.Content>
                    <Headline style={styles.timeItemText}>{time} Uhr</Headline>
                    <Button mode="contained"
                            style={styles.timeItemDelete}
                            onPress={() => this.deleteTime(time)}>X</Button>
                </Card.Content>
            </Card>
        })
    }

    deleteTime(time) {
        let timeList = this.state.times.filter(((item, j) => item !== time));
        this.setState({times: timeList});
    }

    /*saveMedication() {
        let medicationExists = false;

        let newMedication = Medication;
        newMedication.name = this.state.name;
        newMedication.dosage = this.state.dosage;



        if (this.state.name !== "" && this.state.days.length > 0 && this.state.times.length > 0) {
            this.state.days.map((day) => {
                getMedicationService().medicationObj[day].medicationList.map((medication) => {
                    if (medication.name === newMedication.name) {
                        medicationExists = true;
                    }
                })

                if (medicationExists) {
                    // TODO: Update medication
                    // getMedicationService
                ().medicationObj[day].medicationList.
                } else {
                    getMedicationService
                ().medicationObj[day].medicationList.push(newMedication);
                }
            });

            MedicationService.getInstance().updateMedication({}, getMedicationService
            ().medicationObj).then((result) => {
                console.log(`DEBUG: updated ${result} document in MedicationStore.`)
            });

            Navigation.dismissAllModals();
        }
    }*/
}

const styles = StyleSheet.create({
    addMedicationContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 10
    },
    checkboxListContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkboxContainer: {
        alignItems: 'center',
        margin: 15
    },
    checkboxStyle: {
        margin: 5,
        alignSelf: 'center'
    },
    headlineStyle: {
        padding: 5
    },
    timeItem: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.turquoise_light,
        padding: 5,
        margin: 5,
    },
    timeItemText: {
        color: colors.white
    },
    timeItemDelete: {
        width: 50
    }


})