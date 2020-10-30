import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Avatar, Card, IconButton, Menu, Text } from "react-native-paper";
import { colors } from "@configs/colors";
import { observer } from "mobx-react";
import { getDateStorage } from "../../stores/DateStorage";
import { getMedicationStore } from '../../stores/MedicationStore';
import { DateTimeConverterService } from './../../service/DateTimeConverterService';
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
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    ref={ref => this.scrollView = ref} key="medication_scrollView">
                    { /* TODO: Filter element for times */}
                    {this.showMedications()}

                </ScrollView>
            </SafeAreaView>
        );
    }

    showMedications() {
        if (getMedicationStore().medicationSchedule) {
            const activeMedication = getMedicationStore().medicationSchedule.schedule.filter((day) => {
                // todo: get day name of selected date
                return day.id.toLowerCase() === getDateStorage().calendarSelectionDateId;
            })[0]

            return activeMedication.medicationList.filter(singleMedication => {
                // TODO: Filter here -
                return singleMedication.time === "07:00";
            }).map(singleMedication => {
                return singleMedication.medications.map(medication => {
                    if (medication.status === MEDICATION_STATUS.ACTIVE) {
                        return <MedicationItem name={medication.name} dosage={medication.dosage}/>
                    }
                })
            })
        }


    }
}

