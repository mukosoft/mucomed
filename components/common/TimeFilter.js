import BorderedContainer from '@components/common/BorderedContainer';
import { getDateService } from '@service/DateService';
import { getUiService } from '@service/UiService';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

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
        this.setState({ timesPointer: 0 })
        getDateService().setMedicationTime(this.props.times[0])
    }

    render() {
        if (this.props.times.length > 0) {
            return (
                <>
                    <View style={styles.container}>
                        <BorderedContainer>
                            <TouchableOpacity onPress={() => this.handlePrev()} style={styles.touchable}>
                                <FontAwesome5Icon style={styles.icons} name="angle-left" />
                            </TouchableOpacity>
                        </BorderedContainer>
                        <BorderedContainer>
                            <Text style={styles.timeCaption}>{getDateService().medicationTime} Uhr</Text>
                        </BorderedContainer>
                        <BorderedContainer>
                            <TouchableOpacity onPress={() => this.handleNext()} style={styles.touchable}>
                                <FontAwesome5Icon style={styles.icons} name="angle-right" />
                            </TouchableOpacity>
                        </BorderedContainer>
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
        color: getUiService().theme.primary,
        backgroundColor: getUiService().theme.secondary,
    },
    icons: {
        margin: 5,
        fontSize: 20,
        color: getUiService().theme.primary,
    },
    touchable: {
        backgroundColor: getUiService().theme.secondary,
        paddingLeft: 5, paddingRight: 5
    }
})