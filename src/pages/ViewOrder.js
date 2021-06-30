import React, {Component} from 'react';
import { View, Text,  ScrollView} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
 
class ViewOrder extends Component{
    constructor(props) {
      super(props)
      let params = this.props.route.params
      this.state = {
          data : params ? params.data : null
      }
    }
  
    componentDidMount(){
        //this.getData()
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
                            <Text> {data && data.customerID}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>NAMA CUSTOMER</Text>
                        <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                            <Text> {data && data.customerName}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>NOMOR TELEPON</Text>
                        <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                            <Text> {data && data.noTelp}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>ALAMAT ASAL</Text>
                        <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                            <Text> {data && data.alamatAsal}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>ALAMAT TUJUAN</Text>
                        <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                            <Text> {data && data.alamatTujuan}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>KIMAP</Text>
                        <View style={{height:30, backgroundColor:'#E0FFFF'}}>
                            <Text>{data && data.materialKIMAP}</Text>                           
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>MATERIAL NAME</Text>
                        <View style={{height:30, backgroundColor:'#E0FFFF'}}>
                            <Text>{data && data.materialName}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>UOM</Text>
                        <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                            <Text> {data && data.materialUoM}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>TYPE</Text>
                        <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                            <Text>{data && data.materialType}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>DESCRIPTION</Text>
                        <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                            <Text> {data && data.materialDesc}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>Quantity</Text>
                        <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                            <Text>{data && data.orderQty}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>DATE</Text>
                        <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                            <Text>{data && data.orderDate}</Text>
                        </View>
                    </View>
                    
                    <View style={{ flex: 1, flexDirection: 'row', padding: 20, justifyContent:'space-between' }}>
                            <Button title={'ORDER PAYMENT'} 
                                //onPress={() => navigation.navigate('OrderPayment')} 
                                onPress={() => this.props.navigation.navigate('DetailOrder',{data})}
                            />
                            <Button title={'CANCEL'} onPress={() => navigation.goBack()} />
                    </View>
                   
                </View>
            </ThemeProvider>
            </ScrollView>
        );
    }
};

export default ViewOrder
