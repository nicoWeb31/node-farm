//first simple server
const fs = require('fs')
const http = require('http')
const url = require('url') 


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObject = JSON.parse(data);


//create server
const server = http.createServer((req,res)=>{

    const pathName = req.url;

    if(pathName === '/' || pathName === '/overview'){
        return res.end('this is overview')
    }
    if(pathName === '/product'){
        return res.end('this is product route')
    }
    if(pathName === '/api'){

        
        //not good
        // fs.readFile(`${__dirname}/dev-data/data.json`,'utf-8',(err,data)=>{
        //     const productData = JSON.parse(data)
        //     //console.log("productData", productData)
        //     res.writeHead(200,{
        //         'Content-type': 'application/json'
        //     })
        //     return res.end(data)
        // })

        res.writeHead(200,{
            'Content-type': 'application/json'
            })

            return res.end(data)
    }


    return res.writeHead(404,{
        'Content-type': 'text/html',
        'my-own-header': 'hello world'
    },(req,res)=>{
        
        res.end('<h1>page not found ! </h1>')
    })

})


server.listen(5004,'127.0.0.1',()=>{
    console.log('listen on port 5004')
})



