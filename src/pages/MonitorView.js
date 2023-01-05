import React,{useState,useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getPosMoviles} from '../functions/monitor'
import L from 'leaflet';


import { MapContainer, TileLayer, useMap, Marker,Popup,LayersControl } from 'react-leaflet'



const monitoresDB = 
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
    }

const capaMovil = [
    {
        id:'1',
        nombre:'Principal'
    },
    {
        id:'3',
        nombre:'Terrestre'
    },
    {
        id:'5',
        nombre:'Naves Alimento'
    },
    {
        id:'22',
        nombre:'TECSAT'
    }
]

const posMov = [
    {
        asset_id: "5cf536b12eadd",
        nombre_ref: "AQUAMARINE",
        timestamp: "2023-01-04 10:45:00",
        latitud: "-42.4478",
        longitud: "-72.788",
        velocidad: null,
        direccion: null,
        timezone: 0
    },
    {
        asset_id: "5cf539bf33ff5",
        nombre_ref: "DON YUYO",
        timestamp: "2023-01-04 10:48:03",
        latitud: "-43.1239",
        longitud: "-73.6212",
        velocidad: null,
        direccion: null,
        timezone: 0
    }

]

const posEst = [
    {
        id: 9163,
        nombre: "Ã‘ilque Chilebreed",
        data_coordenadas: "-40.72516132694476,-72.43446332002425"
    },
    {
        id: 9164,
        nombre: "Charleo S.Dalcahue",
        data_coordenadas: "-39.12613720943851,-72.62975507494835"
    },
    {
        id: 9165,
        nombre: "Pisc. Lleuque (Cherquenco) S.Dalcahue",
        data_coordenadas: "-39.7263,-72.05026388888889"
    },
    {
        id: 9166,
        nombre: "Pisc.Gorbea S.Dalcahue",
        data_coordenadas: "-39.14965427746829,-72.65142909313541"
    }
]

const Home = () => {

    const [monitor,setMonitor] = useState(monitoresDB)
    const [capasMov,setCapasMov] = useState(capaMovil)

    
    const [posMoviles,setPosMoviles] = useState([])
    const [posEstaticos,setPosEstaticos] = useState(posEst)

    
    const {monitorId,hash,capaId} = useParams()

    useEffect(() => {
        loadposmoviles()
    },[])

    const puertoVerdeSVG = `<svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">
    <g id="svg_5">
        <path id="svg_4" fill="#24E711" stroke="black" stroke-width="35" d="m284.32248,383.34052c0,0 108.72562,-182.14384 110.42551,-261.14989c1.23282,-57.01979 -44.70624,-104.29561 -102.51938,-105.50738c-57.81305,-1.21177 -105.75076,44.09697 -106.97943,101.11675c-1.7041,79.00191 99.0733,265.54051 99.0733,265.54051z"/>
    </g>
</svg>`;
const puertoVerdeSVGUrl = encodeURI("data:image/svg+xml," + puertoVerdeSVG).replace('#', '%23');

 const iconoPuertoVerde = L.icon({
            iconUrl: puertoVerdeSVGUrl,
            iconSize: [40, 25],
        });
    const loadposmoviles = () => getPosMoviles(monitorId,hash,capaId).then(c => setPosMoviles(c.data))
   
    const mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
    const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    const mapboxToken = 'pk.eyJ1IjoicGF0YWdvbmlhY2xvdWQiLCJhIjoiY2p2Y2t5NDlzMDN4YTQ0cGxzeXpzNHlldyJ9.npDBOov6yxChmfccZn0Vsg';

    return (
        <div>
            <div>
            <ul class="nav justify-content-center navMonitor">
            
            <li class="nav-item">
                <Link class="nav-link" href="#">Mapas</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" href="#">Tracks Activos</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" href="#">Restricciones</Link>
            </li>
            </ul>
            </div>
            <div>
            <MapContainer
            center={[-41.4906, -72.92951]}
            zoom={8}
            scrollWheelZoom={false}
            style={{ height: '100vh', width: '100wh' }}
            >
          <TileLayer
            attribution={mapboxAttribution}
            url={mapboxUrl}
            id='mapbox/streets-v11'
            accessToken={mapboxToken}
          />
          <LayersControl position="topright">
          
          </LayersControl>
          {posEstaticos.map(c => (
          <Marker icon={iconoPuertoVerde} position={[c.data_coordenadas.split(',')[0], c.data_coordenadas.split(',')[1]]}>
            <Popup>
              {c.nombre}
            </Popup>
          </Marker>))}
          
{posMoviles.map(c => (
    <Marker position={[c[0].latitud, c[0].longitud]}>
      <Popup>
        {c.nombre_ref}
      </Popup>
    </Marker>))}
        </MapContainer></div>
        </div>
    )
}

export default Home

/*

    */