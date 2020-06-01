//import liraries
import React, { Component } from "react";
import { View, StyleSheet, FlatList, ScrollView, SafeAreaView, Button, Dimensions, Text, Image } from "react-native";
import _ from 'lodash';
import { Appbar, Title, Avatar, Card, Paragraph } from "react-native-paper";
// import { Text, Appbar, Title, Avatar, Card, Paragraph } from "react-native-material-ui";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Star from "../asserts/svg/star_outline-white-24dp.svg";
import Phone from "../asserts/svg/phone_in_talk-white-24dp.svg";

const { width, height } = Dimensions.get('window');
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

//const scale = size => width / guidelineBaseWidth * size;
const dummyData = [
    {
        id: 0,
        title: "Guac de la Costa",
        descrpition: "tort1llas de mais, fruit de la passion, mango",
        quantity: 0,
        prize: 7,
        isDayAndNight: true,
        isAddButtonEnable: true,
        isSelected: false
    },
    {
        id: 1,
        title: "Chicharron y Cerveza",
        descrpition: "cirton vert/Corano sauce",
        quantity: 0,
        prize: 7,
        isDayAndNight: false,
        isAddButtonEnable: true,
        isSelected: false
    },
    {
        id: 2,
        title: "Chilitos con Camba",
        descrpition: "padrones tempura, gambas",
        quantity: 0,
        prize: 7,
        isDayAndNight: false,
        isAddButtonEnable: true,
        isSelected: false
    }
];

