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
            <ThemeProvider>
                <View style={{flex:1, backgroundColor:'#90EE90'}}>
                    <View style={{marginHorizontal: 20, marginTop: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>ID ORDER</Text>
                        <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                            <Text> {data && data.msoID}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>KIMAP</Text>
                        <View style={{height:30, backgroundColor:'#E0FFFF'}}>
                            <Text>{data && data.msoMaterials[0].msKIMAP}</Text>                           
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>NAME</Text>
                        <View style={{height:30, backgroundColor:'#E0FFFF'}}>
                            <Text>{data && data.msoMaterials[0].matName}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>UoM</Text>
                        <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                            <Text> {data && data.msoMaterials[0].msUOM}</Text>
                        </View>
                    </View>
                    <View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>MS DESCRIPTION</Text>
                        <View style={{height:30, backgroundColor:'#E0FFFF'}}>
                            <Text>{data && data.msoMaterials[0].msDesc}</Text>
                        </View>
                    </View>
                    
                    {/*<View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>TYPE</Text>
                        <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                            <Text> {data && data.msoType}</Text>
                        </View>
                    </View>*/}
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
                    {/*<View style={{marginHorizontal: 20}}>
                        <Text style={{fontSize:14, color:'black'}}>STATUS</Text>
                        <View style={{ height:30, backgroundColor:'#E0FFFF'}}>
                            <Text>{data && data.msoStatus}</Text>
                        </View>
                    </View>*/}
                   
                </View>
            </ThemeProvider>
        );
    }
};

export default ViewOrder
