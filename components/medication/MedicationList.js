import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { observer } from "mobx-react";

import MedicationTimePicker from "@components/medication/MedicationTimePicker";
import MedicationItem from '@components/medication/MedicationItem';
import { getDateService } from "@service/DateService";
import { getMedicationService } from '@service/MedicationService';
import { MedicationRequestStatus } from '../../models/MedicationRequest';
import Text from "@components/common/Text";
import Button from "@components/common/Button";

import { alignItems, flex, justifyContent, margin, padding, textAlign } from "../../configs/styles";
import { getUiService } from '../../service/UiService';

/**
 * Renders a list of medications and the medicationTimePicker for changing, 
 * which medication should be shown.
 * 
 * @todo change StyleSheet definitions
 * 
 * @see MedicationTimePicker
 * @see MedicationItem
 *
 * @author Dominique Börner (dominique@mukosoft.de)
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
                    <MedicationTimePicker times={getDateService().sortTimeArray(this.getMedicationTimesFromSchedule())} key={this.getMedicationTimesFromSchedule()} />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    {(getMedicationService().medicationSchedule.length > 0) ? this.showMedications() : this.renderNoMedications()}
                </ScrollView>
            </SafeAreaView >
        );
    }

    renderNoMedications() {
        return <View style={[flex.flexCol, justifyContent.justifyCenter, alignItems.itemsCenter]}>
            <Text title>😕</Text>
            <Text title>Keine Medikament</Text>
            <Text heading style={[margin.margin_x_4, padding.padding_y_4, textAlign.textCenter]}>Bisher hast du noch keine Medikamente angelegt.</Text>
            <Button primary onPress={() => getUiService().navigateToComponent("MedicationCreationScreen")}>Medikamente anlegen</Button>
        </View>
    }

    getMedicationTimesFromSchedule() {
        let medicationTimes = [];

        getMedicationService().medicationSchedule.map((medicationRequest) => {
            if (this.isMedicationToday(medicationRequest)) {
                // concat without duplicates
                medicationTimes = medicationTimes.concat(medicationRequest.dosageInstruction.timing.repeat.timeOfDay
                    .filter((day) => medicationTimes.indexOf(day) < 0));
            }
        });

        return medicationTimes;
    }

    isMedicationToday(medicationRequest) {
        return medicationRequest.dosageInstruction.timing.repeat.dayOfWeek.indexOf(getDateService().calendarSelectionDateId) >= 0;
    }

    isMedicationSelectedTime(medicationRequest) {
        return medicationRequest.dosageInstruction.timing.repeat.timeOfDay.indexOf(getDateService().medicationTime) >= 0;
    }

    showMedications() {
        if (getMedicationService().medicationSchedule) {

            return getMedicationService().medicationSchedule
                .filter((medicationRequest) => this.isMedicationToday(medicationRequest))
                .filter((medicationRequest) => this.isMedicationSelectedTime(medicationRequest))
                .filter((medicationRequest) => (medicationRequest.status === MedicationRequestStatus.ACTIVE))
                .map((medicationRequest) => {
                    return <MedicationItem medicationRequest={medicationRequest} key={`${medicationRequest.medication.name}}`} />
                })
        } else {
            return <Text>Keine Medikamente</Text>
        }
    }
}

// style definitions

const styles = StyleSheet.create({
    filterContainer: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: '100%',
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

