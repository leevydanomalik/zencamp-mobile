import React, {Component} from 'react';
import { View, Text,  ScrollView, TextInput} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import Axios from 'axios';

const payload = {
    "alamatAsal": "",
    "alamatTujuan": "",
    "customerID": "",
    "customerName": "",
    "materialDesc": "",
    "materialKIMAP": "",
    "materialName": "",
    "materialPrice": "",
    "materialType": "",
    "materialUoM": "",
    "noTelp": "",
    "orderDate": "",
    "orderQty": "",
    "requestBy": "",
    "requestDate": ""
  }

class Edit extends Component{
    constructor(props) {
      super(props)
      let params = this.props.route.params
      this.state = {
          data : params ? params.data : null
      }
    }

    updateData = () =>{
        const {data, params} = this.state
        const {customerID, customerName, alamatAsal, alamatTujuan, orderQty, noTelp, orderDate, materialKIMAP, materialName,
            materialDesc, materialType, materialUoM, materialPrice} = data

        const dataUpdate ={
            ...payload,
            ...params,
            customerID: customerID,
            customerName: customerName,
            alamatAsal: alamatAsal,
            alamatTujuan: alamatTujuan,
            orderQty: orderQty,
            noTelp: noTelp,
            materialKIMAP: materialKIMAP,
            materialName: materialName,
            materialDesc: materialDesc,
            materialType: materialType,
            materialUoM: materialUoM,
            materialPrice: materialPrice,
            orderDate: orderDate
        }
        console.log('data before update: ', JSON.stringify(dataUpdate));
        Axios.put('http://192.168.43.173:60040/update.orderCustomer', dataUpdate, {headers:{
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(res=>{
            console.log('res: ', res.data);
            this.props.navigation.goBack()
        })
    }

    componentDidMount(){
        console.log("params", this.props.route.params)
        //this.updateData()
    }

    render() {
      const { navigation } = this.props
      const { data } = this.state 
      const {customerID, customerName, alamatAsal, alamatTujuan, orderQty, noTelp, orderDate, materialKIMAP, materialName,
        materialDesc, materialType, materialUoM, materialPrice} = data

        return (
            <ScrollView>
                <ThemeProvider>
                    <View style={{flex:1, backgroundColor:'#90EE90'}}>
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
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>KIMAP</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={materialKIMAP} onChangeText={(value) => {this.setState({materialKIMAP: value})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>NAME</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={materialName} onChangeText={(value) => {this.setState({materialName: value})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>UOM</Text>
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
                            <Text style={{fontSize:14, color:'black'}}>QUANTITY</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF', flex: 1, flexDirection: 'row',}}>
                                <TextInput style={{fontSize:12}} value={orderQty.toString()} onChangeText={(value) => {this.setState({data: {...this.state.data, orderQty: value}})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>ORDER DATE</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={orderDate} onChangeText={(value) => {this.setState({data: {...this.state.data, orderDate: value}})}}/>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', padding: 20, justifyContent:'space-between' }}>
                            <Button title={'SAVE'} onPress= {() => this.updateData() } />
                            <Button title={'CANCEL'} onPress={() => navigation.goBack()} />
                        </View>
                    </View>
                </ThemeProvider>
            </ScrollView>
        );
    }
};

export default Edit
