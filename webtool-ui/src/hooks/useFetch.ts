import {useEffect, useState} from "react";
import fetch from "../classes/fetch.ts";

function useFetch(url:string, methode : any|null|undefined, header:any|null|undefined, body:any|null|undefined, exec: boolean){
    const [data, setData] = useState<any|null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any|null>(null)

    useEffect(()=>{
        const builder = new fetch.Builder(url)
        builder.setMethode(methode)
        builder.setHeaders(header)
        builder.setBody(body)
        if(exec) {
            setLoading(true)

            const fetch = builder.build()

            fetch.json()
                .then(res=>setData(res))
                .catch(e=>setError(e))
                .finally(()=>setLoading(false))

            return () => fetch.abort();
        }
    }, [url, exec])

    return {loading, data, error}
}

export default useFetch
