import { getDateService } from '@service/DateService';
import { getUiService } from '@service/UiService';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { alignItems, borderRadius, flex, fontSize, fontStyle, opacity, padding } from '../../configs/styles';

/**
 * Renders the current time, with buttons on the left and right of it
 * for navigation trough each medicationTime.
 * 
 * @property {array} times - string array with times
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export default class MedicationTimePicker extends Component {
    state = {
        timesPointer: 0
    }

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.setState({ timesPointer: 0 });
        getDateService().setMedicationTime(this.props.times[0]);
    }

    render() {
        if (this.props.times.length > 0) {
            return (
                <>
                    <View style={container}>
                        <View style={[flex.flex_1, alignItems.itemsEnd]}>
                            {
                                (this.state.timesPointer > 0) 
                                ? 
                                <TouchableOpacity onPress={() => this.handlePrev()} style={touchable} key="prevButton">
                                    <Text style={arrowCaption}>{getDateService().removeSecondsFromTime(this.props.times[this.state.timesPointer - 1])}</Text>
                                    <FontAwesome5Icon style={arrowIcons} name="angle-left" />
                                </TouchableOpacity>
                                : <TouchableOpacity style={[touchable, disabled]} key="prevButton_disabled">
                                <FontAwesome5Icon style={arrowIcons} name="angle-left" />
                            </TouchableOpacity>
                            }        
                        </View>
                        <View>
                            <Text style={timeCaption}>{getDateService().removeSecondsFromTime(getDateService().getMedicationTime())} Uhr</Text>
                        </View>
                        <View style={[flex.flex_1, alignItems.itemsStart]}>
                        {
                                (this.state.timesPointer < (this.props.times.length - 1)) 
                                ? 
                                <TouchableOpacity onPress={() => this.handleNext()} style={touchable} key="nextButton">
                                    <FontAwesome5Icon style={arrowIcons} name="angle-right" />
                                    <Text style={arrowCaption}>{getDateService().removeSecondsFromTime(this.props.times[this.state.timesPointer + 1])}</Text>
                                </TouchableOpacity>
                                : <TouchableOpacity style={[touchable, disabled]} key="nextButton_disabled">
                                <FontAwesome5Icon style={arrowIcons} name="angle-right" />
                            </TouchableOpacity>
                            }   
                        </View>
                    </View>
                </>
            )
        }
        return <></>
    }

    handlePrev() {
        if (this.state.timesPointer > 0) {
            getDateService().setMedicationTime(this.props.times[(this.state.timesPointer - 1)])
            this.setState({ timesPointer: (this.state.timesPointer - 1) })
        } else {
            this.setState({ timesPointer: 0 });
        }
    }

    handleNext() {
        if (((this.state.timesPointer) < (this.props.times.length - 1))) {
            getDateService().setMedicationTime(this.props.times[(this.state.timesPointer + 1)])
            this.setState({ timesPointer: (this.state.timesPointer + 1) })
        }
    }
}

// style definitions

const container = StyleSheet.flatten([
    flex.flexRow,
    padding.padding_4,
    alignItems.itemsCenter
])

const timeCaption = StyleSheet.flatten([
    padding.padding_3,
    borderRadius.roundedMD,
    fontSize.lg,
    fontStyle.bold,
    { color: getUiService().theme.primary },
    { backgroundColor: getUiService().theme.secondary }
])

const arrowIcons = StyleSheet.flatten([
    fontSize.xl,
    padding.padding_3,
    { color: getUiService().theme.primary }
])

const arrowCaption = StyleSheet.flatten([
    fontSize.md,
    fontStyle.bold,
    { color: getUiService().theme.primary }
])

const touchable = StyleSheet.flatten([
    flex.flexRow,

    flex.flex_1,
    // justifyContent.justifyCenter,
    alignItems.itemsCenter,
    padding.padding_x_3
])

const disabled = StyleSheet.flatten([
    opacity.opacity50
])