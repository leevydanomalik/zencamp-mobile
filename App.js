import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './src/pages/Menu'
//import OrderHistory from './src/pages/OrderHistory'
import HistoryOrder from './src/pages/HistoryOrder'

import OrderTracking from './src/pages/OrderTracking'
//import CreateOrder from './src/pages/CreateOrder'
//import FormEdit from './src/pages/FormEdit';
import Edit from './src/pages/Edit';
import OrderPayment from './src/pages/OrderPayment';
import DetailOrder from './src/pages/DetailOrder';
import ViewOrder from './src/pages/ViewOrder';
//import Login from './src/pages/Login';

import { AuthContext } from './src/component/context';
import AsyncStorage from '@react-native-community/async-storage';
import LoginScreen from './src/pages/LoginScreen';
import CreateOrderMaterialWMS from './src/pages/CreateOrderMaterialWMS';

const Stack = createStackNavigator();

const App=()=> {

  //const [isLoading, setIsLoading] = React.useState(true)
  //const [userToken, setUserToken] = React.useState(null)

  const initialLoginState = {
    //isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          //isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          //isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          //isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      //setUserToken('fgkj');
      //setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      
      try{
        await AsyncStorage.setItem('userToken', userToken)
      }catch(e){
        console.log(e)
      }

      console.log('user token: ', userToken)
      dispatch({type:'LOGIN', id: userName, token: userToken})
    },
    signOut: () => {
      dispatch({type: 'LOGOUT'})
    },
  }), []);


  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      { loginState.userToken !== null ? (
      <Stack.Navigator >
        <Stack.Screen name="Menu" component={Menu} options={{headerTitleAlign: 'center', headerTitleStyle: {fontWeight: 'bold'}}} />
        <Stack.Screen name="HistoryOrder" component={HistoryOrder} /> 
        <Stack.Screen name="OrderTracking" component={OrderTracking} />
        <Stack.Screen name="CreateOrderMaterialWMS" component={CreateOrderMaterialWMS} />
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="OrderPayment" component={OrderPayment} />
        <Stack.Screen name="DetailOrder" component={DetailOrder} />
        <Stack.Screen name="ViewOrder" component={ViewOrder} />
      </Stack.Navigator>
      )
    :
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
    </Stack.Navigator>
    }
    </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
