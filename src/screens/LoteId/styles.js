import React from 'react'
import styled from 'styled-components/native'
import {primary, secundary} from '../../config'

export const Container = styled.View`
  width: 100%;
  margin: 0 auto 0 auto;
  background-color: #fff;
  flex:1;
  

`

export const Imgs = styled.View`
  flex:1;
  width:100%;
  height: 25%;
  margin: 70px 20px 20px 20px;
`


export const InputArea = styled.View`
  align-items:center;
  justify-content: center;
  width: 90%;
  height: 150px;
  margin: 0 auto 0 auto;
`

export const Title = styled.Text`
  font-size: 18px;
  text-align:center;
  margin-bottom:20px;
  margin-top: 25px;
`

export const BottomSubmit = styled.TouchableOpacity`
  background-color: ${primary};
  margin:auto;
  width:100%;
  border-radius:3px;
`

export const TextSubmit = styled.Text`
  text-align:center;
  color: ${secundary};
  padding:17px;
  font-size: 18px;
  font-weight: bold;
`

export const ContainerNserie = styled.View`
  width: 93%;
  margin: 15px auto 0 auto;
  background-color: #fff;
  
  flex-direction: row;

`

export const ContainerProduto = styled.View`
  width: 93%;
  margin: 3px auto 0 auto;
  background-color: #fff;
  
  flex-direction: row;
`

export const ContainerFilial = styled.View`
  width: 93%;
  margin: 3px auto 0 auto;
  background-color: #fff;
 
  flex-direction: row;
`

export const ContainerRastreio = styled.View`
  width: 93%;
  margin: 9px auto 0 auto;
  background-color: #fff;
  flex:1;
  
`

export const Rastreio = styled.Text`
  font-size: 18px;
  width: 98%;
  font-weight: bold;
  color: ${secundary};
  border-bottom-width: 1px;
  border-color:#ccc;
  margin-bottom:5px;
`

export const Editar = styled.TouchableOpacity`
  width:55px;
  height:55px;
  position: absolute;
  bottom: 18px;
  right:18px;
  z-index:99999;
  background-color: ${primary};
  border-radius: 30px;
  align-items: center;
  justify-content:center;
`

export const Close = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  align-items:center;
  justify-content: center;
  position: absolute;
  top: 20px;
  background-color:${primary};
  border-radius:20px;
  right: 20px;
  z-index:99;
`

export const TextClose = styled.Text`
  font-size: 20px;
  padding:5px;
  color: ${secundary};
`

export const Imagens = styled.TouchableOpacity`
  width:55px;
  height:55px;
  position: absolute;
  bottom: 18px;
  right:18px;
  z-index:99999;
  background-color: ${primary};
  border-radius: 30px;
  align-items: center;
  justify-content:center;
  z-index:99;
`

export const Numero = styled.Text`
  font-size: 16px;
  line-height: 17px;
  color: ${secundary};
  flex:1;
`
export const Lote = styled.Text`
   font-size: 16px;
  line-height: 17px;
  font-weight: bold;
  color: ${secundary};
`

export const Produto = styled.Text`
    font-size: 16px;
  line-height: 18px;
  color: ${secundary};
`

export const Timeline = styled.Text`
  font-size: 17px;
  color: ${secundary};
  margin-left:13px;
  flex:1;
  padding: 7px 0;
`

export const StatusOk = styled.TouchableOpacity`
  font-weight: bold;
  margin:0 10px 0 0;
  color: ${secundary};
  padding: 8px;
  border-radius: 15px;
  background-color: #1eae98;
`

export const Status = styled.TouchableOpacity`
  font-weight: bold;
  color: ${secundary};
  padding: 5px 15px;
  border-radius: 3px;
  background-color: #1eae98;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
`

export const StatusText = styled.Text`
  font-size: 15px;
  color: #fff;
`

export const StatusFalse1 = styled.TouchableOpacity`
  font-weight: bold;
  color: ${secundary};
  padding: 5px 15px;
  border-radius: 3px;
  background-color: #f55c47;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
`

export const StatusFalse = styled.TouchableOpacity`
  font-weight: bold;
  margin:0 10px 0 0;
  color: ${secundary};
  padding: 8px;
  border-radius: 15px;
  background-color: #f55c47;
`

export const ContainerTimeline = styled.View`
  flex-direction:row;
  align-items: center;
  border-color:#ccc;
  border-bottom-width:1px;
`

export const Filial = styled.Text`
  font-size: 16px;
  line-height: 16px;
  color: ${secundary};
  flex:1;
`
export const Turno = styled.Text`
  font-size: 16px;
  line-height: 16px;
  color: #fff;
`



