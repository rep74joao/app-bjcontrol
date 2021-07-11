import React, {useEffect, useState, useContext} from 'react';
import { Modal, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import { UserContext } from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/core';
import MenuIcon from '../../assets/menu.svg'
import ContasReceberIcon from '../../assets/contasReceber.svg'
import ContasPagarIcon from '../../assets/payday.svg'
import ProdutosIcon from '../../assets/compras.svg';
import CodigoIcon from '../../assets/barcode.svg';
import ClientesIcon from '../../assets/person.svg';
import LotesIcon from '../../assets/lote.svg'
import {Container, ViewModalDashboard, Title, Close, TextClose, Departamento,ViewDepartamento, TitleDepartamento} from './styles';
import { secundary, primary } from '../../config';
import Gradient from '../../components/gradient'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import Api from '../../Api'

const Dashboard = () => {
    const [menu, setMenu] = useState(false);
    const [cp, setCp] = useState(true)
    const [cr, setCr] = useState(false)
    const [dados, setDados] = useState(false);
    const [dep, setDepartamento] = useState('Contas a Pagar')

    const {state} = useContext(UserContext);

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity  onPress={() => setMenu(true)}>
                    <MenuIcon
                        fill={secundary}
                        style={{marginRight:20}}
                        width={25}
                        height={25}
                />
                </TouchableOpacity>
            ),
        })
     
    },[])

    useEffect(() => {
       contasPagar();
    },[])

    async function contasPagar(){
        setDepartamento('Contas a Pagar');
        setCp(true)
        setCr(false)
        const formData = new FormData();

        formData.append('token', state.user.token);
        formData.append('id', state.user.id);
        formData.append('usuarios_id', state.user.usuarios_id);

        const res = await Api.DashboardContasPagar(formData);

        setDados(res);
    }

    async function contasReceber(){
      setDepartamento('Contas a Receber');
      setCp(false)
      setCr(true)
      //const formData = new FormData();

      // formData.append('token', state.user.token);
      // formData.append('id', state.user.id);
      // formData.append('usuarios_id', state.user.usuarios_id);

      // const res = await Api.DashboardContasPagar(formData);

      // setDados(res);
  }

 
      const d = new Date();
      const m = d.getMonth() +1;


      const meses = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
      ]


    const screenWidth = Dimensions.get("window").width -20;

   

    const dataPizza =  [
      {
        name: "Seoul",
        population: 21500000,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Toronto",
        population: 2800000,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Beijing",
        population: 527612,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "New York",
        population: 8538000,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Moscow",
        population: 11920000,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }
    ];

    const chartConfig = {
       
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  legendFontSize:29,
                  propsForHorizontalLabels: {
                    fontSize: '10',
                  },
                  style: {
                    borderRadius: 2,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "7",
                    stroke: primary,
                                }
                }
    const chartConfig1 = {

      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(0, 67, 90, 0.5)`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      propsForHorizontalLabels: {
        fontSize: '10',
      },
      style: {
        borderRadius: 2,
      
      },
      propsForDots: {
        r: "3",
        strokeWidth: "1",
        stroke: secundary
      }
    }
    

    return (
       
        <Container>
            <ScrollView
            style={{maxHeight:120}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
                <ViewDepartamento>
                  <Departamento onPress={() => contasPagar()}>
                    <ContasPagarIcon width={33} height={33} fill={cp ? '#fff' : '#00435a'}/>
                  </Departamento>
                <TitleDepartamento>Contas</TitleDepartamento> 
                <TitleDepartamento>a Pagar</TitleDepartamento>
                </ViewDepartamento>
                <ViewDepartamento>
                  <Departamento onPress={() => contasReceber()}>
                     <ContasReceberIcon width={33} height={33} fill={cr ? '#fff' : '#00435a'}/>
                  </Departamento>     
                  <TitleDepartamento>Contas</TitleDepartamento>  
                  <TitleDepartamento>a Receber</TitleDepartamento>  
                </ViewDepartamento>
                <ViewDepartamento>
                  <Departamento>
                     <ClientesIcon width={33} height={33} fill={'#00435a'}/>
                  </Departamento>     
                  <TitleDepartamento>Clientes</TitleDepartamento>  
           
                </ViewDepartamento>   
                <ViewDepartamento>
                  <Departamento onPress={() => contasPagar()}>
                    <LotesIcon width={33} height={33} fill={'#00435a'}/>
                  </Departamento>
                <TitleDepartamento>Lotes</TitleDepartamento> 
                  </ViewDepartamento>
                <ViewDepartamento>
                  <Departamento>
                     <ProdutosIcon width={33} height={33} fill={'#00435a'}/>
                  </Departamento>     
                  <TitleDepartamento>Produtos</TitleDepartamento>  
           
                </ViewDepartamento>                 
                            
            </ScrollView>
            <Title>{dep}</Title>
        <View style={{marginTop: 12, alignItems:'center'}}>
               {dados[0] && (
                <LineChart
                data={
                  {labels: [meses[m - 6],meses[m - 5],meses[m - 4],meses[m - 3],meses[m - 2],meses[m -1]],
                    datasets: [
                      {
                        data: [dados[5].valor, dados[4].valor, dados[3].valor, dados[2].valor, dados[1].valor, dados[0].valor]
                      }
                    ]}
                }
                width={screenWidth} // from react-native
                height={200}
                horizontalLabelRotation={-39}
                yAxisSuffix=""
                decimalPlaces={2}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                                    
                }}
             
              />
              )} 

              {/* <PieChart
                data={dataPizza}
                width={screenWidth}
                height={250}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 10]}
                absolute
              /> */}

            {dados && (
                <BarChart
                style={{marginTop:15}}
                data={{labels: [meses[m - 6],meses[m - 5],meses[m - 4],meses[m - 3],meses[m - 2],meses[m -1]],
                  datasets: [
                    {
                      data: [dados[5].valor, dados[4].valor, dados[3].valor, dados[2].valor, dados[1].valor, dados[0].valor]
                    }
                  ]}}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig1}
                verticalLabelRotation={0}
                horizontalLabelRotation={-39}
              />
            )}
        </View>
      <Modal 
          animationType={'slide'}
          visible={menu}
          transparent={true}>
                   <View style={{
                       flex:1,
                       backgroundColor:'rgba(0,0,0,0.8)'
                   }}>
                    <ViewModalDashboard>
                        <Close onPress={() => setMenu(false)}>
                                <TextClose>X</TextClose>
                            </Close>
                            <Title>Escolha um departamento</Title>
                             
                    </ViewModalDashboard>
                   </View>
                </Modal>
</Container>
    );
}

export default Dashboard;