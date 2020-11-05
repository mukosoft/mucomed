import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, IconButton, Provider as PaperProvider, Text } from "react-native-paper";
import { colors } from "@configs/colors";
import HorizontalCalendar from "@components/HorizontalCalendar";
import { darkTheme, lightTheme } from "../../configs/PaperTheme";
import { observer } from "mobx-react";
import { defaultStyles } from "../../configs/styles";
import { getUiService } from "../../service/UiService";
import { getMedicationService } from '../../service/MedicationService';
import MedicationList from './../lists/MedicationList';
import FAIcon from "react-native-vector-icons/FontAwesome5";
import { Navigation } from 'react-native-navigation';
import BottomNavigation from './../navigation/BottomNavigation';
import GroupCard from './../cards/GroupCard';
import PhysicalHealthList from '../lists/PhysicalHealthList';


/**
 * Homescreen
 *
 * @author Dominique Börner
 */
@observer
export class HomeScreen extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
        return (
            <PaperProvider theme={lightTheme}>
                <View style={defaultStyles.themeContainer}>
                    <ScrollView style={defaultStyles.defaultContentContainer}>
                        <HorizontalCalendar />
                        <GroupCard title="Medikamente">
                                <MedicationList medications={getMedicationService().medicationSchedule} />
                        </GroupCard>

                        <GroupCard title="Wie geht es dir heute?">
                            <PhysicalHealthList />
                        </GroupCard>

                        <View style={styles.flexRow}>
                            <Card style={[styles.actionCard, defaultStyles.defaultShadow]}>
                                <FAIcon name="heart" style={styles.actionCardIcon} />
                                <Text style={styles.actionCardText}>Vitaldaten</Text>
                            </Card>
                            <Card style={[styles.actionCard, defaultStyles.defaultShadow]}>
                                <FAIcon name="file-pdf" style={styles.actionCardIcon} />
                                <Text style={styles.actionCardText}>Arztbericht scannen</Text>
                            </Card>
                            <Card style={[styles.actionCard, defaultStyles.defaultShadow]}>
                                <FAIcon name="pills" style={styles.actionCardIcon} />
                                <Text style={styles.actionCardText}>Kreon berechnen</Text>
                            </Card>
                        </View>

                        {/**<Card style={[styles.contentCard, defaultStyles.defaultShadow]}>
                            <Card.Title title={getUiService().getTranslation('vitaldata')} left={() => <IconButton icon="heart" />} />
                            <Card.Content>
                                <Button mode="contained" style={defaultStyles.defaultButton} onPress={() => VitaldataService.openVitaldataWindow()}>{getUiService().getTranslation('add_vitaldata')}</Button>
                                <Button mode="contained" style={defaultStyles.defaultButton}>{getUiService().getTranslation('add_doctor_report')}</Button>
                            </Card.Content>
                        </Card>**/}
                    </ScrollView>
                    <BottomNavigation />
                </View>
            </PaperProvider>
        )
    }


    navigationButtonPressed(button) {
        if (button.buttonId === 'openSettings') {
            // TODO: switch to SettingsScreen
            alert("open_settings_screen")
        }
    }
}

const styles = StyleSheet.create({
    contentCard: {
        margin: 10,
        marginBottom: 20
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    actionCard: {
        flex: 1,
        flexDirection: 'column',
        aspectRatio: 1,
        margin: 10, padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.turquoise_light
    },
    actionCardIcon: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 26,
        color: colors.white,

    },
    actionCardText: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: colors.white,
        fontSize: 14,
        margin: 0, padding: 0
    }
})