import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import {Card, Headline} from "react-native-paper";
import Swiper from 'react-native-swiper'
import DropDownPicker from 'react-native-dropdown-picker';
import {activeDot, swiperDot} from "@components/SwiperDot";
import {colors} from "@configs/colors";


/**
 * Cooking Book Screen
 *
 * @author Dominique Börner
 */
export class VirtualCookbook extends Component {

    state = {
        category: 'breakfast',
    }

    render() {
        return (
            <View style={styles.container}>
                <Card style={styles.cardStyle}>
                    <Card.Actions style={styles.cardActionStyle}>
                        <DropDownPicker
                            items={[
                                {label: 'Frühstück', value: 'breakfast'},
                                {label: 'Mittag', value: 'meal'},
                                {label: 'Abendbrot', value: 'dinner'},
                                {label: 'Snack', value: 'snack'},
                            ]}
                            defaultValue={this.state.category}
                            containerStyle={{height: 40, width: '80%'}}
                            onChangeItem={item => this.setState({
                                category: item.value
                            })}/>
                    </Card.Actions>
                    <Card.Content style={styles.cardStyle}>
                        <Swiper showsButtons={false}
                                loop={false}
                                dot={swiperDot} activeDot={activeDot}>
                            <View style={styles.foodCardList}>
                                <Card style={styles.foodCard}>
                                    <Card.Title title={"this.state.recipes[0].name"} />
                                    <Card.Cover source={{ uri: "this.state.recipes[0].img" }}
                                                style={styles.foodCardImage}/>
                                </Card>
                            </View>
                            <View style={styles.slide2}>
                                <Headline style={styles.text}>Swipe2</Headline>
                            </View>
                            <View style={styles.slide3}>
                                <Headline style={styles.text}>Swipe3</Headline>
                            </View>
                        </Swiper>
                    </Card.Content>
                </Card>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.turquoise_light
    },
    cardStyle: {
        flex: 1,
        margin: 10,
        backgroundColor: 'transparent',
        borderWidth: 0,
        elevation: 0
    },
    cardActionStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    foodCardList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    foodCard: {
        width: '43%', height: '27%',
        margin: 10,
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden'
    },
    foodCardImage: {
        width: '100%', height: '100%',
        borderRadius: 10
    }
})