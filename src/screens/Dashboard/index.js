import React, {useEffect, useState, useContext} from 'react';
import { Modal, TouchableOpacity, View, Dimensions, ScrollView } from 'react-native';
import { UserContext } from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/core';
import MenuIcon from '../../assets/menu.svg'
import HomeIcon from '../../assets/home.svg'
import ContasReceberIcon from '../../assets/contasReceber.svg'
import ContasPagarIcon from '../../assets/payday.svg'
import ProdutosIcon from '../../assets/compras.svg';
import CodigoIcon from '../../assets/barcode.svg';
import ClientesIcon from '../../assets/person.svg';
import LotesIcon from '../../assets/lote.svg'
import S from './styles';
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
import Preloader from '../../components/preloader';

const Dashboard = () => {
    const [menu, setMenu] = useState(false);
    const [pizza, setPizza] = useState(false);
    const [cp, setCp] = useState(false)
    const [ho, setHo] = useState(true)
    const [cr, setCr] = useState(false)
    const [dados, setDados] = useState(false);
    const [legendas, setLegendas] = useState([]);
    const [dep, setDepartamento] = useState('Contas a Pagar')
    const [preloader, setPreloader] = useState(false);

    const {state} = useContext(UserContext);

    const navigation = useNavigation();

    // useEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <TouchableOpacity  onPress={() => setMenu(true)}>
    //                 <MenuIcon
    //                     fill={secundary}
    //                     style={{marginRight:20}}
    //                     width={25}
    //                     height={25}
    //             />
    //             </TouchableOpacity>
    //         ),
    //     })     
    // },[])

    useEffect(() => {
       home();
    },[])

    async function home(){
      setPreloader(true);
      setDepartamento('Home');
      setCp(false)
      setCr(false)
      setHo(true)
      setDados(false)
      const formData = new FormData();

      formData.append('token', state.user.token);
      formData.append('id', state.user.id);
      formData.append('usuarios_id', state.user.usuarios_id);

      const res = await Api.Dashboard(formData);

      const v1 = res[0].valor.split('.');
      const v2 = res[1].valor.split('.');

      setPreloader(false);

      setPizza([
        {
          name: 'Contas a Pagar',
          color: 'tomato',
          total: v1[0],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15
        },
        {
          name: 'Contas a Receber',
          color: '#38c0bb',
          total: v2[0],
          legendFontColor: '#7F7F7F',
          legendFontSize: 15
        },
      ]);
  }

    async function contasReceber(){
      setPreloader(true);
      setDepartamento('Contas a Receber');
      setCp(false)
      setHo(false)
      setCr(true)
      const formData = new FormData();

      formData.append('token', state.user.token);
      formData.append('id', state.user.id);
      formData.append('usuarios_id', state.user.usuarios_id);

      const res = await Api.DashboardContasReceber(formData);

      setPreloader(false);
      setDados(res);
      setPizza(false);
  }

    async function contasPagar(){
        setPreloader(true);
        setDepartamento('Contas a Pagar');
        setCp(true)
        setHo(false)
        setCr(false)
        const formData = new FormData();

        formData.append('token', state.user.token);
        formData.append('id', state.user.id);
        formData.append('usuarios_id', state.user.usuarios_id);

        const res = await Api.DashboardContasPagar(formData);

        setPreloader(false);
        setDados(res);
        setPizza(false);
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
       
        <S.Container>
          {preloader && <Preloader/>}
            <ScrollView
            style={{maxHeight:120}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
              <S.ViewDepartamento>
                    <S.Departamento onPress={() => home()}>
                      <HomeIcon width={33} height={33} fill={ho ? '#fff' : '#00435a'}/>
                  </S.Departamento>
                  <S.TitleDepartamento>Home</S.TitleDepartamento> 
           
                </S.ViewDepartamento>
                <S.ViewDepartamento>
                    <S.Departamento onPress={() => contasPagar()}>
                      <ContasPagarIcon width={33} height={33} fill={cp ? '#fff' : '#00435a'}/>
                  </S.Departamento>
                  <S.TitleDepartamento>Contas</S.TitleDepartamento> 
                  <S.TitleDepartamento>a Pagar</S.TitleDepartamento>
                </S.ViewDepartamento>
                <S.ViewDepartamento>
                  <S.Departamento onPress={() => contasReceber()}>
                     <ContasReceberIcon width={33} height={33} fill={cr ? '#fff' : '#00435a'}/>
                  </S.Departamento>     
                  <S.TitleDepartamento>Contas</S.TitleDepartamento>  
                  <S.TitleDepartamento>a Receber</S.TitleDepartamento>  
                </S.ViewDepartamento>
                <S.ViewDepartamento>
                  <S.Departamento>
                     <ClientesIcon width={33} height={33} fill={'#00435a'}/>
                  </S.Departamento>     
                  <S.TitleDepartamento>Clientes</S.TitleDepartamento>  
           
                </S.ViewDepartamento>   
                <S.ViewDepartamento>
                  <S.Departamento onPress={() => contasPagar()}>
                    <LotesIcon width={33} height={33} fill={'#00435a'}/>
                  </S.Departamento>
                <S.TitleDepartamento>Lotes</S.TitleDepartamento> 
                  </S.ViewDepartamento>
                <S.ViewDepartamento>
                  <S.Departamento>
                     <ProdutosIcon width={33} height={33} fill={'#00435a'}/>
                  </S.Departamento>     
                  <S.TitleDepartamento>Produtos</S.TitleDepartamento>  
           
                </S.ViewDepartamento>                 
                            
            </ScrollView>
            <S.Title>{dep}</S.Title>
        <View style={{marginTop: 12, alignItems:'center'}}>
               {dados && (
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

              {pizza && <PieChart
                data={pizza}
                width={screenWidth}
                height={250}
                chartConfig={chartConfig}
                accessor={"total"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 10]}
                absolute
                
              /> }

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
                    <S.ViewModalDashboard>
                        <S.Close onPress={() => setMenu(false)}>
                                <S.TextClose>X</S.TextClose>
                            </S.Close>
                           
                             
                    </S.ViewModalDashboard>
                   </View>
                </Modal>
</S.Container>
    );
}



export default Dashboard;