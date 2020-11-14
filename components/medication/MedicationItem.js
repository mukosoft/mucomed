import { observer } from "mobx-react";
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import FAIcon from "react-native-vector-icons/FontAwesome5";

import { defaultStyles } from '@configs/styles';
import { getUiService } from '@service/UiService';

/**
 * Renders a medication.
 * 
 * @author Dominique Börner
 */
@observer
export default class MedicationItem extends Component {

    state = {};

    render() {
        return (
            <TouchableOpacity>
                <View style={[styles.medicationCard, defaultStyles.defaultBorderRadius]}>
                    <FAIcon name="pills" style={styles.icon} />
                    <View>
                        <Text style={styles.name}>{this.props.medication.name}, <Text style={styles.dosage}>{this.props.medication.dosage}</Text></Text>
                        <Text style={styles.description}>{this.props.medication.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    medicationCard: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: getUiService().theme.secondary,
        margin: 5,
        padding: 10,
    },
    icon: {
        fontSize: 32,
        color: getUiService().theme.primary,
        margin: 10
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: getUiService().theme.primary,
        marginTop: 5, marginBottom: 0
    },
    dosage: {
        color: getUiService().theme.primary,
        fontSize: 12,
    },
    description: {
        marginTop: 10,
        marginBottom: 10,
        color: getUiService().theme.primary,
        fontSize: 14
    },
});