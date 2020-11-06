const fs = require('fs')

//read file sync bloquing way
const textInput = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log("textInput", textInput)

//write file sync bloquing way
const textOut = `this is : ${textInput}.\nCreated on ${Date.now().toLocaleString()}`
fs.writeFileSync('./txt/output.txt', textOut)
console.log('file written!!')

//non blockin asyncron way
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if (err) return console.log(err)
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        if (err) return console.log(err)
        console.log("data2 assync func", data2)
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            if (err) return console.log(err)
            console.log("data3 assync func", data3)

            fs.writeFile('./txt/final.txt',`${data2}\n${data3}}`,'utf-8',err=>{
                if (err) return console.log(err)
                console.log('your file is been written !')
            })
        })
    })
})
console.log('lu avant l\'assychrone du dessu')
