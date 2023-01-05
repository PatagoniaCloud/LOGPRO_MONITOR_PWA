import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'

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


    return (
        <div className="pt-3 mb-5 ">
            <h4 className='text-left ml-3 Orbitron'>Mis Monitores</h4>
            <div className='row'>
                
            {monitores.map(c => (<div className='col-md-6 '>
            <div class="card mb-2" style={{width:'100 %'}}>
            <div class="card-body">
                <h5 class="card-title">Empresa: {c.empresa}</h5>
                <h6 class="card-subtitle mb-2  ">Monitor nro: {c._id}</h6>
                <Link to={`/monitor/${c._id}/${c.token}/1`} class="btn btn-dark mt-2 w-100">Ver monitor</Link>
            </div>
            
            </div></div>

            ))}

            </div>
            
        </div>
    )
}

export default Home