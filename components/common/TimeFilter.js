import React, { Component } from 'react';
import { colors } from '@configs/colors';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { getDateService } from '@service/DateService';
import { defaultStyles } from '@configs/styles';

/**
 * TimeFilter receives an array of times:String, and renders an TimeFilter. 
 * This TimeFilter changes the medicationTime in DateService.
 * 
 * FIXME: initial pointer not working, also strange things happens while navigating
 * 
 * @author Dominique Börner
 */
export default class TimeFilter extends Component {
    state = {
        timesPointer: 0
    }

    constructor(props) {
        super(props);
        this.setState({ timesPointer: 0})
        getDateService().setMedicationTime(this.props.times[0])
    }

    render() {
        if (this.props.times.length > 0) {
            return (
                <>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => this.handlePrev()} style={styles.touchable}>
                            <FontAwesome5Icon style={styles.icons} name="angle-left" />
                        </TouchableOpacity>
                        <Text style={styles.timeCaption}>{getDateService().medicationTime} Uhr</Text>
                        <TouchableOpacity onPress={() => this.handleNext()} style={styles.touchable}>
                            <FontAwesome5Icon style={styles.icons} name="angle-right" />
                        </TouchableOpacity>
                    </View>
                </>
            )
        }
        return <></>
    }

    handlePrev() {
        if (this.state.timesPointer >= 0) {
            this.setState({ timesPointer: (this.state.timesPointer - 1) })
            getDateService().setMedicationTime(this.props.times[this.state.timesPointer])
        }
    }

    handleNext() {
        if (((this.state.timesPointer) < (this.props.times.length))) {
            this.setState({ timesPointer: (this.state.timesPointer + 1) })
            getDateService().setMedicationTime(this.props.times[this.state.timesPointer])
        }
     }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
    },
    timeCaption: {
        padding: 5,
        marginLeft: 2.5, marginRight: 2.5,
        fontSize: 18,
        color: colors.primary,
        borderRadius: defaultStyles.defaultBorderRadius.borderRadius,
        backgroundColor: colors.secondary,
    },
    icons: {
        margin: 5,
        fontSize: 20,
        color: colors.primary
    },
    touchable: {
        borderRadius: defaultStyles.defaultBorderRadius.borderRadius,
        backgroundColor: colors.secondary,
        paddingLeft: 5, paddingRight: 5
    }
})