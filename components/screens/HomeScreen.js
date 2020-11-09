import HorizontalCalendar from "@components/HorizontalCalendar";
import { colors } from "@configs/colors";
import { observer } from "mobx-react";
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Navigation } from 'react-native-navigation';
import { Avatar, Button, Card, IconButton, Provider as PaperProvider, Text } from "react-native-paper";
import FAIcon from "react-native-vector-icons/FontAwesome5";

import { darkTheme, lightTheme } from "../../configs/PaperTheme";
import { defaultStyles } from "../../configs/styles";
import { getMedicationService } from '../../service/MedicationService';
import { getUiService } from "../../service/UiService";
import PhysicalHealthList from '../lists/PhysicalHealthList';
import GroupCard from './../cards/GroupCard';
import Layout from './../container/Layout';
import MedicationList from './../lists/MedicationList';
import BottomNavigation from './../navigation/BottomNavigation';

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
                    
                    <HorizontalCalendar />
                    <ScrollView style={defaultStyles.defaultContentContainer}>
                        <Layout>
                            <MedicationList medications={getMedicationService().medicationSchedule} />
                        </Layout>
                        

                        {/* <GroupCard title="Wie geht es dir heute?">
                            <PhysicalHealthList />
                        </GroupCard> */}

                        {/* <View style={styles.flexRow}>
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
                        </View> */}

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