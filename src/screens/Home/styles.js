import React from 'react'
import styled from 'styled-components/native'
import {secundary} from '../../config'
import { Platform } from 'react-native'

export const Container = styled.View`
  position: absolute;
  width: 100%;
  margin: 30px auto 0 auto;
  background-color: #e5e5e5;
  height: 75%;
  bottom: 0;

`
const ios = Platform.OS === 'ios' ? '62px 25px' : '25px';

export const ContainerDados = styled.View`
  position: absolute;
  width: 100%;
  padding: ${ios};
  background-color: transparent;
  height: 25%;
  top: 0;
 `

 export const Logout = styled.TouchableOpacity`
  position:absolute;
  right: 20px;
  top:61px;
 
`

export const Empresa = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color:${secundary};
`

export const ViewUsuario = styled.View`
  margin-top: 5px;
  border-bottom-color: rgba(0,0,0,0.2);
  border-bottom-width: 1px;
`

export const Nome = styled.Text`
  font-size: 20px;
  color:${secundary};
  padding-bottom:8px;
`

export const Turno = styled.Text`
  font-size: 18px;
  color: #fff;
`

export const ViewOperacoes = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  margin-top: 20px;
`

export const ContainerOperacoes = styled.View`
  margin-top: -49px;
  
`

export const Operacao = styled.TouchableOpacity`
  background-color: #fff;
  width: 45%;
  padding: 16px 10px;
  flex-direction: row;
  border-radius: 7px;
`

export const TitleOperacao = styled.Text`
  font-size: 15px;
  margin-left: 6px;
  color:#3a3a3c;

`


