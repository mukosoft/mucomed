import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Button, Card, IconButton, Provider as PaperProvider, Text } from "react-native-paper";
import { colors } from "@configs/colors";
import HorizontalCalendar from "@components/HorizontalCalendar";
import { darkTheme, lightTheme } from "../../configs/PaperTheme";
import { observer } from "mobx-react";
import { defaultStyles } from "../../configs/styles";
import { getUiService } from "../../stores/UiService";
import { getMedicationService } from '../../stores/MedicationService';
import MedicationList from './../lists/MedicationList';
import FAIcon from "react-native-vector-icons/FontAwesome5";


/**
 * Homescreen
 *
 * @author Dominique Börner
 */
@observer
export class HomeScreen extends Component {
    render() {
        return (
            <PaperProvider theme={lightTheme}>
                <View style={defaultStyles.themeContainer}>
                    <ScrollView style={defaultStyles.defaultContentContainer}>
                        <HorizontalCalendar />
                        <Card style={[styles.contentCard, defaultStyles.defaultShadow]}>
                            <Card.Title title={getUiService().getTranslation('medication')} right={() => <IconButton icon="plus" onPress={() => getUiService().openMedicationWindow()} />}
                                left={(props) => <Avatar.Icon style={{ marginRight: 10, backgroundColor: colors.white }}
                                    color={"black"} {...props} icon="pill" />} />
                            <Card.Content>
                                <MedicationList medications={getMedicationService().medicationSchedule} />
                            </Card.Content>
                        </Card>

                        <Card style={[styles.contentCard, defaultStyles.defaultShadow]}>
                            <Card.Title title="Mahlzeiten" right={() => <IconButton icon="plus" />}
                                left={() => <FAIcon size={24} name="pizza-slice" />} />
                            <Card.Content>
                            </Card.Content>
                        </Card>

                        <View style={styles.flexRow}>
                            <Card style={[styles.actionCard, defaultStyles.defaultShadow]}>
                                <FAIcon name="heart" style={styles.actionCardIcon} />
                                <Text style={styles.actionCardText}>Vitaldaten erfassen</Text>
                            </Card>
                            <Card style={[styles.actionCard, defaultStyles.defaultShadow]}>
                                <FAIcon name="file-pdf" style={styles.actionCardIcon} />
                                <Text style={styles.actionCardText}>Arztbericht scannen</Text>
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
        justifyContent: 'center',
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
        fontSize: 34,
        color: colors.white,

    },
    actionCardText: {
        flex: 1,
        textAlignVertical: 'center',
        textAlign: 'center',
        color: colors.white,
        fontSize: 20,
        margin: 0, padding: 0
    }
})