import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as MonitorIcon} from '../img/monitor.svg'
import {ReactComponent as OrgIcon} from '../img/org.svg'
import {ReactComponent as Arrow} from '../img/arrow.svg'


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

const Home = () => {

    
    const [monitores,setMonitores] = useState(monitoresDB)

    const arrow = <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <path d="M18.5528 11.7764L6.15777 5.57889C5.62585 5.31293 5 5.69972 5 6.29443V17.7056C5 18.3003 5.62585 18.6871 6.15777 18.4211L18.5528 12.2236C18.737 12.1315 18.737 11.8685 18.5528 11.7764Z" fill="#33363F"></path> </g></svg>

    return (
        <div className=" mb-5 ">
            <div className='monitores-title'>
            <h5 className='text-center Orbitron'>MIS MONITORES</h5>
            </div>
            
            <div className='row mt-3'>
                
            {monitores.map(c => (<div className='col-md-6 '>
            <div class=" mt-2 mb-2 " style={{width:'100 %',backgroundColor:'rgba(0, 0, 0, 0.06)'}}>
                
            <div class="card-body"><h6 class="card-subtitle mb-2  "><MonitorIcon /> MONITOR {c._id}</h6><hr/>
                <p >{c.empresa}</p>
                <hr/>
                <Link to={`/monitor/${c._id}/${c.token}/1`} class="btn btn-dark mt-2 w-100" style={{fontWeight:'600'}}>VER MONITOR </Link>
            </div>
            
            </div></div>

            ))}

            </div>
            
        </div>
    )
}

export default Home