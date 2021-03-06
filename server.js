//first simple server
const fs = require('fs');
const http = require('http');
const url = require('url');
const slugyfi = require('slugify')

const replaceTemplate = require('./module/replaceTemplate');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const templateOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
);
const templateCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
);
const templateProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    'utf-8'
);

const contentTypeHtml = {
    'Content-type': 'text/html',
};

//creationn tableau de slug
const slug = dataObject.map((el) =>
    slugyfi(el.productName, {
        lower: true,
    })
);
//console.log("slug", slug)

//create server
const server = http.createServer((req, res) => {
    //const pathName = req.url;
    //console.log(req.url) recuperation url
    //console.log(url.parse(req.url, true)) //recuperation de la requete query return an object with true param

    const {
        pathname,
        query
    } = url.parse(req.url, true);

    //overview
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, contentTypeHtml);

        const cardHtml = dataObject
            .map((card) => replaceTemplate(templateCard, card))
            .join('');
        // console.log("cardHtml", cardHtml)
        const output = templateOverview.replace('{%PRODUCT_CARD%}', cardHtml);

        return res.end(output);
    }

    //produc
    if (pathname === '/product') {
        //console.log(query) recupere obj {id : 0}
        res.writeHead(200, contentTypeHtml);
        const product = dataObject[query.id];
        const ouput = replaceTemplate(templateProduct, product);

        return res.end(ouput);
    }

    //api
    if (pathname === '/api') {
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
        res.writeHead(200, {
            'Content-type': 'application/json',
        });

        return res.end(data);
    }

    return res.writeHead(
        404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello world',
        },
        (req, res) => {
            res.end('<h1>page not found ! </h1>');
        }
    );
});

server.listen(5004, '127.0.0.1', () => {
    console.log('listen on port 5004');
});