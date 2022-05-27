export function inspect()
{
    return function(
        target : any,
        propertyKey : string,
        descriptor : PropertyDescriptor
    )
    {
        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args : any[])
        {
            console.log(`____metodo: ${propertyKey}`);            
            console.log(`_________parametros: ${JSON.stringify(args)}`);
            const retorno = metodoOriginal.apply(this,args);
            console.log(`_________retorno: ${JSON.stringify(retorno)}`);            
            return retorno
        }


        return descriptor;
    }
}