console.disableYellowBox = true;
import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TextInput, TouchableHighlight, DatePickerIOS, Picker, Item } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { addNewTransaction } from '../actions';
import { Button, CardSection, Card } from './common';
import MyDatePicker from './DatePicker';

class AddNewSubcategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerValues: '',
            subcategory: '',
            subcategory_id: '',
            description: '',
            location: '',
            amount: '',
            showPicker: false,
            subcategorySelected: false,
        }
    }

    updateAmount(text) {
        this.setState({ amount: text })
    }

    updateLocation(text) {
        this.setState({ location: text })
    }

    updateDescription(text) {
        this.setState({ description: text })
    }

    addNewClick() {
        let token = this.props.token;
        let date = this.props.date;
        if (this.props.date === '') {
            let today = new Date;
            let date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear(); 
        } else {
            date = this.props.date;
        }
        let subcategory_id = this.state.subcategory_id;
        let description = this.state.description;
        let location = this.state.location;
        let amount = this.state.amount;
        this.props.addNewTransaction(token, date, subcategory_id, description, location, amount);
    }

    onValueChange(subcategorySomething) {
        let subcategoryName = subcategorySomething.split('::')[0];
        let subcategory_id = subcategorySomething.split('::')[1];
        this.setState({
            pickerValues: subcategorySomething,
            subcategory_id: subcategory_id,
            subcategory: subcategoryName,
        });
    };

    showPicker() {
        this.setState({ showPicker: true });
    }

    hidePicker() {
        this.setState({
            showPicker: false,
            subcategorySelected: true,
        });
    }

    buildPickerList(){
        let itemList = this.props.expenses.expenses.map(category => {
            let categoryName = Object.keys(category)[0];
            let arrSubcategories = category[categoryName].subcategories;
            return arrSubcategories.map(objSubcategory => {
                let subcategoryName = Object.keys(objSubcategory)[0];
                let subcategoryId = objSubcategory[subcategoryName].id;
                    return (<Item label={subcategoryName} value={subcategoryName +'::' + subcategoryId} />);
                })
            })
        return itemList;
    }

    render() {
        return (
            <View style={styles.intro}>
                <Image source={require('./Resources/piggy-bank.png')} style={styles.icon} />
                <Text style={styles.headerText}>Add New Transaction {this.props.categorySelected}</Text>
                    <MyDatePicker />

                    {this.state.showPicker ?
                        <View>
                        <Picker
                          style={{ width: 200 }}
                          selectedValue={this.state.pickerValues}
                          onValueChange={this.onValueChange.bind(this)}>
                          {this.buildPickerList()}
                        </Picker>
                        <Text style={styles.done} onPress={this.hidePicker.bind(this)}>Done</Text>
                        </View>
                        :

                        this.state.subcategorySelected ?
                        <Text
                            style={styles.subcategorySelected}
                            onPress={this.showPicker.bind(this)}>{this.state.subcategory}</Text> :

                        <Text
                            style={styles.subcategory}
                            onPress={this.showPicker.bind(this)}>Subcategory</Text>

                    }

                    <TextInput
                        style={styles.input}
                        placeholder='Merchant Description'
                        onChangeText={text => this.updateDescription(text)}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        value={this.state.description} />
                    <TextInput
                        style={styles.input}
                        placeholder='Location (leave blank if none)'
                        onChangeText={text => this.updateLocation(text)}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        value={this.state.merchant} />
                    <TextInput
                        style={styles.input}
                        placeholder='Amount'
                        onChangeText={text => this.updateAmount(text)}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        keyboardType='numeric'
                        value={this.state.amount} />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={this.addNewClick.bind(this)}
                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableHighlight>

            </View>
        )
    }
}
const styles = {
    done: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#42f4bf',
        fontFamily: 'Avenir',
        color: '#42f4bf',
        fontSize: 16,
        height: 45,
    },
    subcategory: {
        fontFamily: 'Avenir',
        height: 45,
        paddingLeft: 12,
        padding: 12,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#42f4bf',
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        color: '#C7C7CD'
    },
    subcategorySelected: {
        fontFamily: 'Avenir',
        height: 45,
        paddingLeft: 12,
        padding: 12,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#42f4bf',
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center',
        color: 'black'
    },
    intro: {
        marginTop: 25,
        alignItems: 'center',
        fontFamily: 'Avenir',
        padding: 30,
        alignItems: 'center'
    },
    icon: {
        width: 40,
        height: 40,
    },
    headerText: {
        marginTop: 30,
        marginBottom: 30,
        fontFamily: 'Avenir',
    },
    input: {
        fontFamily: 'Avenir',
        height: 45,
        paddingLeft: 12,
        padding: 4,
        marginBottom: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#42f4bf',
        borderRadius: 8,
        color: 'black',
    },
    button: {
        height: 45,
        backgroundColor: '#42f4bf',
        borderColor: '#42f4bf',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Avenir',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.user.token,
        date: state.expenses.transactionDate,
        expenses: state.expenses
    };
};

export default connect(mapStateToProps, { addNewTransaction })(AddNewSubcategory);