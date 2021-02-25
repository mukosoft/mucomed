import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import { observer } from "mobx-react";

import TimeFilter from "@components/common/TimeFilter";
import MedicationItem from '@components/medication/MedicationItem';
import { getDateService } from "@service/DateService";
import { getMedicationService } from '@service/MedicationService';
import { MEDICATION_STATUS } from '@models/Medication';

/**
 * Renders a list of medications and a filter element.
 *
 * @author Dominique Börner
 */
@observer
export default class MedicationList extends Component {
    state = {
        timeToShow: this.getFilterTimesFromSchedule()[0]
    }

    render() {
        return (
            <SafeAreaView>
                    <View style={styles.filterContainer}>
                        <TimeFilter times={this.getFilterTimesFromSchedule()} key={this.getFilterTimesFromSchedule()} />
                    </View>
                <ScrollView showsHorizontalScrollIndicator={false}>
                        {this.showMedications()}
                </ScrollView>
            </SafeAreaView >
        );
    }

    getCurrentMedication() {
        return getMedicationService().medicationSchedule.schedule.filter((day) => {
            return day.id.toLowerCase() === getDateService().calendarSelectionDateId;
        })[0];
    }

    getFilterTimesFromSchedule() {
        let filterTimes = [];

        if (this.getCurrentMedication().medicationList.length > 0) {
            this.getCurrentMedication().medicationList.map(singleMedication => {
                if (!filterTimes[singleMedication.time]) {
                    filterTimes.push(singleMedication.time);
                }
            })
        }

        return filterTimes;
    }

    showMedications() {
        if (getMedicationService().medicationSchedule) {
            if (this.getCurrentMedication().medicationList.length > 0) {
                return this.getCurrentMedication().medicationList.filter(singleMedication => {
                    return singleMedication.time === getDateService().medicationTime;
                }).map(singleMedication => {
                    return singleMedication.medications.map(medication => {
                        if (medication.status === MEDICATION_STATUS.ACTIVE) {
                            return <MedicationItem medication={medication} disabled={false} key={`${medication.name}_${Math.random()}`} />
                        } else {
                            // TODO: show disabled medications, but change their styling
                            // return <MedicationItem medication={medication} disabled={true} />
                        }
                    })
                })
            } else {
                return <View style={styles.row}>
                    <View style={styles.column}>
                        <Image source={require('./../../assets/sad-sleepy-emoticon-face-square.png')} style={styles.img} />
                        <Text style={styles.text}>Keine Medikamente</Text>
                    </View>
                </View>
            }
        }
    }
}

const styles = StyleSheet.create({
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'transparent'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0, padding: 0,
    },
    column: {
        display: 'flex',
        margin: 0, padding: 0,
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

