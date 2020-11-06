//first simple server
const fs = require('fs')
const http = require('http')
const url = require('url') 


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObject = JSON.parse(data);

const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const contentTypeHtml = {'Content-type': 'text/html'}

const replaceTemplate = (temp,product)=>{

    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName)
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%FROM%}/g,product.from);
    output = output.replace(/{%NUTRIENTSCTNAME%}/g,product.nutrients);
    output = output.replace(/{%QUANTITY%}/g,product.quantity);
    output = output.replace(/{%PRICE%}/g,product.price);
    output = output.replace(/{%DESCRP%}/g,product.description);
    output = output.replace(/{%ID%}/g,product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');

    return output

}

//create server
const server = http.createServer((req,res)=>{

    const pathName = req.url;

    //overview
    if(pathName === '/' || pathName === '/overview'){
        res.writeHead(200,contentTypeHtml)

        const cardHtml = dataObject.map(card => replaceTemplate(templateCard,card)).join('');
        // console.log("cardHtml", cardHtml)
        const output = templateOverview.replace('{%PRODUCT_CARD%}', cardHtml)

        return res.end(output)
    }

    //produc
    if(pathName === '/product'){
        return res.end('this is product route')
    }

    //api
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

        //404
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



