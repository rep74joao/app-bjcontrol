import React, {useState} from 'react'
import styled from 'styled-components/native'
import {useNavigation} from '@react-navigation/native'
import {secundary} from '../config'
import EditarIcon from '../assets/editar.svg'



export default function({item}){

  const navigation = useNavigation();

    
    
  function getLote(item){
      navigation.navigate('LoteId', {lote: item})
  }

    return(
            <Container>
               <ContainerContent>
               <Button>
                    <ViewData>
                        <Numero>Lote: {item.lote}</Numero>
                        <Produto>{item.produto.nome}</Produto>
                        {item.filial && (
                          <Endereco>Filial: {item.filial.cidade} / {item.filial.estado}</Endereco>
                        )}
                    </ViewData>
                </Button>
                <Edit onPress={() => getLote(item)}>
                  <EditarIcon width={33} height={33} fill={'#00435a'}/>
                </Edit>
                
               </ContainerContent>
            </Container>
    )
}

const ViewData = styled.View`
  flex: 1;
  padding: 5px 10px


`

const Numero = styled.Text`
  font-size: 16px;
  line-height: 17px;
  color: ${secundary}

`

const Edit = styled.TouchableOpacity`
  margin-right: 10px;
`

const Produto = styled.Text`
font-size: 16px;
  line-height: 17px;
  color: ${secundary}
`

const Endereco = styled.Text`
font-size: 16px;
  line-height: 17px;
  color: ${secundary}
`

const Button = styled.View`
  padding: 6px 0;
  margin: 0 0 0 3px;  
  flex-direction: row;
  justify-content: center;
  margin:auto;
  align-items: center;
  flex:1;
`

const Container = styled.View`
  min-width: 100%;
  width: 100%;
  background-color: #fff;
 
  
`

const ContainerContent = styled.View`
  width: 95%;
  border-bottom-width:1px;
  border-color: #eee;
  flex-direction: row;
  align-items:center;
  justify-content:center;
  margin:auto;
`
