import React from 'react';
import styled from 'styled-components/native'
import {backgroundHome} from '../../config';
import { Platform } from 'react-native';

const ios = Platform === 'ios' ? '70px' : '39px';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${ios};
  align-items: center;
  background-color: transparent;
  margin-top: 100px;
`;

export const Img = styled.Image`
  width: 177px;
  height: 35px;
  margin-bottom: 50px;
`

export const Logo = styled.Image`
  width: 200px;
  height: 200px;
  margin: 0;
`;

export const Version = styled.Text`
  font-size: 13px;
  color: #efefef;
  margin-bottom: 20px;
`


export const InputArea = styled.View`
  margin-top: 20px;
  flex-direction: column;
  width: 80%;
  align-items: center;

`;

export const BottomSignIn = styled.TouchableOpacity`
  background-color: #ffffff;
  width: 100%;
  border-radius: 5px;
  margin: 20px 0 10px 0;
  
  
`;
export const TextSignIn = styled.Text`
  text-align: center;
  color: #38c0bb;
  padding: 16px 0;
  font-weight: bold;
  font-size: 20px;
`;
