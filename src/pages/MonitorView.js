import React,{useState,useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getPosMoviles, getPosEstaticos} from '../functions/monitor'
import L from 'leaflet';
import { useNavigate } from 'react-router-dom'


import { MapContainer, TileLayer, useMap, Marker,Popup,LayersControl,LayerGroup,Circle } from 'react-leaflet'



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


const Home = () => {

    const [monitor,setMonitor] = useState(monitoresDB)
    const [capasMov,setCapasMov] = useState(capaMovil)

    
    const [posMoviles,setPosMoviles] = useState([])
    const [posEstaticos,setPosEstaticos] = useState([])

    
    const {monitorId,hash,capaId} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        loadposmoviles()
        loadposestaticos()
    },[navigate])

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
    const loadposestaticos = () => getPosEstaticos(monitorId,hash,capaId).then(c => setPosEstaticos(c.data))
   
    const mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
    const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
    const mapboxToken = 'pk.eyJ1IjoicGF0YWdvbmlhY2xvdWQiLCJhIjoiY2p2Y2t5NDlzMDN4YTQ0cGxzeXpzNHlldyJ9.npDBOov6yxChmfccZn0Vsg';

    return (
        <div>
            <div>
            <ul class="nav justify-content-center navMonitor">
            
            <li class="nav-item">
                <Link class="nav-link" href="#" style={{fontWeight:'600'}}>MAPAS</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" href="#" style={{fontWeight:'600'}}>TRACKS</Link>
            </li>
            <li class="nav-item">
                <Link class="nav-link" href="#" style={{fontWeight:'600'}}>RESTRICCIONES</Link>
            </li>
            </ul>
            </div>
            <div>
            <MapContainer
            center={[-41.4906, -72.92951]}
            zoom={7}
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
          <LayersControl.Overlay checked name="Layer group with circles">
        <LayerGroup>
          
          <LayerGroup>
            <Circle
              center={[51.51, -0.08]}
              pathOptions={{ color: 'green', fillColor: 'green' }}
              radius={100}
            />
          </LayerGroup>
        </LayerGroup>
      </LayersControl.Overlay>
          </LayersControl>
          {posEstaticos.map(c => (
          <Marker icon={iconoPuertoVerde} position={[c[0].data_coordenadas.split(',')[0], c[0].data_coordenadas.split(',')[1]]}>
            <Popup>
              {c.nombre}
            </Popup>
          </Marker>))}
          
{posMoviles.map(c => (
    <Marker position={[c[0].latitud, c[0].longitud]}>
      <Popup>
        {c[0].nombre_ref}
      </Popup>
    </Marker>))}
        </MapContainer></div>
        </div>
    )
}

export default Home

/*

    */