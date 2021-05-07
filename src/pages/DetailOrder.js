import React, {Component} from 'react';
import { View, Text,  StyleSheet, ScrollView, Image, TouchableOpacity, Alert} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import Axios from 'axios'
import upload from './upload.png'


class DetailOrder extends Component{
  constructor(props) {
    super(props)
    let params = this.props.route.params
    this.state = {
      checked: "Vendor A",
      data : params ? params.data : null,
    }
  }

  getDataCust =  () => {
    let dataCustomer
    Axios.get('http://192.168.0.103:3000/customerData')
    .then(res => {
      console.log('res get data customer: ', res.data);
      dataCustomer=res.data
      this.setState({dataCustomer})
    })
    
  }

  componentDidMount(){
    this.getDataCust()
    console.log("params", this.props.route.params)
  }
  
  render() {
    const { navigation } = this.props
    const {checked} = this.state;
    const { data } = this.state
    const { dataCustomer } = this.state

    return (
      <ScrollView>
        <ThemeProvider>
              <View   style={{flex:1, backgroundColor:'#90EE90'}}>
                <View  style={styles.title_detail}>
                  <Text style={{textAlign:"center", fontSize:20}}>ORDER DETAIL</Text>
                </View>
                <View style={{backgroundColor:'#E0FFFF', width: 330, marginHorizontal: 15, marginTop: 5}}>
                  <Text>ID Order : {data && data.msoID}</Text>
                  <Text>No.telepon: {dataCustomer && dataCustomer.noTelp}</Text>
                  
                  <Text>Nama : {data && data.msoName}</Text>
                  <Text>Alamat Pengambilan: {dataCustomer && dataCustomer.orderFrom}</Text>
                  <Text>Tujuan Pengiriman: {dataCustomer && dataCustomer.orderTo}</Text>
                  <Text>Total Tagihan: {data && data.price}</Text>
                  <Text>Waktu Pemesanan: {data && data.msoDocDate}</Text>          
                </View>  
                <View style={styles.title_detail}>
                  <Text style={{textAlign:"center", fontSize:20}}>METODE PENGIRIMAN</Text>
                </View>
                <View style={{backgroundColor:'#E0FFFF', width: 330, marginHorizontal: 15, marginTop: 5}}>
                  <View style={{flex:1, flexDirection: 'column', alignItems:'center'}}>
                    <Text>Vendor A</Text>
                    <RadioButton
                      value="Vendor A"
                      status={ checked === 'Vendor A' ? 'checked' : 'unchecked' }
                      onPress={() => this.setState({ checked: 'Vendor A'})}
                    />
                    <Text>Vendor B</Text>
                    <RadioButton
                      value="Vendor B"
                      status={ checked === 'Vendor B' ? 'checked' : 'unchecked' }
                      onPress={()=> this.setState({ checked: 'Vendor B'})}
                    />
                    <Text>Vendor C</Text> 
                    <RadioButton
                      value="Vendor C"
                      status={ checked === 'Vendor C' ? 'checked' : 'unchecked' }
                      onPress={()=> this.setState({ checked: 'Vendor C'})}
                    />
                    <Text>Vendor D</Text>
                    <RadioButton
                      value="Vendor D"
                      status={ checked === 'Vendor D' ? 'checked' : 'unchecked' }
                      onPress={()=> this.setState({ checked: 'Vendor D'})}
                    />
                  </View>
                </View>
                <View style={styles.title_detail}>
                  <Text style={{textAlign:"center", fontSize:20}}>METODE PEMBAYARAN</Text>
                </View>
                <View style={{backgroundColor:'#E0FFFF', width: 330, marginHorizontal: 15, marginTop: 5}}>
                  <Text>Transfer Bank</Text>
                  <Text>No. Rekening : 123-4567890</Text>
                  <Text>Transfer sesuai total tagihan!</Text>
                  <TouchableOpacity style={styles.button_order} onPress={() => Alert.alert ('Upload file','Pilih file')}>
                    <Image source={ upload } style={{width:50, height:50, marginHorizontal:130, marginVertical: 10}} />
                  </TouchableOpacity>
                  <Text style={{textAlign:'center'}}>Tambahkan file bukti transfer (jpg/png/pdf)</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', padding: 20, margin: 20, justifyContent:'space-between' }}>
                  <Button title={'SEND'} onPress={() => Alert.alert ('Order Terkirim')} 
                    value={data && data.status} onChangeText={(value) => {this.setState({status: 'Paid'})}}
                  />
                  <Button title="CANCEL" onPress={() => navigation.navigate('Menu')} />
                </View>       
          </View>
        </ThemeProvider>
      </ScrollView>
    );
  }
};

export default DetailOrder 

const styles = StyleSheet.create({
  title_detail:{
    backgroundColor:'#66CDAA', 
    marginTop:5, 
    borderRadius: 10, 
    width:330, 
    marginHorizontal:15
  }
})
