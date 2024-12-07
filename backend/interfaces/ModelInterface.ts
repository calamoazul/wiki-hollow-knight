
/**
 * TIpo de los modelos de la Wiki
 * @version 1.0.0
 */
export type ModelWiki = {
    name:string
    data:object
}


/**
 * Interfaz para modelo básico de la wiki
 * @version 1.0.0
 */
export interface ModelInterface<ModelWiki> 
{
    name:string
    data:object
}


/**
 * Modelo de datos básicos para la wiki
 * @version 1.0.0
 */
export class WikiModel implements ModelInterface<ModelWiki>
{
    public name:string
    public data:object


    constructor({name, data}:ModelWiki){
        this.name = name
        this.data = data
    }

    setName(name:string){
        this.name = name
    }

    getName():string {
        return this.name
    }

    setData(data:object)
    {
        this.data = data
    }

    getData():object {
        return this.data
    }
}