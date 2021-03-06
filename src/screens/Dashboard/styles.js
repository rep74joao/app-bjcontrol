import styled from 'styled-components/native'
import { secundary, primary } from '../../config';

export default{

  Container: styled.ScrollView`
  
  width: 100%;
  background-color: #fff;
  margin: 0 auto 0 auto;

  flex:1;

`,


ViewModalDashboard: styled.View`
  height:100%;
  width: 100%;
  top:0;
  background-color:#fff;

`,

Close: styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  align-items:center;
  justify-content: center;
  position: absolute;
  top: 20px;
  background-color:${primary};
  border-radius:20px;
  left: 20px;
  z-index:99;
`,

TextClose: styled.Text`
  font-size: 20px;
  padding:5px;
  color: ${secundary};
`,

Title: styled.Text`
  font-size: 19px;
  margin-left: 15px;
  font-weight: bold; 
  margin-top: 20px;
  margin-bottom: -5px;
  color: ${secundary};
 
`,

TitleDepartamento: styled.Text`
  font-size: 12px;
  text-align:center;
  line-height: 13px;
  color: #00435a;
  font-weight: bold;
  
`,


Departamento: styled.TouchableOpacity`
  width: 65px;
  height: 65px;
  align-items:center;
  justify-content: center;
  flex-direction: column;
  background-color: ${primary};
  border-radius: 50px;
  margin-bottom: 3.9px;
 


`,

ViewDepartamento: styled.View`
  margin-top: 10px;
   align-items:center;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 20px;
`,


}

