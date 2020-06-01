//import liraries
import React, { Component } from "react";
import { View, StyleSheet, FlatList, ScrollView, SafeAreaView, Dimensions, Text, BackHandler } from "react-native";
import _ from 'lodash';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import Arrow from "../asserts/svg/arrow_back-white-18dp.svg";

const { width, height } = Dimensions.get('window');

// create a component
class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.navigation.state.params ? props.navigation.state.params.selectedData : [],
            totalItems: 0,
            totalPrize: props.navigation.state.params ? props.navigation.state.params.totalPrize : 0,
            showData: [],
            isShowMore: false
        };
    }

    componentWillMount() {
        if (this.state.data.length > 2) {
            const dummyData = _.cloneDeep(this.state.data);
            dummyData.splice(2);
            this.setState({
                showData: dummyData,
                isShowMore: true
            });
        }        
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
        }, function () {
            this.calculateTotalPrize();
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
        }, function () {
            this.calculateTotalPrize();
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
        }, function () {
            this.calculateTotalPrize();
        });
    }

    calculateTotalPrize() {
        let prize = 0;
        this.state.data.map((a) => {
            if (!a.isAddButtonEnable) {
                prize = prize + (a.quantity * a.prize);
            }
        });
        this.setState({
            totalPrize: prize
        })
    }

    shownMore = () => {
        this.setState({
            isShowMore: !this.state.isShowMore
        })
    }

    onGoBack() {
        if (this.props.navigation.state.params && typeof this.props.navigation.state.params.onGoBack !== "undefined" && typeof this.props.navigation.state.params.onGoBack === "function") {
            this.props.navigation.state.params.onGoBack(this.state.data);
            this.props.navigation.goBack();
        }
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{
                    flex: 1,
                    flexDirection: "column"
                }}>
                    <View style={{ width: width, height: height - 75 }}>
                        <View style={{                           
                            flexDirection: "column",
                            height: 250,
                            backgroundColor: '#0E1E2E',
                        }}>
                            <View style={{                                
                                flexDirection: "row",
                                justifyContent: 'flex-start',
                                paddingVertical: 10
                            }}>
                                <Arrow width={30} height={30} fill={"#F3FAFF"} onPress={this.onGoBack.bind(this)} />
                                <Text style={{
                                    color: '#F3FAFF',
                                    fontSize: 20,
                                    paddingHorizontal: 20
                                }}>
                                    My Cart
                            </Text>
                            </View>
                            <View style={{
                                flexDirection: "column",
                                width: 150,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                padding: 20,
                                marginVertical: 40,
                                borderRadius: 10,
                                alignSelf: 'center',
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                }}>
                                    <Text style={{
                                        color: '#5D5D5D',
                                    }} >Total Cost </Text>
                                </View>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignSelf: 'center',
                                }}>
                                    <Icon5 name='euro-sign' style={{
                                        top: 1,
                                        color: 'black'
                                    }} />
                                    <Text style={{
                                        color: 'black',
                                    }} >{this.state.totalPrize} </Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{
                                fontFamily: "Helvetica, Arial, sans-serif",
                                fontSize: 15,
                                color: '#5D5D5D',
                                marginVertical: 10
                            }}> Review Orders</Text>
                        </View>
                        <View>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                            >
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.isShowMore ? this.state.showData : this.state.data}
                                    keyExtractor={(item, index) => item.title}
                                    renderItem={({ item: rowData }) => {
                                        return (
                                            <View style={styles.popularCategories}>
                                                <View style={{
                                                    flexDirection: "row",
                                                    marginBottom: 10
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
                                                                borderRadius: 3,
                                                                position: 'relative',
                                                                marginBottom: 3,
                                                                fontFamily: "Helvetica, Arial, sans-serif",
                                                                //fontStyle: 'oblique',
                                                                color: '#5D5D5D'
                                                            }} >N</Text>
                                                            <Text style={{
                                                                //backgroundColor: '#5D5D5D',
                                                                borderColor: '#5D5D5D',
                                                                borderWidth: 1,
                                                                borderRadius: 3,
                                                                position: 'relative',
                                                                fontFamily: "Helvetica, Arial, sans-serif",
                                                                //fontStyle: 'oblique',
                                                                color: '#5D5D5D'
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
                                                        flex: 1,
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        alignItems: 'flex-start',
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
                                                        <View style={{
                                                            justifyContent: 'space-between',
                                                            alignItems: 'flex-start',
                                                            width: 70,
                                                            flexDirection: "row"
                                                        }}>
                                                            <Icon5 name="comment-alt" size={20} />
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    }}
                                />
                                {this.state.isShowMore &&
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ textAlign: 'right' }} onPress={this.shownMore.bind(this)}>Show more</Text>
                                    </View>}
                            </ScrollView>
                            <View style={{
                                flexDirection: 'column'
                            }}>
                                <Text style={{
                                    marginVertical: 10
                                }}>Delivery Options</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around'
                                }}>
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <Icon5 name='concierge-bell' size={17} />
                                        <Text style={{
                                            marginHorizontal: 10
                                        }}>Dine-in</Text>
                                        <View style={{
                                            height: 20,
                                            width: 20,
                                            borderRadius: 10,
                                            borderWidth: 2,
                                            borderColor: '#DFCB99',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <View style={{
                                                height: 12,
                                                width: 12,
                                                borderRadius: 6,
                                                backgroundColor: '#EBB974',
                                            }} />
                                        </View>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <Icon5 name='shipping-fast' size={17} />
                                        <Text style={{
                                            marginHorizontal: 10
                                        }}>Take way</Text>
                                        <View style={{
                                            height: 20,
                                            width: 20,
                                            borderRadius: 10,
                                            borderWidth: 2,
                                            borderColor: '#D7D7D7',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}></View>
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                marginVertical: 10
                            }}>
                                <Text>Manage Cards</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        paddingVertical: 20,
                        backgroundColor: '#0E1E2E',
                        width: width, height: 75
                    }}>
                        <Text style={{
                            color: '#F3FAFF',
                            justifyContent: 'flex-start',
                            alignSelf: 'center'
                        }}>PLACE ORDER</Text>
                    </View>
                </View>
            </SafeAreaView >
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
        flexDirection: 'row'
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
export default CartScreen;
