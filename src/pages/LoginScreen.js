import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
//import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../component/context';
import Users from '../model/users'

const LoginScreen = ({navigation}) => {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    })

    const {signIn} = React.useContext(AuthContext)

    const textInputChange = (val) => {
        if(val.trim().length >= 1){
            setData({
                ... data,
                username:val,
                check_textInputChange:true,
                isValidUser:true
            })
        }else{
            setData({
                ... data,
                username:val,
                check_textInputChange:false,
                isValidUser:false
            })
        }
    }

    const handlePasswordChange = (val)=>{
        if(val.trim().length >= 1){
        setData({
            ... data,
            password:val,
            isValidPassword:true
        })
        }else{
            setData({
                ... data,
                password:val,
                isValidPassword:false
            })
        }
    }

    const updateSecureTextEntry = ()=>{
        setData({
            ... data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const handleValidUser=(val)=>{
        if(val.length >= 1){
            setData({
                ... data,
                isValidUser: true
            })
        }else{
            setData({
                ... data,
                isValidUser: false
            })
        }
    }

    const loginHandle = (userName, password)=>{
        const foundUser = Users.filter (item=>{
            return userName == item.username && password == item.password
        })
        
        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if(foundUser.length == 0){
            Alert.alert('Login Error', 'Username & password is incorrect', [
                {text: 'Ok'}
            ])
            return;
        }
        signIn(foundUser);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>WELCOME</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.text_footer}>Username</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color = "#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your username"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=> textInputChange(val)}
                        onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                    <Feather
                        name="check-circle"
                        color="green"
                        size={2}
                    />
                    : null}
                </View>
                {data.isValidUser ? null :
                    <Text style={styles.errorMsg}> Username must be required!</Text>
                }
                <Text style={styles.text_footer}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color = "#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder="Your password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val)=> handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                        :
                        <Feather
                            name="eye"
                            color="grey"
                            size={20}
                        />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Text style={styles.errorMsg}> Password must be required!</Text>
                }
                <View style={styles.button}>
                    <TouchableOpacity 
                        //onPress={()=> navigation.navigate('Menu')}
                        style={styles.signIn}
                        onPress={()=>{loginHandle(data.username, data.password)}}
                    >
                    <LinearGradient colors={['#90EE90', '#01ab9d']}
                        style={styles.signIn}>
                        <Text style={styles.textSign,{color:'#fff'}}>Login</Text>
                    </LinearGradient>    
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#90EE90'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        //marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 20,
        fontWeight: 'bold'
    }
  });
