import axios from 'axios'

export const validarHash =  async (monitor,hash) =>{
    return await axios.get(`https://monitor.logpro.cl/view/${monitor}/${hash}`)
}

export const getRestriccionesBahias =  async (monitor,hash) =>{
    return await axios.get(`https://monitor.logpro.cl/api/get-restricciones-bahias/${monitor}/${hash}`)
}

export const getPosMoviles =  async (monitor,hash,capaId) =>{
    return await axios.get(`https://monitor.logpro.cl/api/get-pos-moviles/${monitor}/${hash}/${capaId}`)
}

export const getPosEstaticos =  async (monitor,hash,capaId) =>{
    return await axios.get(`https://monitor.logpro.cl/api/get-pos-estaticos/${monitor}/${hash}/${capaId}`)
}

export const getStatusActivos =  async (monitor,hash,capaId) =>{
    return await axios.get(`https://monitor.logpro.cl/api/get-status-activos/${monitor}/${hash}/${capaId}`)
}

export const getStatusProgramados =  async (monitor,hash,capaId) =>{
    return await axios.get(`https://monitor.logpro.cl/api/get-status-programados/${monitor}/${hash}/${capaId}`)
}