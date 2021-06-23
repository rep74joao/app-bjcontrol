import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../assets/search.svg'
import Back from '../assets/voltar.svg'
import {primary, secundary} from '../config'
import {TouchableOpacity} from 'react-native'


import Login from '../screens/Login';
import Home from '../screens/Home'
import Preloader from '../screens/Preload'

import Nserie from '../screens/Nserie'
import NserieId from '../screens/NserieId'
import Nseries from '../screens/Nseries'

import Clientes from '../screens/Clientes'
//lote
import Lotes from '../screens/Lotes'
import LoteId from '../screens/LoteId';

import Produtos from '../screens/Produtos'

import ContasPagar from '../screens/ContasPagar'

import ContasReceber from '../screens/ContasReceber'

import PedidoVendas from '../screens/PedidoVendas'

import Requisicao from '../screens/Requisicao'

import Garantia from '../screens/Garantia'

import Vendas from '../screens/Vendas'

const Stack = createStackNavigator();


export default () => (
    <Stack.Navigator
    screenOptions={{
        headerTintColor: secundary,
        headerStyle: { backgroundColor: primary },
      }}
    >
        <Stack.Screen
            options={{
                title:false,
                headerShown: false,

            }}
            name={'Preloader'}
            component={Preloader}/>
        <Stack.Screen
            options={{
                headerShown: false,
         
            }}
            name={'Login'}
            component={Login}/>
        <Stack.Screen
            name={'Home'}
            options={{
                headerShown: false,
            }}
            component={Home}/>
        <Stack.Screen
            name={'Nseries'}
            component={Nseries}
            options={({navigation}) => ({
                title:'Numero de series',
                headerRight: () => (
                    <TouchableOpacity  onPress={() => {
                        navigation.navigate('Nserie')
                      }}>
                        <Search
                        fill={secundary}
                        style={{marginRight:12}}
                       />
                    </TouchableOpacity>
                    ),
            })}/>
        <Stack.Screen
            name={'Nserie'}
            options={{
                title: 'Buscar',
            }}
            component={Nserie}/>
        <Stack.Screen
            name={'NserieId'}
            options={({navigation, route}) => ({
                title:`Numero serie ${route.params.nserie.numero}`,
                headerLeft: () => (
                    <TouchableOpacity  onPress={() => {
                        navigation.navigate('Nseries')
                      }}>
                        <Back
                        fill={secundary}
                        style={{marginLeft:12}}
                       />
                    </TouchableOpacity>
                    ),
            })}
            component={NserieId}/>
        <Stack.Screen
                    name={'Clientes'}
                    component={Clientes}
                    options={({}) => ({
                        title:'Clientes',
                       
        })}/>
        <Stack.Screen
            name={'Lotes'}
            component={Lotes}
            options={({navigation}) => ({
                title:'Lotes',
          
            })}/>
        <Stack.Screen
            name={'LoteId'}
            component={LoteId}
            options={({navigation, route}) => ({
                title:`Lote ${route.params.lote.lote}`,
          
        })}/>
         <Stack.Screen
            name={'Produtos'}
            component={Produtos}
            options={({navigation}) => ({
                title:'Produtos',
          
            })}/>
         <Stack.Screen
            name={'Garantia'}
            component={Garantia}
            options={({navigation}) => ({
                title:'Garantia',
          
            })}/>
        <Stack.Screen
            name={'Requisicao'}
            component={Requisicao}
            options={({navigation}) => ({
                title:'Requisição',
          
            })}/>
        <Stack.Screen
            name={'PedidoVendas'}
            component={PedidoVendas}
            options={({navigation}) => ({
                title:'PedidoVendas',
          
            })}/>
        <Stack.Screen
            name={'ContasPagar'}
            component={ContasPagar}
            options={({navigation}) => ({
                title:'Contas a Pagar',
          
            })}/>
        <Stack.Screen
            name={'ContasReceber'}
            component={ContasReceber}
            options={({navigation}) => ({
                title:'Contas a Receber',
          
            })}/>


    </Stack.Navigator>
)
