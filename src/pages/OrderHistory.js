import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import {  ThemeProvider } from 'react-native-elements';
import Axios from 'axios'

class OrderHistory extends Component{
    constructor(){
        super()
        this.state = {}
    }

    getData = () =>{
        let dataOrder=[]
        Axios.get('http://192.168.0.103:3000/orderCustomer')
        .then(res =>{
            console.log('res get data: ', res.data);
            dataOrder=res.data
            this.setState({dataOrder})
        })
    }

    deleteData = (id) =>{
        console.log(id)
        Axios.delete(`http://192.168.0.103:3000/orderCustomer/${id}`)
        .then(res =>{
            console.log('res delete data: ', res );
            this.getData();
        })
    }

    componentDidMount(){
        this.getData()
    }

    render(){
        const { navigation } = this.props
        const { dataOrder } = this.state
  
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
                        {dataOrder && dataOrder.map((data,index) => {
                            return(
                                <View key={index} style={{ flex:1, flexDirection: 'row', padding: 10, margin: 10, backgroundColor: '#fff' }}>
                                    <View>
                                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                                            <Text style={{width: 80}}>ID Order</Text>
                                            <Text>: {data && data.id}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                                            <Text style={{width: 80}}>KIMAP</Text>
                                            <Text>: {data && data.kimap}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                                            <Text style={{width: 80}}>Name</Text>
                                            <Text>: {data && data.name}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                                            <Text style={{width: 80}}>UoM</Text>
                                            <Text>: {data && data.uom}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 5}}>
                                            <Text style={{width: 80}}>Qty</Text>
                                            <Text>: {data && data.qty}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{width: 80}}>Description</Text>
                                            <Text>: {data && data.description}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{width: 80}}>Date</Text>
                                            <Text>: {data && data.date}</Text>
                                        </View>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={{width: 80}}>Status</Text>
                                            <Text>: {data && data.status}</Text>
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
                                            onPress={() => this.props.navigation.navigate('FormEdit',{data})}
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
                                                        onPress:()=>this.deleteData(data.id)
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