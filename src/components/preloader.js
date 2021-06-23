import React from 'react'
import styled from 'styled-components/native'
import {ActivityIndicator} from 'react-native';

export default function(){


    return(
        <>
            <Container
                transparent={true}
            >
                <Main>
                    <Loader>
                        <ActivityIndicator size="large" color={'#38c0bb'}/>
                        <Text>Carregando ...</Text>
                    </Loader>
                </Main>
            </Container>
        </>
    )
}

const Container = styled.Modal`
  
`

const Loader = styled.View`
  background-color: #fff;
  border-radius: 3px;
  height: 80px;
  width: 80%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const Main = styled.View`
  background-color: rgba(0,0,0, 0.75);
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Text = styled.Text`
  font-size: 18px;
  margin-left: 20px;
`



