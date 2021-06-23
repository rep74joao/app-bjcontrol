import React, {useState} from 'react';
import styled from 'styled-components';
import {UserContext} from "../contexts/UserContext";
import AbastecimentoIcon from '../assets/gasoline-pump.svg';
import CashIcon from '../assets/cash.svg';
import OpcoesIcon from '../assets/menu.svg';
import ProdutosIcon from '../assets/compras.svg';
import HomeIcon from '../assets/home.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Alert} from 'react-native';


export default ({state, navigation}) => {
    //const { state: user } = useContext(UserContext);

     async function payment(){
        const p = await AsyncStorage.getItem('pagamento');

        if (p){
            return navigation.navigate('Receber');
        }else {
            return Alert.alert('Atenção', 'Sem pagamento para efetuar!');
        }
    }


    return(
        <TabArea>
            <TabItem onPress={()=>navigation.navigate('Home')}>
                <HomeIcon
                    width="24" height="24" fill={ state.index === 0 ? "#929292" : "#000"}/>
                <Title
                    style={{color: state.index === 0 ? "#929292" : "#000"}}
                >Home</Title>
            </TabItem>
            <TabItem v>
                <AbastecimentoIcon
                    width="24" height="24" fill={ state.index ===
                1 ? "#929292" : "#000"}/>
                    <Title
                        style={{color: state.index === 1 ? "#929292" : "#000"}}
                    >Bicos</Title>
            </TabItem>
            <CashTabItem
                style={{backgroundColor: state.index === 2 ? "#929292" : "#029d05",
                    shadowOpacity: 0.5,
                    shadeColor: '#000',
                    shadowRadius: 50,
                    shadowOffset: {
                        height: 10,
                        width: 10
                    },

                    elevation: 25

                }}
                onPress={()=> payment()}>
                <CashIcon
                    width="24" height="24" fill="#fff"/>
                    <Title
                        style={{color: '#fff'}}
                    >Pagar</Title>
            </CashTabItem>
            <TabItem onPress={()=>navigation.navigate('Produtos')}>
                <ProdutosIcon
                    width="24" height="24" fill={ state.index === 3 ? "#929292" : "#000"}/>
                <Title
                    style={{color: state.index === 3 ? "#929292" : "#000"}}
                >Produtos</Title>
            </TabItem>

            <TabItem onPress={()=>navigation.navigate('Opcoes')}>
                <OpcoesIcon
                    width="22" height="22" fill={ state.index === 4 ? "#929292" : "#000"}/>
                <Title
                    style={{color: state.index === 4 ? "#929292" : "#000"}}
                >Opções</Title>
            </TabItem>
        </TabArea>
    )
}

const TabArea = styled.View`
  height: 70px;
  background-color: rgba(255, 255, 255, 0.3);
  flex-direction: row;
  background-color: #fff;
  border-top-width: 1px;
  border-color: #818080;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  color: black;
  font-size: 12px;
`

const CashTabItem = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  bottom: 15px;
  z-index: 99;

 
`
