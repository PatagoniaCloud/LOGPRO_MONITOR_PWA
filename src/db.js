import { Dexie } from 'dexie'


export const db = new Dexie( 'MonitoresDB')

db.version(3).stores({
    monitores: '++id, empresa, numero_mapas,pref_bahias,pref_tracks,pref_mapa_1,pref_mapa_2,pref_mapa_3,rotacion,orientation,token,completed',
    restriccionesBahias:'++id,restricciones'

});