class fetchClass{
    private url :string
    private method: Method
    private headers : Object
    private body : string
    private readonly abortController :AbortController  = new AbortController()
    private readonly abortSignal :AbortSignal = this.abortController.signal

    constructor(url: string , method: string, headers: Object, body: string) {
        this.url = url
        this.method = Method[method as keyof typeof Method]
        this.headers = headers?headers:{}
        this.body = body?body:""
    }

    exec() : Promise<Response> {
        return new Promise((resolve, reject)=>{
            fetch(encodeURI(this.url), {
                signal: this.abortSignal,
                method : <string>this.method,
                headers : <HeadersInit>this.headers,
                body : this.body
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

    static Builder = class {
        private url : string
        private method: Method | null = null
        private headers : Object | null = null
        private body : string | null = null

        constructor(url:string) {
            this.url = url
        }

        setURL(url:string):void{
            this.url = url
        }

        setMethode(method: string){
            this.method = Method[method as keyof typeof Method]
        }

        setHeaders(headers: Object){
            this.headers = headers
        }

        setBody(body: Object){
            this.body = JSON.stringify(body)
        }

        build(): fetchClass{
            if(!this.method) this.method = Method.Get
            if(!this.body) this.body = ""
            if(!this.headers) this.headers={}
            return new fetchClass(this.url, this.method, this.headers, this.body)
        }
    }
}

enum Method {
    Get = "GET",
    Post = "POST",
    Put = "PUT",
    Delete = "DELETE"
}

export default fetchClass
