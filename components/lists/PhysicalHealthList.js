
import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import TouchInteractionContainer from '../interaction/TouchInteractionContainer';
import { getVitaldataService } from '../../service/VitaldataService';
import { colors } from './../../configs/colors';
import { observer } from 'mobx-react';
import FAIcon from "react-native-vector-icons/FontAwesome5";

/**
 * Best condition on top,
 * baddest Condition on Bottom
 * 
 * faIcon uses fontAwesome5
 */
export const HEALTH_CONDITIONS = [
    {
        id: "very_good",
        text: "Sehr gut",
        faIcon: "grin"
    },
    {
        id: "good",
        text: "Gut",
        faIcon: "smile"
    },
    {
        id: "not_good",
        text: "Nicht so gut",
        faIcon: "frown"
    }
].reverse();


@observer
export default class PhysicalHealthList extends Component {
    render() {
        return (
            <View style={styles.container}>
                {
                    HEALTH_CONDITIONS.map(healthCondition => {
                        return <TouchInteractionContainer style={styles.item}
                            key={healthCondition.id}
                            onPress={() => getVitaldataService().setHealthCondition(healthCondition.id)}>
                            <View>
                                <FAIcon name={healthCondition.faIcon} style={[styles.icon, (getVitaldataService().healthCondition === healthCondition.id) ? styles.activeIcon : styles.inactiveIcon]} />
                                <Text style={[styles.text, (getVitaldataService().healthCondition === healthCondition.id) ? styles.activeText : styles.inactiveText]}>{healthCondition.text}</Text>
                            </View>
                        </TouchInteractionContainer>
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    item: {
        flex: 1,
        aspectRatio: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    icon: {
        fontSize: 26,
        alignSelf: 'center',
        margin: 5
    },

    activeIcon: {
        color: colors.turquoise_light,
    },
    inactiveIcon: {
        color: colors.grey_light
    },
    text: {
        fontSize: 12,
        alignSelf: 'center',
    },
    activeText: {
        color: colors.turquoise_light
    },
    inactiveText: {
        color: colors.grey_light
    },
})