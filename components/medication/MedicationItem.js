import { observer } from "mobx-react";
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FAIcon from "react-native-vector-icons/FontAwesome5";

import { getUiService } from '@service/UiService';
import { alignItems, flex, padding, margin, borderRadius, fontSize, fontStyle, width } from "../../configs/styles";
import Button from '@components/common/Button';
import { getMedicationService } from "../../service/MedicationService";
import Text from '@components/common/Text';
import TextInput from '@components/common/Textinput';
import { getDateService } from "../../service/DateService";

/**
 * Renders an medication. Based on the properties set, the view is more detailed,
 * or the medication can be deleted.
 * 
 * @property {Object} MedicationRequest
 * @property detailed - if set, renders an detailed view with dates and times of intake
 * @property canBeDeleted - if set, renders an button for deleting the medication 
 * 
 * @see MedicationRequest
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export default class MedicationItem extends Component {

    render() {
        return (
            <TouchableOpacity>
                <View style={(this.props.detailed) ? medicationCardDetailed : medicationCard}>
                    <FAIcon name="pills" style={icon} />
                    <View>
                        <Text style={name}>{this.props.medicationRequest.medication.name}
                            {(this.props.medicationRequest.dosageInstruction.doseAndRate.dose) && ', '}
                            <Text style={dosage}>{this.props.medicationRequest.dosageInstruction.doseAndRate.dose}</Text></Text>
                        {(this.props.detailed) && this.renderDetails()}
                        {(this.props.detailed) && <Text heading>Beschreibung:</Text>}
                        <Text style={description}>{this.props.medicationRequest.dosageInstruction.patientInstruction}</Text>
                    {(this.props.stockEditable) && <TextInput value="2" style={textAmount} />}
                    </View>
                    <View>
                    {(this.props.canBeDeleted) && 
                        <Button primary onPress={() => getMedicationService().deleteMedicationRequest(this.props.medicationRequest)}>Löschen</Button>}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderDetails() {
        return <View style={flexCol}>
            <Text heading>Tage:</Text>
            <View style={flexRow}>
                {this.props.medicationRequest.dosageInstruction.timing.repeat.dayOfWeek.map((day) => <Text style={dateTimeText}>{getUiService().getTranslation(day)}</Text>)}
            </View>
            <Text heading>Uhrzeiten:</Text>
            <View style={flexRow}>
                {this.props.medicationRequest.dosageInstruction.timing.repeat.timeOfDay.map((time) => <Text style={dateTimeText}>{getDateService().removeSecondsFromTime(time)} Uhr</Text>)}
            </View>
        </View>
    }
}

const textAmount = StyleSheet.flatten([
    width.width_100
])

const flexRow = StyleSheet.flatten([
    flex.flexRow,
    flex.flexWrap,
])

const flexCol = StyleSheet.flatten([
    flex.flexCol
])

const dateTimeText = StyleSheet.flatten([
    padding.padding_2,
    margin.margin_1,
    borderRadius.roundedMD,
    { backgroundColor: getUiService().theme.primary },
    { color: getUiService().theme.secondary }
])

const medicationCardDetailed = StyleSheet.flatten([
    flex.flexCol,
    flex.flexWrap,
    padding.padding_4,
    borderRadius.roundedMD,
    { backgroundColor: getUiService().theme.secondary }
])

const medicationCard = StyleSheet.flatten([
    flex.flexRow,
    flex.flexWrap,
    alignItems.itemsCenter,
    margin.margin_4,
    padding.padding_4,
    borderRadius.roundedMD,
    { backgroundColor: getUiService().theme.secondary }
])

const icon = StyleSheet.flatten([
    fontSize.xxl,
    margin.margin_3,
    padding.padding_3,
    { color: getUiService().theme.primary }
])

const name = StyleSheet.flatten([
    fontSize.lg,
    fontStyle.bold,
    margin.margin_y_3,
    { color: getUiService().theme.primary }
])

const dosage = StyleSheet.flatten([
    fontSize.md,
    { color: getUiService().theme.primary }
])

const description = StyleSheet.flatten([
    margin.margin_y_3,
    { color: getUiService().theme.primary }
])