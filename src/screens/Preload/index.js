import React, { useEffect, useContext } from 'react';
import { Container1, LoadingIcon, Logo } from './styles';
import Container from '../../components/gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api'
import {UserContext} from "../../contexts/UserContext";


export default () => {
    const {dispatch} = useContext(UserContext);

    const navigation = useNavigation();

    useEffect(() => {
        async function getToken(){
           const data = await AsyncStorage.getItem('userData');
           if(data){
              const {user} = JSON.parse(data);
              if(user.token){                
                dispatch({
                    type: 'setUser',
                    payload: {
                        user: user,
                    }
                });

                navigation.reset({
                    routes:[{name:'Home'}]
                })
            }
           }    
            else{
                navigation.navigate('Login');
            }
        }
        getToken()
    },[]);


    return (
        <Container1>
            <Logo source={require('../../assets/logo.png')}/>
            <Container />
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container1>
    );
}