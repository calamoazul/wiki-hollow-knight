
/**
 * Importación de configuración
 */

import config from './config.json'

/**
 * Confirmación del entorno de desarrollo
 */

const env:string = process.env.NODE_ENV || 'development'

/**
 * Carga de las variables de entorno
 */
const envConfig = config[env];

Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key]
})


const ENVVARS = process.env;

export default ENVVARS;