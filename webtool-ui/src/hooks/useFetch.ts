import {useEffect, useState} from "react";

function useFetch(url:string, methode : any|null|undefined, header:any|null|undefined, body:any|null|undefined, exec: boolean){
    const [data, setData] = useState<any|null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any|null>(null)

    useEffect(()=>{
        if(exec) {
            setLoading(true)

            const abort = new AbortController();
            const signal = abort.signal;

            fetch(encodeURI(url), {
                signal,
                method: methode ? methode : "GET",
                headers: header ? header : undefined,
                body: body ? JSON.stringify(body) : undefined
            })
                .then(res => res.json())
                .then(res => setData(res))
                .catch(e => setError(e))
                .finally(() => setLoading(false))

            return () => abort.abort();
        }
    }, [url, exec])

    return {loading, data, error}

}

export default useFetch
