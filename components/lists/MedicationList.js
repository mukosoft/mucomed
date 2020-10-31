import React, { Component } from 'react';
import { Image, SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import { Avatar, Button, Card, IconButton, Menu, Text } from "react-native-paper";
import { colors } from "@configs/colors";
import { observer } from "mobx-react";
import { getDateService } from "../../service/DateService";
import { getMedicationService } from '../../service/MedicationService';
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
    state = {
        timeToShow: this.getFilterTimesFromSchedule()[0]
    }

    render() {
        return (
            <SafeAreaView key="medication_areaView">
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {this.renderFilter()}
                </ScrollView>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {this.showMedications()}
                </ScrollView>
            </SafeAreaView>
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

            return <Button mode="contained" style={[styles.filterButtonStyle, activeButton.style]} labelStyle={activeButton.labelStyle}
                onPress={() => this.setState({ timeToShow: time })}>{time}</Button>
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
    filterButtonStyle: {
        paddingLeft: 2.5, paddingRight: 2.5,
        margin: 5,
    },
    filterButtonActiveStyle: {
        backgroundColor: colors.turquoise_light,
        elevation: 0
    },    
    filterButtonActiveLabelStyle: {
        color: colors.white,
    },
    filterButtonNonActiveStyle: {
        backgroundColor: colors.white,
    },    
    filterButtonNonActiveLabelStyle: {
        color: colors.turquoise_light,
    },
    row: {
        width: 300,
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

