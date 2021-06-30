import React, {Component} from 'react';
import { View, Text,  ScrollView , TextInput} from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import Axios from 'axios'

class OrderPayment extends Component{
  constructor(props) {
    super(props)
    let params = this.props.route.params
    this.state = {
      name:"",
      orderFrom:"",
      orderTo:"",
      noTelp:"",
      data : params ? params.data : null,
    }
  }

  componentDidMount(){
    console.log("params", this.props.route.params)
  }

  submitDataCust =()=>{
    const{name, orderFrom, orderTo, noTelp} = this.state
    const data = {
      name, orderFrom, orderTo, noTelp
    }

    console.log('data before send: ', data)
    Axios.post('http://192.168.43.173:3000/customerData', data)
        .then(res =>{
            console.log('res: ', res);
            // this.props.navigation.goBack()
            this.props.refreshData()
            //this.props.navigation.state.params.refreshData( )
        }
      )
  }

  render() {
    const { navigation } = this.props
    const {name, orderFrom, orderTo, noTelp} = this.state
    const { data } = this.state

    return (
      <ScrollView>
        <ThemeProvider>
          <View style={{flex:1, backgroundColor:'#90EE90'}}>
            <View style={{backgroundColor:'#66CDAA', marginTop:20, borderRadius: 10, width:200, marginHorizontal:70}}>
              <Text style={{textAlign:"center", fontSize:20}}>Data Diri Customer</Text>
            </View>
                
                <View style={{marginHorizontal: 20}}>
                    <Text style={{fontSize:14, color:'black'}}>Order From</Text>
                    <View style={{ height:40, backgroundColor:'#E0FFFF'}}>
                      <TextInput style={{fontSize:14}} value={orderFrom} onChangeText={(value) => {this.setState({orderFrom: value})}}/>
                    </View>
                </View>
                <View style={{marginHorizontal: 20}}>
                    <Text style={{fontSize:14, color:'black'}}>Order To</Text>
                    <View style={{ height:40, backgroundColor:'#E0FFFF'}}>
                      <TextInput style={{fontSize:14}} value={orderTo} onChangeText={(value) => {this.setState({orderTo: value})}}/>
                    </View>
                </View>
                <View style={{marginHorizontal: 20}}>
                    <Text style={{fontSize:14, color:'black'}}>No. Telepon</Text>
                    <View style={{height:40, backgroundColor:'#E0FFFF'}}>
                      <TextInput style={{fontSize:14}} value={noTelp} onChangeText={(value) => {this.setState({noTelp: value})}}/>
                    </View>
                </View>
              <View style={{flex: 1, flexDirection: 'row',justifyContent:'space-between' , margin: 20}}>
                <Button title={'SAVE'} onPress= {() => this.submitDataCust() } />
                <Button title={'NEXT'} 
                  //onPress={() => navigation.navigate('DetailOrder')} 
                  onPress={() => this.props.navigation.navigate('DetailOrder',{data})}
                />
              </View>
          </View>
        </ThemeProvider>
      </ScrollView>
    );
  }
};

export default OrderPayment
