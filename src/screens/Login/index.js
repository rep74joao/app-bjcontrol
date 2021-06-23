import React, {useState, useContext} from 'react'
import Input from '../../components/input'
import {Container, BottomSignIn, TextSignIn, InputArea,Version, Img} from './styles'
import Person from '../../assets/person.svg';
import Password from '../../assets/lock.svg';
import {useNavigation} from '@react-navigation/native'
import Logo from '../../assets/logo.png'
import Gradient from '../../components/gradient';
import {Alert, KeyboardAvoidingView, Platform, StatusBar} from 'react-native'
import Api from '../../Api';
import {UserContext} from "../../contexts/UserContext";

export default () => {
     const [usuario, setUsuario] = useState('');
     const [senha, setSenha] = useState('');

     const {dispatch} = useContext(UserContext);
     const navigation = useNavigation();


    async function handleSignIn(){
        if (usuario && senha){

                const formData = new FormData();

                formData.append('usuario', usuario);
                formData.append('senha', senha);

                const res = await Api.Login(formData);

                if (res){

                    dispatch({
                        type: 'setUser',
                        payload: {
                            user: res,
                        }
                    });
          
                    navigation.reset({
                        routes:[{name:'Home'}]
                    })
                }

        }else{
            Alert.alert('Atenção','Preencha todas as informações para continuar!',[
                {text: 'Ok', onPress: () => true}
            ])
        }

    }

    return(
        <>
            <Gradient />
            <StatusBar barStyle={'dark-content'} backgroundColor={'#00435a'}/>
            <Container>            
            <KeyboardAvoidingView style={{flex:1,width:'100%',alignItems:'center'}}  behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>   
               <Img source={Logo} width={100} height={180}/>
                <InputArea>
               
                    <Input
                        IconSvg={Person}
                        keyboardType={'default'}
                        value={usuario}
                        onChangeText={e => setUsuario(e)}
                        placeholder={'Usuario'}/>

                    <Input
                        IconSvg={Password}
                        password={true}
                        keyboardType={'default'}
                        value={senha}
                        onChangeText={e => setSenha(e)}
                        placeholder={'Senha'}/>
                    
                    <BottomSignIn onPress={handleSignIn}>
                        <TextSignIn>Entrar</TextSignIn>
                    </BottomSignIn>
                </InputArea>
                <Version>versao 1.0.0</Version>
              </KeyboardAvoidingView>
              
            </Container>
            
            </>
    )
}
