import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { AppContainer } from '@components/common/AppContainer';


/**
 * Screen for adding a medication
 *
 * @author Dominique Börner
 */
export class MedicationCreationScreen extends Component {

    state = {
        name: "",
        dosage: "",
        times: [],
        days: [],

        timePickerVisible: false
    }

    render() {
        return (
        <AppContainer></AppContainer>
        )
    }
}

const styles = StyleSheet.create({
    
})