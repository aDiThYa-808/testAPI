import * as http from 'http';

export function startServer(port: number):void{
    const server = http.createServer((req,res)=>{
        res.writeHead(200,{'Content-Type': 'text/plain'});

        res.end('Wassgoodd brooo!!\n');
    });

    server.listen(port,'localhost',()=>{
        console.log(`server running at http://localhost:${port}/`);
    })
}