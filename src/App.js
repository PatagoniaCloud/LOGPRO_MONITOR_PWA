import React, { Fragment, useEffect,useState,useRef, useCallback } from 'react';
import { Routes ,Route } from 'react-router-dom';
import { Dexie } from 'dexie'
import { useLiveQuery } from "dexie-react-hooks";
import {db} from './db'

import Header from './components/Header'
import Home from './pages/Home'
import MonitorView from './pages/MonitorView'


//Funciones
import {getRestriccionesBahias} from './functions/monitor'

const monitoresDB = [
  {
      _id : '4',
      empresa : 'PATAGONIA CLOUDsa',
      numero_mapas : '2',
      pref_bahias : '{[{"id":"122","nombre":"ACHAO"},{"id":"118","nombre":"BAH\u00cdA ANCUD Y CANAL CHACAO"},{"id":"137","nombre":"BAH\u00cdA CHILOTA"}]}',
      pref_tracks : '{{"tracks_en_curso":"SI","tracks_programados":"NO"}}',
      pref_mapa_1 : '{{"nombre":"NORTE","latlng":"-41.4906, -72.92951","zoom":"9","capas_estaticas":[{"id":"23","nombre":"Clientes 2 - Est\u00e1tico"}],"capas_moviles":[{"id":"1","nombre":"Principal"}]}}',
      pref_mapa_2 : '{{"nombre":"SUR","latlng":"-51.742676928727256, -72.53993406169243","zoom":"8","capas_estaticas":[{"id":"17","nombre":"Clientes"}],"capas_moviles":[{"id":"1","nombre":"Principal"},{"id":"3","nombre":"Transporte terrestre"}]}}',
      pref_mapa_3 : '{{"nombre":"PUERTO MONTT","latlng":"-41.4906, -72.92951","zoom":"9","capas_estaticas":[{"id":"17","nombre":"Clientes"},{"id":"23","nombre":"Clientes 2 - Est\u00e1tico"}],"capas_moviles":[{"id":"1","nombre":"Principal"},{"id":"3","nombre":"Transporte terrestre"},{"id":"5","nombre":"Naves alimento"},{"id":"22","nombre":"TECSAT_WS"}]}}',
      rotacion : '30',
      orientation : 'HORIZONTAL',
      token : 'ef4f845d0ab910dd723bae8080996c42',
      completed : false
  },
  {
      _id : '5',
      empresa : 'SOUTHWAY',
      numero_mapas : '2',
      pref_bahias : '{[]}',
      pref_tracks : '{{"tracks_en_curso":"SI","tracks_programados":"SI"}}',
      pref_mapa_1 : '{{"nombre":"Nuevo mapa 1","latlng":"-41.4906, -72.92951","zoom":9,"capas_estaticas":[],"capas_moviles":[]}}',
      pref_mapa_2 : '{{"nombre":"Nuevo mapa 2","latlng":"-41.4906, -72.92951","zoom":9,"capas_estaticas":[],"capas_moviles":[]}}',
      pref_mapa_3 : '{{"nombre":"Nuevo mapa 3","latlng":"-41.4906, -72.92951","zoom":9,"capas_estaticas":[],"capas_moviles":[]}}',
      rotacion : '30',
      orientation : 'HORIZONTAL',
      token : '55c9599805496e3ba8bd866d55dc8dfd',
      completed : false
  }
]

const App = () => {




  const[monitores,setMonitores] = useState([])
  const[restricciones,setRestriccionesBahias] = useState([])

  
  const addData = async (number) => await db.monitores.put({...monitoresDB[number], id:parseInt(monitoresDB[number]._id)})
  
  
  useEffect(() => {

    //Guardar datos de monitor
    //Falta esto
    addData(0)

    //All abrir monitor obtener datos de IndexedDB
    console.log('Obtener Datos')
    const getIndexedDB = async() => {
      let allMonitores = await db.monitores.toArray()
      let restricciones = await db.restriccionesBahias.toArray()
      setMonitores(allMonitores)
      setRestriccionesBahias(restricciones)
    }

    getIndexedDB()

    //Intervalo para obtener datos cada Xs y guardar en IndexedDB
    setInterval(() => {

      //Funcion para Llamar restricciones de bahias por monitor y guardar en indexedDB
      const restBahias = async() => {
        
        //Llamar Monitores
        let allMonitores = await db.monitores.toArray()

        //Generar Array con Id monitor y Token
        let montId = allMonitores.map((c) =>{
          return [c._id,c.token]
        })

        //Por cada ID y Token realizar llamada a API y Guardar Json Response en Indexed DB con ID Monitor
        montId.forEach(element => {
          let rest = getRestriccionesBahias(element[0],element[1]).then(c => {
            // Si Id monitor Existe sobreescribir si no Crear
            db.restriccionesBahias.put({id:element[0],restricciones:c.data},element[0])
          })
          
        });

        //Llamar funcion indexedDB
        getIndexedDB()
          
      }

      restBahias()


    },10000)

  },[])

  
   

  return (
    <Fragment>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/monitor/:monitorId/:hash/:capaId' element={<MonitorView/>} />
      </Routes>
    </Fragment>
  );
}

export default App;