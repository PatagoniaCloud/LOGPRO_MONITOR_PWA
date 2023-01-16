import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as MonitorIcon} from '../img/monitor.svg'
import {ReactComponent as OrgIcon} from '../img/org.svg'
import {ReactComponent as Arrow} from '../img/arrow.svg'
import { useLiveQuery } from "dexie-react-hooks";

import {db} from '../db'
//Funciones
import {getRestriccionesBahias} from '../functions/monitor'



const Home = () => {

    
  const { monitores,restriccionesBahias } = db


  const monitorData = useLiveQuery(
    () => monitores.toArray()
  );


  
    const arrow = <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <path d="M18.5528 11.7764L6.15777 5.57889C5.62585 5.31293 5 5.69972 5 6.29443V17.7056C5 18.3003 5.62585 18.6871 6.15777 18.4211L18.5528 12.2236C18.737 12.1315 18.737 11.8685 18.5528 11.7764Z" fill="#33363F"></path> </g></svg>

return (
    <div className=" mb-5 ">
        <div className='monitores-title'>
        <h5 className='text-center Orbitron'>MIS MONITORES</h5>
        </div>
        
        <div className='row mt-3'>
            
        {monitorData?.map(c => (<div key={c._id} className='col-md-6 '>
        <div className=" mt-2 mb-2 "  style={{width:'100 %',backgroundColor:'rgba(0, 0, 0, 0.06)'}}>
            
        <div className="card-body"><h6 className="card-subtitle mb-2  Orbitron" style={{fontWeight:'600',letterSpacing:'2px',textAlign:'left'}}><MonitorIcon />   {c.empresa} </h6><hr/>
            
            <Link  to={`/monitor/${c._id}/${c.token}/1`} className="btn btn-dark mt-2 w-100" style={{fontWeight:'600'}}>Ir a Monitor {c._id}  </Link>
        </div>

        </div>
        </div>

        ))}

        </div>
        
    </div>
)
}

export default Home