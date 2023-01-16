import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {ReactComponent as MonitorIcon} from '../img/monitor.svg'
import {ReactComponent as OrgIcon} from '../img/org.svg'
import {ReactComponent as Arrow} from '../img/arrow.svg'
import { useLiveQuery } from "dexie-react-hooks";

import {db} from '../db'



const Home = () => {

    

  const { monitores } = db

  const monitorData = useLiveQuery(
    () => monitores.toArray()
  );

return (
    <div className=" mb-5 ">
        <div className='monitores-title'>
        <h5 className='text-center Orbitron'>MIS MONITORES</h5>
        </div>
        
        <div className='row mt-3'>
            
       

        </div>
        
    </div>
)
}

export default Home