// create a component
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: dummyData,
            totalItems: 0
            // totalPrize: 0
        };
    }

    onPressAdd = (id) => {
        const newData = _.cloneDeep(this.state.data);
        newData.map((order) => {
            if (order.id === id) {
                order.isAddButtonEnable = false;
                order.quantity = 1;
                order.isSelected = true;
            }
        });

        this.setState({
            data: newData,
            totalItems: this.state.totalItems + 1
        });
    }

    onPressIncrenment = (id) => {
        const newData = _.cloneDeep(this.state.data);
        newData.map((order) => {
            if (order.id === id && order.quantity < 20) {
                order.quantity = order.quantity + 1;
                order.isSelected = true;
            }
        });

        this.setState({
            data: newData,
            totalItems: this.state.totalItems + 1
        });
    }

    onPressDecrement = (id) => {
        const newData = _.cloneDeep(this.state.data);
        newData.map((order) => {
            if (order.id === id) {
                order.quantity = order.quantity - 1;
                order.isAddButtonEnable = order.quantity === 0;
                order.isSelected = false;
            }
        });

        this.setState({
            data: newData,
            totalItems: this.state.totalItems - 1
        });
    }

    viewCart = () => {
        let prize = 0;
        if (this.state.totalItems > 0) {
            let selectedData = [];
            this.state.data.map((a) => {
                if (!a.isAddButtonEnable) {
                    selectedData.push(a);
                    prize = prize + (a.quantity * a.prize);
                }
            });
            this.props.navigation.navigate('Cart', { selectedData: selectedData, totalPrize: prize, onGoBack: (cartData) => this.onGoBack(cartData) });
        }
    }

    onGoBack(cartData) {
        const newData = _.cloneDeep(this.state.data);
        cartData.map((order) => {
            newData.map((d) => {
                if (order.id === d.id) {
                    var i = newData.findIndex(a => a.id === d.id)
                    newData[i] = order;
                }
            })
        });
        var result = this.state.data.filter(item => !cartData.some(itemToRemove => item.id === itemToRemove.id));
        this.setState({
            data: newData
        }, function () {
            this.calculateTotalItems();
        });
    }

    calculateTotalItems() {
        let totalItems = 0;
        this.state.data.map((a) => {
            if (!a.isAddButtonEnable) {
                totalItems = totalItems + a.quantity;
            }
        });
        this.setState({
            totalItems: totalItems
        })
    }

    render() {
        return (
            <SafeAreaView>
                <View>
                    <View style={{
                        //flex: 1,
                        flexDirection: "column"
                    }}>
                        <Card style={{
                        }}>
                            <Card.Cover source={require('../asserts/images/inca-social-dish.jpg')} />
                        </Card>
                        <Card style={{
                            elevation: 1,
                            borderColor: "#000",
                            margin: 20,
                            bottom: 50
                        }}>
                            <Card.Content>
                                <Title style={{
                                    justifyContent: 'center',
                                    alignSelf: 'center'
                                }}> Inka Restaurant</Title>
                                <View style={{
                                    //flex: 1,
                                    flexDirection: "column",
                                    alignSelf: 'center',
                                }}>
                                    <View style={{
                                        flexDirection: "row"
                                    }}>
                                        <Star width={20} height={20} fill={"#8A8A8A"} />
                                        <View style={{
                                            flexDirection: "column"
                                        }}>
                                            <Text style={{
                                                fontFamily: "Arial",
                                                color: '#5D5D5D'
                                            }}>  5.0[200+] | All days: 09.00 AM - 06.00 PM </Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: "row",
                                        alignSelf: 'center',
                                    }}>
                                        <Phone width={20} height={20} fill={"#020202"} />
                                        <View style={{
                                            flexDirection: "column"
                                        }}>
                                            <Text style={{
                                                fontFamily: "Helvetica, Arial, sans-serif",
                                                fontStyle: 'oblique',
                                                color: '#5D5D5D'
                                            }}>  Reach us at: 9854562142 </Text>
                                        </View>
                                    </View>

                                </View>
                                <View style={{
                                    flex: 1,
                                    width: 150,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#111D2D',
                                    padding: 20,
                                    borderRadius: 10,
                                    alignSelf: 'center',
                                }}>
                                    <Text style={{
                                        color: '#F3FAFF',
                                    }} >BOOK A TABLE</Text>
                                </View>

                            </Card.Content>
                        </Card>
                    </View>
                    <View style={{
                        bottom: 50
                    }}>
                        <Text style={{
                            fontFamily: "Helvetica, Arial, sans-serif",
                            fontStyle: 'bold',
                            fontSize: 20,
                        }}> Starter</Text>
                    </View>
                    <View style={{
                        bottom: 40
                    }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={this.state.data}
                                keyExtractor={(item, index) => item.title}
                                renderItem={({ item: rowData }) => {
                                    return (
                                        <View style={styles.popularCategories}>
                                            <View style={{
                                                flexDirection: "row",
                                                marginBottom: 10,
                                                justifyContent:'space-between'
                                            }}>
                                                {rowData.isDayAndNight ?
                                                    <View style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-start',
                                                        flexDirection: 'column',
                                                        flexWrap: 'wrap',
                                                    }}>
                                                        <Text style={{
                                                            //backgroundColor: '#5D5D5D',
                                                            borderColor: '#5D5D5D',
                                                            borderWidth: 1,
                                                            borderRadius: 5,
                                                            position: 'relative',
                                                            marginHorizontal: 3,
                                                            fontFamily: "Helvetica, Arial, sans-serif",
                                                            //fontStyle: 'oblique',
                                                            color: '#5D5D5D',
                                                            alignSelf: 'center'
                                                        }} >N</Text>
                                                        <Text style={{
                                                            //backgroundColor: '#5D5D5D',
                                                            borderColor: '#5D5D5D',
                                                            borderWidth: 1,
                                                            borderRadius: 3,
                                                            position: 'relative',
                                                            fontFamily: "Helvetica, Arial, sans-serif",
                                                            //fontStyle: 'oblique',
                                                            color: '#5D5D5D',
                                                            marginHorizontal: 3
                                                        }}>D</Text>
                                                    </View> :
                                                    <View style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-start',
                                                        flexDirection: 'column',
                                                        flexWrap: 'wrap',
                                                    }}>
                                                        <Text style={{
                                                            //backgroundColor: '#5D5D5D',
                                                            borderColor: '#5D5D5D',
                                                            borderWidth: 1,
                                                            borderRadius: 3,
                                                            marginHorizontal: 3,
                                                            position: 'relative', fontFamily: "Helvetica, Arial, sans-serif",
                                                            //fontStyle: 'oblique',
                                                            color: '#5D5D5D'
                                                        }}>N</Text>
                                                    </View>
                                                }
                                                <View style={{
                                                    flexDirection: "column",
                                                    position: 'relative',
                                                    //alignItems: 'center',
                                                    justifyContent: 'flex-start',
                                                    flexDirection: 'column',
                                                    marginHorizontal: 3,
                                                    flexWrap: 'wrap',
                                                    marginLeft: 10

                                                }}>
                                                    <Text style={styles.popularText}>{rowData.title}</Text>
                                                    <Text style={styles.popularText}>{rowData.descrpition}</Text>
                                                    <View style={{
                                                        flexDirection: "row",
                                                        //alignItems: 'center',
                                                        justifyContent: 'flex-start'

                                                    }}>
                                                        <Icon5 name='euro-sign' style={{
                                                            top: 3,
                                                            color: '#D2C7B1'
                                                        }} />
                                                        <Text style={{
                                                            color: '#D2C7B1'
                                                        }}>{rowData.prize}</Text>
                                                    </View>
                                                </View>
                                                <View style={{                                                   
                                                     marginHorizontal: 10,
                                                    flex: 1,
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'flex-start'
                                                }}>
                                                    {rowData.isAddButtonEnable ?
                                                        <View style={{
                                                            justifyContent: 'center',
                                                            alignItems: 'flex-start',
                                                            borderColor: '#5D5D5D',
                                                            borderWidth: 1,
                                                            width: 70
                                                        }}>
                                                            <Text style={{
                                                                fontFamily: "Helvetica, Arial, sans-serif",
                                                                //fontStyle: 'oblique',
                                                                color: '#5D5D5D',
                                                                alignSelf: 'center'

                                                            }}
                                                                onPress={this.onPressAdd.bind(this, rowData.id)}> + ADD</Text>
                                                        </View> :
                                                        <View style={{
                                                            justifyContent: 'space-between',
                                                            alignItems: 'flex-start',
                                                            borderColor: '#5D5D5D',
                                                            borderWidth: 1,
                                                            width: 70,
                                                            flexDirection: "row"
                                                        }}>
                                                            <Text style={{
                                                                fontFamily: "Helvetica, Arial, sans-serif",
                                                                color: '#5D5D5D',
                                                            }}
                                                                onPress={this.onPressDecrement.bind(this, rowData.id)}
                                                            > - </Text>
                                                            <Text style={{
                                                                fontFamily: "Helvetica, Arial, sans-serif",
                                                                color: '#5D5D5D'
                                                            }}
                                                            > {rowData.quantity} </Text>
                                                            <Text style={{
                                                                fontFamily: "Helvetica, Arial, sans-serif",
                                                                color: '#5D5D5D'
                                                            }}
                                                                onPress={this.onPressIncrenment.bind(this, rowData.id)}
                                                            > + </Text>
                                                        </View>}
                                                </View>
                                            </View>
                                        </View>
                                    );
                                }}
                            />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                width: 80,
                                height: 30,
                                backgroundColor: '#E5B87D',
                                alignItems: 'center',
                                borderRadius: 5,
                                alignSelf: 'center',
                                //padding: 20
                            }}>
                                <Icon5 name='utensils' size={20} style={{
                                    justifyContent: 'flex-start',
                                    padding: 5
                                }} />
                                <Text style={{
                                    justifyContent: 'center',
                                    alignSelf: 'center'
                                }}>MENU</Text>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        marginTop: -20,
                        paddingVertical: 20,
                        backgroundColor: '#0E1E2E'

                    }}>
                        <Icon5 name='shopping-cart' light size={20} color={'#F3FAFF'} style={{
                            justifyContent: 'flex-start',
                            padding: 10
                        }} />
                        <Text style={{
                            color: '#F3FAFF',
                            justifyContent: 'flex-start',
                            alignSelf: 'center'
                        }} onPress={this.viewCart.bind(this)}>VIEW CARTS</Text>
                        {this.state.totalItems !== 0 ?
                            <Text style={{
                                color: '#F3FAFF',
                                justifyContent: 'flex-end',
                                alignSelf: 'center',
                                padding: 5
                            }} >({this.state.totalItems} ITEMS)</Text> : null}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 20
    },
    popularCategories: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between'
        //alignItems: "center",
        //margin: 7
    },
    popularText: {
        fontFamily: "Helvetica, Arial, sans-serif",
        //fontStyle: 'oblique',
        color: '#5D5D5D'
    },
    footer: {
        position: 'absolute',
        flex: 0.1,
        left: 0,
        right: 0,
        bottom: -10,
        backgroundColor: 'green',
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
    },
});

//make this component available to the app
export default HomeScreen;
