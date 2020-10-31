import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Avatar, Card, IconButton, Menu, Text } from "react-native-paper";
import { colors } from "@configs/colors";
import { observer } from "mobx-react";
import { getDateStorage } from "../../stores/DateStorage";
import { getMedicationService } from '../../stores/MedicationService';
import { MEDICATION_STATUS } from './../../models/Medication';
import MedicationItem from '../cards/MedicationItem';

/**
 * Create a Horizontal scrollable list with medications inside.
 * Each medication can be filtered by time.
 *
 * @author Dominique Börner
 */
@observer
export default class MedicationList extends Component {
    render() {
        return (
            <SafeAreaView key="medication_areaView">
                    { /* TODO: Filter element for times */}
                    {this.showMedications()}
            </SafeAreaView>
        );
    }

    showMedications() {
        if (getMedicationService().medicationSchedule) {
            
            const activeMedication = getMedicationService().medicationSchedule.schedule.filter((day) => {
                // todo: get day name of selected date
                return day.id.toLowerCase() === getDateStorage().calendarSelectionDateId;
            })[0];

            if (activeMedication.medicationList > 0) {
                return activeMedication.medicationList.filter(singleMedication => {
                    // TODO: Filter here -
                    return singleMedication.time === "07:00";
                }).map(singleMedication => {
                    return singleMedication.medications.map(medication => {
                        if (medication.status === MEDICATION_STATUS.ACTIVE) {
                            return <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            key="medication_scrollView">
                                <MedicationItem name={medication.name} dosage={medication.dosage}/>
                                </ScrollView>
                        }
                    })
                })
            }  else {
                return <View style={styles.row}>
                    <View style={styles.column}>
                        <Image source={require('./../../assets/sad-sleepy-emoticon-face-square.png')} style={styles.img}/>
                        <Text style={styles.text}>Keine Medikamente</Text>
                        </View>
                    </View>
            }
        }
    }
}

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 0, padding: 0,
    },
    column: {
        display: 'flex',
        margin: 0, padding: 0,
        width: '100%', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8
    },
    img: {
        height: 60,
        margin: 0, padding: 0,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
        margin: 5,
    }
})

