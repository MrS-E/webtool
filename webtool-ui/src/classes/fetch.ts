class fetchClass{
    private url :string
    private method: keyof typeof fetchClass.Method
    private headers : HeadersInit
    private body : string
    private readonly abortController :AbortController  = new AbortController()
    private readonly abortSignal :AbortSignal = this.abortController.signal
    private mode : RequestMode

    constructor(url: string , init : {method: keyof typeof fetchClass.Method, headers: HeadersInit|null, body: string|null, mode:valueof<typeof fetchClass.Mode>}) {
        this.url = url
        this.method = init.method
        this.headers = init.headers?init.headers:<HeadersInit><unknown>null
        this.body = init.body?init.body:<string><unknown>null
        this.mode = init.mode?<RequestMode>init.mode:<RequestMode>"cors"
    }

    exec() : Promise<Response> {
        return new Promise((resolve, reject)=>{
            fetch(encodeURI(this.url), {
                signal: this.abortSignal,
                method: <string>this.method,
                headers: this.headers,
                mode: this.mode,
                body: this.body
            })
                .then(res=>resolve(res))
                .catch(e=>reject(e))
        })
    }

    json() : Promise<Object>{
        return new Promise((resolve, reject)=>{
            this.exec()
                .then(res=>res.json())
                .then(res=>resolve(res))
                .catch(e=>reject(e))
        })
    }

    text() : Promise<string>{
        return new Promise((resolve, reject)=>{
            this.exec()
                .then(res=>res.text())
                .then(res=>resolve(res))
                .catch(e=>reject(e))
        })
    }

    abort(){
        this.abortController.abort()
    }

    static Method = {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE"
    } as const

    static Mode = {
        CORS: "cors",
        NAVIGATE: "navigate",
        NO_CORS: "no-cors",
        SAME_ORIGIN: "same-origin"
    } as const;

    static Builder = class {
         url : string
         method: keyof typeof fetchClass.Method = fetchClass.Method.GET
         headers : HeadersInit = <HeadersInit><unknown>null
         body : string = <string><unknown>null
         mode: valueof<typeof fetchClass.Mode> = fetchClass.Mode.CORS;

        constructor(url:string) {
            this.url = url
        }

        setURL(url:string):void{
            this.url = url
        }

        setMethode(method: "GET"|"POST"|"PUT"|"DELETE"){
            this.method = fetchClass.Method[method]
        }

        setHeaders(headers: Object){
            this.headers = <HeadersInit>headers
        }

        setBody(body: Object){
            this.body = JSON.stringify(body)
        }

        setMode(mode: "cors" | "navigate" | "no-cors" | "same-origin"){
             this.mode = <RequestMode>mode
        }

        build(): fetchClass{
            return new fetchClass(this.url, {method: this.method, headers:this.headers, body:this.body, mode:this.mode})
        }
    }
}

type valueof<T> = T[keyof T];
export default fetchClass
