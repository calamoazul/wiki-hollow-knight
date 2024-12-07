import mongoose from 'mongoose';
import ENVVARS from '../config/config';
import type { ModelWiki, WikiModel } from './ModelInterface';

export type DB = {

    connection:string
    type:string
    host:string
    username:string
    dbname:string
    password:string
    port:number

}


export interface DatabaseInterface<DB>
{
    connection:string
    type:string
    host:string
    username:string
    dbname:string
    password:string
    port:number

}



export class Database implements DatabaseInterface<DB> 
{
    public connection:string
    public type:string
    public host:string
    public username:string
    public dbname:string
    public password:string
    public port:number

    constructor({connection, type, host, username, password, port}:DB)
    {
        this.connection = connection
        this.type = type
        this.host = host
        this.username = username,
        this.password = password,
        this.port = port
    }
}


export class MongoDB extends Database 
{
    
    /**
     * Conectar la base de datos
     * @version 1.0.0
     * @returns void
     */
    connect()
    {
        return mongoose.connect(`mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.dbname}?authSource=admin`)
    }

    /**
     * Crear un modelo en la base de datos
     * 
     * @version 1.0.0
     * @param ModelWiki
     * @return void
     */
    create_model({name, data}:ModelWiki)
    {
        const schema = mongoose.schema(data)
        const model = mongoose.model(name, schema)
    }

    async save_data(model:WikiModel)
    {
        const name_model = model.getName()
        const data_model = model.getData()
        const schema = new mongoose.Schema(data_model)
        const entry = mongoose.model(name_model, schema)

        await entry.save()
    }
}