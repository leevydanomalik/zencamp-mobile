import React, {Component} from 'react';
import { View, Text,  ScrollView} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';

const payload = {
        "msoCreationalDTO": {
          "createdBy": "",
          "createdDate": "",
          "modifiedBy": "",
          "modifiedDate": ""
        },
        "msoDesc": "",
        "msoDocDate": "",
        "msoID": "",
        "msoMaterials": [
          {
            "matName": "",
            "msActualQty": "",
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

class FormEdit extends Component{
    constructor(props) {
      super(props)
      let params = this.props.route.params
      this.state = {
          data : params ? params.data : null
      }
    }
    updateData = () =>{
        const data = this.state
        const {msoDesc, msoDocDate, msoID, msoName, msoStatus, msoType, msoPeriod } = data

        const dataUpdate ={
            ...payload,
            msoDesc: msoDesc,
            msoName: msoName,
            msoStatus: msoStatus,
            msoType:msoType,
            msoPeriod:msoPeriod,
            msoID:msoID, 
            msoDocDate:msoDocDate,
        }
        console.log('data before update: ', JSON.stringify(params));
        Axios.put('https://patlog.bitozenia.com/material/update.mso', dataUpdate, {headers:{
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})
    }    

    componentDidMount(){
        console.log("params", this.props.route.params)
    }

    render() {
      const { navigation } = this.props
      const { data } = this.state 
      

        return (
            <ScrollView>
                <ThemeProvider>
                            <View style={{flex:1, backgroundColor:'#90EE90'}}>
                                <View style={{marginHorizontal: 20, marginTop: 20}}>
                                    <Text style={{fontSize:14, color:'black'}}>ID ORDER</Text>
                                    <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                                        <Text> {data && data.msoID}</Text>
                                        <TextInput style={{fontSize:12}} value={msoID} onChangeText={(value) => {this.setState({data: {...this.state.data, msoID: value}})}}/>
                            
                                    </View>
                                </View>
                                <View style={{marginHorizontal: 20}}>
                                    <Text style={{fontSize:14, color:'black'}}>KIMAP</Text>
                                    <View style={{height:30, backgroundColor:'#E0FFFF'}}>
                                        <Text>{data && data.msoMaterials[0].msKIMAP}</Text>
                                        <TextInput style={{fontSize:12}} value={msoName} onChangeText={(value) => {this.setState({data: {...this.state.data, msoName: value}})}}/>
                                                       
                                    </View>
                                </View>
                                <View style={{marginHorizontal: 20}}>
                                    <Text style={{fontSize:14, color:'black'}}>NAME</Text>
                                    <View style={{height:30, backgroundColor:'#E0FFFF'}}>
                                        <Text>{data && data.msoMaterials[0].matName}</Text>
                                    </View>
                                </View>
                                <View style={{marginHorizontal: 20}}>
                                    <Text style={{fontSize:14, color:'black'}}>QTY</Text>
                                    <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                                        <Text> {data && data.msoMaterials[0].msAqtualQty}</Text>
                                    </View>
                                </View>
                                <View style={{marginHorizontal: 20}}>
                                    <Text style={{fontSize:14, color:'black'}}>DESCRIPTION</Text>
                                    <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                                        <Text> {data && data.msoDesc}</Text>
                                    </View>
                                </View>
                                <View style={{marginHorizontal: 20}}>
                                    <Text style={{fontSize:14, color:'black'}}>DATE</Text>
                                    <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                                        <Text>{data && data.msoDocDate}</Text>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', padding: 20, justifyContent:'space-between' }}>
                                    <Button title={'ORDER PAYMENT'} 
                                        //onPress={() => navigation.navigate('OrderPayment')} 
                                        onPress={() => this.props.navigation.navigate('OrderPayment',{data})}
                                    />
                                    <Button title={'CANCEL'} onPress={() => navigation.goBack()} />
                                </View>
                            </View>
                </ThemeProvider>
            </ScrollView>
        );
    }
};

export default FormEdit
