import React, { Component } from 'react';
import { View, Text,  ScrollView , TextInput} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import Axios from 'axios'
//import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';


 const payload = {
    "msoCreationalDTO": {
      "createdBy": "",
      "createdDate": "",
      "modifiedBy": "",
      "modifiedDate": ""
    },
    "msoDesc": "",
    "msoDocDate": "",
    "msoID": new Date().getTime(),
    "msoMaterials": [
      {
        "matName": "",
        "msActualQty": 0,
        "msDesc": "",
        "msID": "",
        "msKIMAP": "",
        "msMatSuggestedQry": 0,
        "msName": "",
        "msStatus": "",
        "msType": "",
        "msUOM": ""
      }
    ],
    "msoName": "",
    "msoPeriod": "",
    "msoStatus": "",
    "msoType": ""
  }

class CreateOrderMaterialWMS extends Component{
    constructor(props) {
      super(props)
      this.state = { 
          kimap:'',
          data: {...payload}, 
          dataMaterial : [
            {label: 'A276102625', value: 'A276102625', uom: 'Box', name: 'Mesran SPR',description: '', price: 50000},   
          ],
          material:{
            "matName": "",
            "msActualQty": 50,
            "msDesc": "",
            "msID": "",
            "msKIMAP": "",
            "msMatSuggestedQry": 0,
            "msName": "",
            "msStatus": "",
            "msType": "",
            "msUOM": ""
          }
      }
    }

    submitData = () =>{
        const {data, material} = this.state
        const {msoDesc, msoDocDate, msoID, msoName, msoStatus, msoType, msoPeriod } = data

        const dataBaru = {
            ...payload,
            msoDesc: msoDesc,
            msoName: msoName,
            msoStatus: msoStatus,
            msoType:msoType,
            msoPeriod:msoPeriod,
            msoID:msoID, 
            msoMaterials:[
               material
            ],
            msoDocDate:msoDocDate,
        }
        console.log('data before send: ', JSON.stringify(dataBaru));
        Axios.post('https://patlog.bitozenia.com/material/post.mso', dataBaru, {headers:{
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})
        .then(res =>{
            console.log('res: ', res.data);
            this.props.navigation.goBack()
            this.props.refreshData()
            //this.props.navigation.state.params.refreshData( )
        })
    }

    getDataMaterial = async() => {
        let payload = {
            "limit": 3,
            "offset": 0,
            "params": {}
        }
        console.log(payload)
        const res = await Axios.post('https://patlog.bitozenia.com/material/get.material.all', payload, {headers:{
            
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})
        
            console.log('res: ', res.data.data);
            let data = res.data.data
            let newPayload = data.map((value, index) => {
                return {
                    label: value.materialKimap, 
                    value: value.materialKimap, 
                    uom: value.materialUoM.value, 
                    name: value.materialName, 
                    description: value.materialDescription, 
                    price: 50000}
            
            })
            this.setState({dataMaterial:newPayload})
            console.log(newPayload)
    }

    onChange(item){
        const baru = {
            ...this.state.material,
            msKIMAP:item.label,
            msUOM:item.uom,
            matName: item.name,
            msDesc: item.description,
            price:item.price
        }
        this.setState(
            {
                material:{
                    ...this.state.material,
                    msKIMAP:item.label,
                    msUOM:item.uom,
                    matName: item.name,
                    msDesc: item.description,
                    price:item.price
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
      const {data, material} = this.state
      const {msoDesc, msoDocDate, msoID, msoName, msoStatus, msoType, msActualQty} = data
      //const {msActualQty} = material

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
                                    items={this.state.dataMaterial}
                                    defaultValue={this.state.kimap}
                                    style={{backgroundColor: '#E0FFFF'}}
                                    itemStyle={{justifyContent: 'flex-start'}}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={item=> this.onChange(
                                        item
                                    )}
                                />  
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>ID</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={msoID} onChangeText={(value) => {this.setState({data: {...this.state.data, msoID: value}})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>CUSTOMER NAME</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={msoName} onChangeText={(value) => {this.setState({data: {...this.state.data, msoName: value}})}}/>
                            </View>
                        </View>
                        {/*<View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>NAME</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={matName} onChangeText={(value) => {this.setState({matName: value})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>UoM</Text>
                            <View style={{ height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={msUOM} onChangeText={(value) => {this.setState({msUOM: value})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>QTY</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                                <TextInput style={{fontSize:12}} value={msActualQty} onChangeText={(value) => {this.setState({...this.state.data, msActualQty: value})}}/>
                            </View>
                        </View>*/}
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>DESCRIPTION</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF', flex: 1, flexDirection: 'row',}}>
                                <TextInput style={{fontSize:12}} value={msoDesc} onChangeText={(value) => {this.setState({data: {...this.state.data, msoDesc: value}})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>DATE</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF', flex: 1, flexDirection: 'row',}}>
                                <TextInput style={{fontSize:12}} value={msoDocDate} onChangeText={(value) => {this.setState({data: {...this.state.data, msoDocDate: value}})}}/>
                            </View>
                        </View>
                        {/*<View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>TYPE</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF', flex: 1, flexDirection: 'row',}}>
                                <TextInput style={{fontSize:12}} value={msoType} onChangeText={(value) => {this.setState({data: {...this.state.data, msoType: value}})}}/>
                            </View>
                        </View>
                        <View style={{marginHorizontal: 20}}>
                            <Text style={{fontSize:14, color:'black'}}>STATUS</Text>
                            <View style={{height:40, backgroundColor:'#E0FFFF', flex: 1, flexDirection: 'row',}}>
                                <TextInput style={{fontSize:12}} value={msoStatus} onChangeText={(value) => {this.setState({data: {...this.state.data, msoStatus: value}})}}/>
                            </View>
                        </View>*/}
                        
                        
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
