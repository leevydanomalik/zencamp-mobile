import React, { Component } from 'react';
import { View, Text,  ScrollView , TextInput, StyleSheet} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import Axios from 'axios'
//import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

const payload = {
        "alamatAsal": "",
        "alamatTujuan": "",
        "customerCreationalDTO": {
          "createdBy": "",
          "createdDate": "",
          "modifiedBy": "",
          "modifiedDate": ""
        },
        "customerID": new Date().getTime(),
        "customerName": "",
        "materialDesc": "",
        "materialKIMAP": "",
        "materialName": "",
        "materialPrice": "",
        "materialType": "",
        "materialUoM": "",
        "noTelp": "",
        "orderDate": "",
        "orderQty": ""      
}

class CreateOrderMaterialWMS extends Component{
    constructor(props) {
      super(props)
      this.state = { 
          data: {...payload}, 
          dataMaterial : [
            {label: '', value: '', materialUoM: ' ', materialName: ' ',materialType: '',materialDesc:'', materialPrice:'' },   
          ],
          material:{
            "materialName": "",
            "materialKIMAP": "",
            "materialUoM": "",
            "materialType": "",
            "materialDesc": "",
            "materialPrice": ""
          },
          
      }
    }

    submitData = () => {
        const {data, material} = this.state
        const {customerID, customerName, alamatAsal, alamatTujuan, orderQty, noTelp, orderDate, materialKIMAP, materialName,
        materialDesc, materialType, materialUoM, materialPrice} = data

        const dataBaru = {
            ...payload,
            customerID: customerID,
            customerName: customerName,
            alamatAsal: alamatAsal,
            alamatTujuan: alamatTujuan,
            orderQty: orderQty,
            noTelp: noTelp,
            //material:{...material},
            materialKIMAP: material.materialKIMAP,
            materialName: material.materialName,
            materialDesc: material.materialDesc,
            materialType: material.materialType,
            materialUoM: material.materialUoM,
            materialPrice: material.materialPrice,
            orderDate: orderDate
        }

        console.log('data before send: ', JSON.stringify(dataBaru));
        Axios.post('http://192.168.43.173:60040/post.orderCustomer', dataBaru, {
            headers:{
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        .then(res=>{
            console.log('res: ', res.data);
            this.props.navigation.goBack()
            //this.props.refreshData()
        })
    }

    getDataMaterial = async() => {
        let payload = {
            "limit": 5,
            "offset": 0,
            "params": {}
        }
        console.log(payload)
        const res = await Axios.post('http://192.168.43.173:60040/get.material.all', payload, {
            headers:{
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log('res: ', res.data.data);
        let data = res.data.data
        let newPayload = data.map((value, index) => {
                return {
                    label: value.materialKIMAP, 
                    value: value.materialKIMAP, 
                    materialName: value.materialName, 
                    materialUoM: value.materialUoM, 
                    materialDesc: value.materialDesc, 
                    materialType: value.materialType,
                    materialPrice: value.materialPrice
                    
                }
        })
        this.setState({dataMaterial:newPayload})
        console.log(newPayload)
    }

    onChange(item){
        const baru = {
            ...this.state.material,
            materialKIMAP:item.label,
            materialUoM:item.materialUoM,
            materialName: item.materialName,
            materialDesc: item.materialDesc,
            materialType: item.materialType,
            materialPrice: item.materialPrice
            
        }
        this.setState(
            {
                material:{
                    ...this.state.material,
                    materialKIMAP:item.label,
                    materialUoM:item.materialUoM,
                    materialName: item.materialName,
                    materialDesc: item.materialDesc,
                    materialType: item.materialType,
                    materialPrice: item.materialPrice
                }
            }
        )
        console.log(baru)
    }

    componentDidMount(){
        this.getDataMaterial()
    }

    render() {
      const { navigation } = this.props
      const {material } = this.state
      const {data} = this.state
      const {materialName, materialDesc, materialType, materialUoM, materialPrice} = material
      const {customerID, customerName, orderQty, alamatAsal, alamatTujuan, noTelp, orderDate} = data
      
      return (
        <ScrollView>
            <ThemeProvider>
                {/*<View style={{backgroundColor:'#666DAA'}}>
                    <Text style={{textAlign:"center", fontSize:25}}>Form Create Order</Text>
                </View>*/}
                <View style={{flex:1, backgroundColor:'#90EE90',}}>
                    <View  style={styles.title_detail}>
                        <Text style={{textAlign:"center", fontSize:20}}>CUSTOMER DETAIL</Text>
                    </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>ID CUSTOMER</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={customerID} onChangeText={(value) => {this.setState({data: {...this.state.data, customerID: value}})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>CUSTOMER NAME</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={customerName} onChangeText={(value) => {this.setState({data: {...this.state.data, customerName: value}})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>NOMOR TELEPON</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={noTelp} onChangeText={(value) => {this.setState({data: {...this.state.data, noTelp: value}})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>ALAMAT ASAL</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={alamatAsal} onChangeText={(value) => {this.setState({data: {...this.state.data, alamatAsal: value}})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>ALAMAT TUJUAN</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={alamatTujuan} onChangeText={(value) => {this.setState({data: {...this.state.data, alamatTujuan: value}})}}/>
                            </View>
                        </View>

                    <View  style={styles.title_detail}>
                        <Text style={{textAlign:"center", fontSize:20}}>ORDER DETAIL</Text>
                    </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>KIMAP</Text> 
                                <DropDownPicker
                                    placeholder="Select the KIMAP"
                                    items={this.state.dataMaterial}
                                    defaultValue={this.state.materialKIMAP}
                                    style={{backgroundColor: '#E0FFFF'}}
                                    itemStyle={{justifyContent: 'flex-start'}}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item=> this.onChange(
                                        item
                                    )}
                                />  
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>NAME</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={materialName} onChangeText={(value) => {this.setState({materialName: value})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>UoM</Text>
                            <View style={{ height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={materialUoM} onChangeText={(value) => {this.setState({data: {...this.state.data, materialUoM: value}})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>TYPE</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF', flex: 1, flexDirection: 'row',}}>
                                <TextInput style={{fontSize:12}} value={materialType} onChangeText={(value) => {this.setState({data: {...this.state.data, materialType: value}})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>DESCRIPTION</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF', flex: 1, flexDirection: 'row',}}>
                                <TextInput style={{fontSize:12}} value={materialDesc} onChangeText={(value) => {this.setState({data: {...this.state.data, materialDesc: value}})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>QTY</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={orderQty} onChangeText={(value) => {this.setState({data: {...this.state.data, orderQty: value}})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>ORDER DATE</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={orderDate} onChangeText={(value) => {this.setState({data: {...this.state.data, orderDate: value}})}}/>
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

export default CreateOrderMaterialWMS

const styles = StyleSheet.create({
    title_detail:{
      backgroundColor:'#66CDAA', 
      marginTop:5, 
      borderRadius: 10, 
      width:330, 
      marginHorizontal:15
    }
  })
