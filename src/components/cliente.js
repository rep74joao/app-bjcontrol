import React, {useState} from 'react'
import styled from 'styled-components/native'
import {secundary} from '../config'
import MaisIcon from '../assets/mais.svg'
import ModalCliente from '../components/modalCliente'

export default function({item}){
   const [modalVisible, setModalvisible] = useState(false);


    return(
            <>
            <ModalCliente cliente={item} 
                          setModalvisible={() => setModalvisible(false)} 
                          modalVisible={modalVisible}/>
            <Container>
               <ContainerContent>
               <Button>
                    <ViewData>
                        <Cliente>{item.nome}</Cliente>
                        <Dados>{item.documento}</Dados>
                        <Endereco>{item.logradouro} {item.cidade} / {item.uf}</Endereco>
                    </ViewData>
                </Button>
                <Edit onPress={() => setModalvisible(true)}>
                  <MaisIcon width={23} height={23} fill={'#00435a'}/>
                </Edit>
                
               </ContainerContent>
            </Container>
            </>
    )
}

const ViewData = styled.View`
  flex: 1;
  padding: 5px 10px
`

const Cliente = styled.Text`
  font-size: 16px;
  line-height: 17px;
  color: ${secundary}

`

const Edit = styled.TouchableOpacity`
  margin-right: 10px;
  padding: 8px;
`

const Dados = styled.Text`
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
