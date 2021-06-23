import styled from 'styled-components/native'
import {secundary} from '../../config'

export const Container = styled.View`
  position: absolute;
  width: 100%;
  margin: 0 auto 0 auto;
  background-color: #fff;
  height: 100%;
  bottom: 0;

`

export const Search = styled.TextInput`
  width:100%;
  padding: 10px;
  font-size:20px;
  color: ${secundary}
  
`

export const SearchArea = styled.View`
  width: 100%;
  flex-direction: row;
  background-color: #ccc;
  align-items: center;
  justify-content: center;
  padding: 5px 0 0 30px;
  
`;
