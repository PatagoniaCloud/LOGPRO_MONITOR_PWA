import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { useLiveQuery } from "dexie-react-hooks";

import {db} from '../db'


const Header = () => {


  const { monitores } = db

  const monitorData = useLiveQuery(
    () => db.monitores.toArray()
  );



  return (
      
      <nav className="navbar navbar-expand-lg navbar-dark navPat" >
      <a className="navbar-brand Orbitron" style={{color:'white'}}  href="/">Monitor Log<span style={{fontWeight: '800'}}>Pro</span></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav ">
        <li className="nav-item dropdown ">
          <a style={{color:'white'}} className="nav-link dropdown-toggle " href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            MONITORES
          </a>
          <div className="dropdown-menu " aria-labelledby="navbarDropdown">
            {monitorData?.map(c=>(
              <Link className="dropdown-item" key={c._id}  to={`/${c._id}`}>Monitor: {c._id} {c.empresa}</Link>
            ))}
          </div>
        </li>
        </ul>
      </div>
    </nav>

  )
}

export default Header