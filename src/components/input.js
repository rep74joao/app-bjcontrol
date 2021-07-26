import React from 'react'
import styled from 'styled-components/native'

export default ({IconSvg, placeholder, onChangeText, value, password, keyboardType, autoCapitalize}) => {


    return(
        <InputArea>
            {IconSvg && <IconSvg width={23} height={23} fill={'#fff'}/>}
            <InputText
                placeholder={placeholder}
                onChangeText={onChangeText}
                placeholderTextColor="rgba(255,255,255,0.25)"
                secureTextEntry={password}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                value={value} />
        </InputArea>
    )
}

const InputArea = styled.View`
  width: 100%;
  height: 55px;
  flex-direction: row;
  border-radius: 5px;
  background-color: rgba(0,0,0,0.35);
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  margin: 5px;
`;

const InputText = styled.TextInput`
  width: 100%;
  height: 50px;
  color: #ffffff;
  margin-left: 9px;
  font-size: 20px;
  flex: 1;
`;

