import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Button, ThemeProvider } from 'react-native-elements';
import MapView from 'react-native-maps';

class OrderTracking extends Component{
    constructor(){
        super()
        this.state = {}
    }
    

    render(){
        return(
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05
                }}
            />
        )
           
    }
}

export default OrderTracking
