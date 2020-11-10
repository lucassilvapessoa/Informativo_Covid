      import React from 'react';
      import {useState,useEffect} from 'react';
      import {get} from 'axios'
      import ReactDOM from 'react-dom';
      import logo from './simboloCovid.jpg';
      import './App.css';
      import M from 'materialize-css'
      import { Col, Container, Row, Select} from 'react-materialize';


    function Teste(){
    const [listtinformation,setList] = useState([])
    const [countrySelected,setCountrySelected] = useState(null)


    useEffect(()=>{
      async function getInformacoes(){
        const dados =  await get('https://corona-api.com/countries')
        setList([...dados.data.data])
      }
      getInformacoes()
    },[])

    function trocou(e){
    let objetoSlecionado = listtinformation.filter(x=> x.name == e.target.value)
    setCountrySelected(objetoSlecionado['0'])
    }
      return (
        <>
        {listtinformation ?  <div className="container border-top" style={{color:"#ffffff"}}>
          <Row>
            <Col className="s12  green lighten-4">
            <img src={logo} width={"120"} height={"120"}></img>
            </Col>
            <Col className="s12">
            <select   className="browser-default green lighten-4 " onChange={(e)=> trocou(e)}>
              {listtinformation.map(x=>{
                return <option> {x.name}</option>
              })}
          </select>
            </Col>
          </Row>
            {countrySelected != null ? <> 
            <div style={{border:"1px solid black",textAlign:"center",borderRadius:"20px",color:"black"}}>
            <h2 > {countrySelected.name }</h2> 
            <hr style={{width:"80%",backgroundColor:"white"}}/>
            <h3> Código: {countrySelected.code}</h3>
            <h4>Total população:{countrySelected.population}</h4>
            </div>
            </> : null}
          <Row>
          </Row>
            {countrySelected != null ? <> 
            <div style={{border:"1px solid black",textAlign:"center",borderRadius:"20px",background:"#a5d6a7"}}>
              <h3>Casos Recuperados</h3>
              <hr style={{width:"80%",backgroundColor:"white"}}/>
            <h4>Total de casos recuperados : {countrySelected.latest_data.recovered}</h4>
            </div>
            </> : null}
          <Row>
          </Row>
            {countrySelected != null ? <> 
            <div style={{border:"1px solid black",textAlign:"center",borderRadius:"20px",background:"#e53935"}}>
            <h3>Óbitos | Novos Casos</h3>
            <hr style={{width:"80%",backgroundColor:"white"}}/>
            <h4>Total de confirmados:{countrySelected.latest_data.confirmed}</h4>
            <h4>Total de mortes:{countrySelected.latest_data.deaths}</h4>
            <h4>Estado Crítico:{countrySelected.latest_data.critical}</h4>
            <h4>{countrySelected.updated_at}</h4>
            </div>
            </> : null}
          <Row>

          </Row>
            {countrySelected != null ? <> 
            <div style={{border:"1px solid black",textAlign:"center",borderRadius:"20px",background:"#ef5350"}}>
            <h3>Informações adicionais</h3>
            <hr style={{width:"80%",backgroundColor:"white"}}/>
            <h4>Índice de mortalidade:{countrySelected.latest_data.calculated['death_rate'] > 0 ? 
             parseFloat(countrySelected.latest_data.calculated['death_rate'].toFixed(2)):null}</h4>
            </div>
            </> : null}
          <Row>
          
          </Row>
        </div> :null}
      </>
      )
    }

    ReactDOM.render(
      <React.StrictMode>
      <Teste/>
      </React.StrictMode>,
      document.getElementById('root')
    );

