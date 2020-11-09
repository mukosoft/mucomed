import { colors } from "@configs/colors";
import { observer } from "mobx-react";
import React, { Component } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

import { getDateService } from "../../service/DateService";
import { getMedicationService } from '../../service/MedicationService';
import MedicationItem from '../cards/MedicationItem';
import { MEDICATION_STATUS } from './../../models/Medication';
import FilterButton from './../inputs/FilterButton';

/**
 * Create a Horizontal scrollable list with medications inside.
 * Each medication can be filtered by time.
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
                        {this.renderFilter()}
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

    renderFilter() {
        let activeButton = {
            style: "",
            labelStyle: ""
        };

        return this.getFilterTimesFromSchedule().map(time => {

            if (this.state.timeToShow === time) {
                activeButton.style = styles.filterButtonActiveStyle;
                activeButton.labelStyle = styles.filterButtonActiveLabelStyle;
            } else {
                activeButton.style = styles.filterButtonNonActiveStyle;
                activeButton.labelStyle = styles.filterButtonNonActiveLabelStyle;
            }

            return <FilterButton style={activeButton.style}
                onPress={() => this.setState({ timeToShow: time })}><Text style={activeButton.labelStyle}>{time}</Text></FilterButton>
        })
    }

    showMedications() {
        if (getMedicationService().medicationSchedule) {
            if (this.getCurrentMedication().medicationList.length > 0) {
                return this.getCurrentMedication().medicationList.filter(singleMedication => {
                    return singleMedication.time === this.state.timeToShow;
                }).map(singleMedication => {
                    return singleMedication.medications.map(medication => {
                        if (medication.status === MEDICATION_STATUS.ACTIVE) {
                            return <MedicationItem medication={medication} disabled={false} />
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
    filterButtonActiveStyle: {
    },
    filterButtonNonActiveStyle: {
    },
    filterButtonActiveLabelStyle: {
        fontWeight: 'bold',
        color: colors.primary,
    },
    filterButtonNonActiveLabelStyle: {
        color: colors.primary,
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
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

