import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import {  ThemeProvider } from 'react-native-elements';
import Axios from 'axios'
import Feather from 'react-native-vector-icons/Feather';


class OrderHistory extends Component{
    constructor(){
        super()
        this.state = {dataOrder: []}
        
    }
    
    getData = async() => {
        let payload = {
            "limit": 5,
            "offset": 0,
            "params": {}
        }
        console.log(payload)
        const res = await Axios.post('http://192.168.43.173:60040/get.orderCustomer.all', payload, {headers:{
            
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }})    
        console.log('res: ', res.data.data);
        let data = res.data.data
        console.log('get list history: ', JSON.stringify(data))
        this.setState({dataOrder:data})   
    }

    deleteData = async(customerID) =>{
        let payload = { 
            "referenceID": customerID,
            "requestBy": "SYSTEM",
            "requestDate": "01-01-2021 09:09:09"          
        }
        console.log(payload)
        const res = await Axios.delete('http://192.168.0.109:60040/delete.orderCustomer', {
            headers:{
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiJ9.5BG9SEVOGo_xRhtT8IkyoSy60kPg8HM9Vpvb0TdNew4',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }, data:payload
        }) 
        this.getData()
        
        console.log(res.data.data)
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        const { navigation } = this.props
        const { dataOrder } = this.state
        console.log(dataOrder)
  
        return(
            <ScrollView>
                <ThemeProvider>
                    <View style={{flex:1, backgroundColor:'#90EE90'}}>
                    <View style={{padding: 20}}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateOrderMaterialWMS', {
                                refreshData: ()=>{this.getData()}
                            })}>
                                <Text style={styles.button_text}>CREATE NEW ORDER</Text>
                            </TouchableOpacity>
                        </View>
                        {dataOrder && dataOrder.map((data, index)=> {
                            return(
                                <View key={index} style={{ flex:1, flexDirection: 'row', padding: 10, margin: 10, backgroundColor: '#fff' }}>
                                    <View>
                                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                                                <Text style={{width: 80}}>ID Order</Text>
                                                <Text>: {data && data.customerID}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                                                <Text style={{width: 80}}>KIMAP</Text>
                                                <Text>: {data && data.materialKIMAP}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                                            <Text style={{width: 80}}>Quantity</Text>
                                            <Text style={{flex:1}}>: {data && data.orderQty}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                                            <Text style={{width: 80}}>Date</Text>
                                            <Text>: {data && data.orderDate}</Text>
                                        </View>
                                    </View>
                                    <View style={{ justifyContent:'space-evenly'}}>
                                        <TouchableOpacity style={styles.button_order} 
                                            //onPress={() => navigation.navigate('ViewOrder')}
                                            onPress={() => this.props.navigation.navigate('ViewOrder',{data})}
                                        >
                                            <Text style={styles.button_text_order}>View</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button_order} 
                                            //onPress={() => navigation.navigate('FormEdit')}
                                            onPress={() => this.props.navigation.navigate('Edit',{data})}
                                        >
                                            <Text style={styles.button_text_order}>Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button_order} 
                                            onPress={() => Alert.alert(
                                                'Warning!',
                                                'Are you sure to remove this data?',[{
                                                    text:'No',
                                                    onPress: () => console.log('')
                                                    },
                                                    {
                                                    text: 'Yes',
                                                        onPress:()=>this.deleteData(data.customerID)
                                                    }
                                                ]
                                            )}
                                        >
                                            <Text style={styles.button_text_order}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>    
                                </View>
                            )
                        })}
                        
                    </View>
                </ThemeProvider>
            </ScrollView>
        )
    }
}

export default OrderHistory

const styles = StyleSheet.create({
    button: {
      borderRadius: 5,
      padding: 10,
      paddingBottom: 15,
      paddingTop: 15,
      backgroundColor: '#40a8c4',
      color: '#fff',
      alignItems: 'center',
      elevation: 2
  },
  button_text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff'
  },
  button_order: {
    marginLeft: 30,
    borderRadius: 5,
    width:80,
    alignItems: 'center',
    color: '#fff', 
    padding: 10, 
    paddingBottom:15, 
    paddingTop:15 ,
    backgroundColor: '#40a8a3'
  },
  button_text_order: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff'
  }
}
)