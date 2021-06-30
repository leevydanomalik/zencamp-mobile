import { HeaderBackground } from '@react-navigation/stack';
import React, { Component }  from 'react';
import { View, Alert, TouchableOpacity, Button, StyleSheet, Text} from 'react-native';
//import { ThemeProvider } from 'react-native-elements';
//import OrderHistory from './OrderHistory'

class Menu extends Component{
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { navigation } = this.props

    return (
      
        <View style={{flex:1, backgroundColor:'#90EE90'}}>
          <View style={{ flex: 1, flexDirection: 'column', padding: 20, margin: 50, marginTop:160, justifyContent:'space-between', marginBottom:210 }}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HistoryOrder')}>
              <Text style={styles.button_text}>ORDER HISTORY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('OrderTracking')}>
              <Text style={styles.button_text}>ORDER TRACKING</Text>
            </TouchableOpacity>
            </View>
        </View>
     
    )
  }
}

export default Menu

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
}
})