import mongoose, { ConnectOptions } from "mongoose"
import { Database } from "../interfaces/DatabaseInterface"
import { ModelWiki, WikiModel} from "../interfaces/ModelInterface"

class MongoDB extends Database 
{
    public mongourl:string;
    public configOptions:object
    public app:any
    /**
     * Conectar la base de datos
     * @version 1.0.0
     * @returns {void}
     */
    connect(app:() => void):string
    {
        this.app = app
        const options = this.setOptions();
        const url = this.getUrlConnection();
        mongoose.connect(url)
        this.test_connection()

    }

    /**
     * Método para obtener la url de conexión a la base de datos
     * 
     * @@version 1.0.0
     * @returns {string} Url de conexión
     */
    getUrlConnection():string 
    {
        this.mongourl = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.dbname}?authSource=admin`
        return this.mongourl
    }

    /**
     * Método para configurar las opciones básicas de la configuración de la Base de Datos
     * @version 1.0.0
     * @param options 
     * @returns {object} Configuración
     */
    setOptions(options:object={}):object
    {   
        if(!options){
            return this.configOptions = {
                useNewUrlParser: true,
                autoIndex: false, 
                  maxPoolSize: 10, 
              }
        }
        else {
            return this.configOptions = options;
        }
        
    }
    /**
     * Crear un modelo en la base de datos
     * 
     * @version 1.0.0
     * @param ModelWiki
     * @return {void}
     */
    create_model({name, data}:ModelWiki)
    {
        const schema = new mongoose.Schema(data)
        const model = mongoose.model(name, schema)
    }

    /**
     * Función para salvar los datos de un modelo
     * @param model 
     */
    save_data(model:WikiModel)
    {
        const name_model = model.getName()
        const data_model = model.getData()
        const schema = new mongoose.Schema(data_model)
        mongoose.model(name_model, schema)

    }

    test_connection()
    {
        mongoose.Promise = global.Promise;
        console.log("Probando conexión con MongoDB");
        mongoose.connect(this.mongourl)
        .then(() => {
            console.log('MongoDB está conectada')
            this.app.emit("go")
        })
        .catch(err => {
            console.error('Fallo de conexión en MongoDB. Se reintentará la conexión en 2 segundos', err)
            setTimeout(this.test_connection, 2000)
        })
    }
}