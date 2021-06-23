import React, { useEffect, useState, useContext, useRef } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Preloader from '../../components/preloader';
import GradientHome from '../../components/gradientHome';
import {ContainerDados,
    Empresa,
    ViewUsuario,
    ViewOperacoes,
    Operacao,
    Logout,
    TitleOperacao,
    ContainerOperacoes,
    Nome,
    Container,
    Joice, 
    TextJoice
    } from './styles';
import CodigoIcon from '../../assets/barcode.svg';
import ProdutosIcon from '../../assets/compras.svg';
import ClientesIcon from '../../assets/person.svg';
import SairIcon from '../../assets/sair.svg';
import LotesIcon from '../../assets/lote.svg'
import ContasReceberIcon from '../../assets/contasReceber.svg'
import ContasPagarIcon from '../../assets/payday.svg'
import {UserContext} from "../../contexts/UserContext";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'
import {Alert, Platform} from 'react-native'
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });


const Home = ({navigation}) => {

    const [preloader, setPreloader] = useState(true);
    const {dispatch, state} = useContext(UserContext);
    const [name, setName] = useState(' ');
    const [ola, setOla] = useState(' ');
    const [empresa, setEmpresa] = useState('');

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
    
        Permissions.getAsync(Permissions.NOTIFICATIONS)
        .then((statusObj) => {
          if(statusObj.status !== 'granted'){
            return Permissions.askAsync(Permissions.NOTIFICATIONS);
          }
          return statusObj;
        }).then((statusObj) => {
          if(statusObj.status !== 'granted'){
            return;
          }
        })
        .then(() => {
            return Notifications.getExpoPushTokenAsync();
        })
        .then(data => console.tron.log)
        .catch((e) => {
          return null;
        });
      


    },[])

    

    useEffect(() => {
        async function getUser(){
            
           if (state.user){
               const n = state.user.nome.split(' ');
               const e = state.user.usuario.nome.split(' ');
               setName(n[0]);
               setEmpresa(`${e[0]} ${e[1]} ${e[2]}`)
           }
 
            let hora = new Date().getHours();
 
            if (hora >= 0 && hora < 12){
                setOla('Bom dia')
            }
            if (hora >= 12 && hora < 18){
                setOla('Boa tarde')
            }
            if (hora >= 18 && hora < 24){
                setOla('Boa noite')
            }
 
            setPreloader(false);
           
 
           return;
        }
 
        getUser();
     },[state.user]);


    const sombra = {
        shadowOpacity: 0.5,
        shadeColor: '#000',
        shadowRadius: 50,
        shadowOffset: {
            height: 10,
            width: 10
        },

        elevation: 10
    }

    async function logout(){
      await AsyncStorage.removeItem('userData');

      navigation.reset({
        routes: [{name:'Login'}]
      });
    }


    return (
        <>
            {preloader && <Preloader/>}
            <GradientHome/>
            <ContainerDados>
                <Empresa>{empresa} {expoPushToken}</Empresa>
                <ViewUsuario>
                    <Nome>{ola}, {name}</Nome>
                </ViewUsuario>
                <Logout onPress={() => logout()}>
                  <SairIcon width={23} height={23} fill={'#00435a'}/>
                </Logout>
            </ContainerDados>
            <Container>
                <ContainerOperacoes>
                    <ViewOperacoes>
                        <Operacao
                            style={sombra}
                            onPress={() => navigation.navigate('Nseries')}
                        >
                            <CodigoIcon
                                width={23} height={23} fill={'#00435a'}/>
                            <TitleOperacao>Numero de serie</TitleOperacao>
                        </Operacao>
                        <Operacao
                            onPress={() => navigation.navigate('Lotes')}
                            style={sombra}>
                            <LotesIcon width={23} height={23} fill={'#00435a'}/>
                            <TitleOperacao>Lote</TitleOperacao>
                        </Operacao>
                    </ViewOperacoes>
                    <ViewOperacoes>
                        <Operacao
                            style={sombra}
                            onPress={() => navigation.navigate('Clientes', {search:false})}
                        >
                            <ClientesIcon
                                width={23} height={23} fill={'#00435a'}/>
                            <TitleOperacao>Clientes</TitleOperacao>
                        </Operacao>
                        <Operacao
                            onPress={() => navigation.navigate('Produtos')}
                            style={sombra}>
                            <ProdutosIcon width={23} height={23} fill={'#00435a'}/>
                            <TitleOperacao>Produtos</TitleOperacao>
                        </Operacao>
                      
                    </ViewOperacoes>
                    <ViewOperacoes>
                        <Operacao
                            style={sombra}
                            onPress={() => navigation.navigate('ContasPagar')}
                        >
                            <ContasPagarIcon
                                width={23} height={23} fill={'#00435a'}/>
                            <TitleOperacao>Contas a Pagar</TitleOperacao>
                        </Operacao>
                        <Operacao
                            onPress={() => navigation.navigate('ContasReceber')}
                            style={sombra}>
                            <ContasReceberIcon width={23} height={23} fill={'#00435a'}/>
                            <TitleOperacao>Contas a Receber</TitleOperacao>
                        </Operacao>
                      
                    </ViewOperacoes>
                    <ViewOperacoes>
                        <Operacao
                            style={sombra}
                            onPress={() => navigation.navigate('PedidoVendas')}
                        >
                            <ClientesIcon
                                width={23} height={23} fill={'#00435a'}/>
                            <TitleOperacao>Pedido de Vendas</TitleOperacao>
                        </Operacao>
                        <Operacao
                            onPress={() => navigation.navigate('Garantia')}
                            style={sombra}>
                            <ProdutosIcon width={23} height={23} fill={'#00435a'}/>
                            <TitleOperacao>Garantia</TitleOperacao>
                        </Operacao>
                      
                    </ViewOperacoes>
                    <ViewOperacoes>
                        <Operacao
                            style={sombra}
                            onPress={() => navigation.navigate('Requisicao')}
                        >
                            <ClientesIcon
                                width={23} height={23} fill={'#00435a'}/>
                            <TitleOperacao>Requisição</TitleOperacao>
                        </Operacao>
                        <Operacao
                            onPress={() => navigation.navigate('Relatorios')}
                            style={sombra}>
                            <ProdutosIcon width={23} height={23} fill={'#00435a'}/>
                            <TitleOperacao>Relatórios</TitleOperacao>
                        </Operacao>
                      
                    </ViewOperacoes>
                </ContainerOperacoes>
            </Container>
        </>
    );
};

  export default Home;