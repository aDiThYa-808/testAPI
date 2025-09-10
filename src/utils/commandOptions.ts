export interface initOptions {}

export interface startOptions{
    port: string
}

export interface addOptions{
    method:string,
    path:string,
    response:any,
    status?:number
}

export interface helpOptions {}