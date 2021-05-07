import React, { Component } from 'react';
import { View, Text,  ScrollView , TextInput} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import Axios from 'axios'
//import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

class CreateOrder extends Component{
    constructor(props) {
      super(props)
      this.state = {
          id: "",
          kimap: "",
          name: "",
          uom: "",
          qty: "",
          description: "",
          date: "",
          status: "",
          price: ""
      }
    }

    submitData = () =>{
        const {id,kimap, name, uom, qty, description, date, status, price} = this.state
        const data = {
            id,
            kimap,
            name,
            uom,
            qty,
            description,
            date,
            status,
            price
        }
        console.log('data before send: ', data);
        Axios.post('http://192.168.0.103:3000/orderCustomer', data)
        .then(res =>{
            console.log('res: ', res);
            this.props.navigation.goBack()
            //this.props.refreshData()
            this.props.navigation.state.params.refreshData( )
        })
    }

    render() {
      const { navigation } = this.props
      const {id, kimap, name, uom, qty, description, date, status, price} = this.state
    
      return (
        <ScrollView>
            <ThemeProvider>
                <View style={{backgroundColor:'#66CDAA'}}>
                    <Text style={{textAlign:"center", fontSize:25}}>Form Create Order</Text>
                </View>
                <View style={{flex:1, backgroundColor:'#90EE90',}}>
                        
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>KIMAP</Text> 
                                <DropDownPicker
                                    placeholder="Select the KIMAP"
                                    items={[
                                        {label: 'A276102625', value: 'A276102625', uom: 'Box', name: 'Mesran SPR', price: 50000},
                                        {label: 'A072101645', value: 'A072101645', uom:'PL', name: 'Fastron Gold', price: 69000},
                                        {label: 'A076102545', value: 'A076102545', uom: 'Drum', name: 'Mesrania2t OB', price: 120000}
                                    ]}
                                    defaultValue={this.state.kimap}
                                    style={{backgroundColor: '#E0FFFF'}}
                                    itemStyle={{justifyContent: 'flex-start'}}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item=> this.setState({
                                        kimap:item.value,
                                        uom:item.uom,
                                        name: item.name,
                                        price:item.price
                                    })}
                                />  
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>NAME</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={name} onChangeText={(value) => {this.setState({name: value})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>UoM</Text>
                            <View style={{ height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={uom} onChangeText={(value) => {this.setState({uom: value})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>QTY</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={qty} onChangeText={(value) => {this.setState({qty: value})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>DESCRIPTION</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF', flex: 1, flexDirection: 'row',}}>
                                <TextInput style={{fontSize:12}} value={description} onChangeText={(value) => {this.setState({description: value})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>DATE</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF', flex: 1, flexDirection: 'row',}}>
                                <TextInput style={{fontSize:12}} value={date} onChangeText={(value) => {this.setState({date: value})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>STATUS</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF', flex: 1, flexDirection: 'row',}}>
                                <TextInput style={{fontSize:12}} value={status} onChangeText={(value) => {this.setState({status: value})}}/>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', padding: 20, justifyContent:'space-between' }}>
                            <Button title={'CREATE'} onPress= {() => this.submitData() } />
                            <Button title="CANCEL" onPress={() => navigation.goBack()} />
                        </View>
                </View>
            </ThemeProvider>
        </ScrollView>
        );
    }
};

export default CreateOrder
