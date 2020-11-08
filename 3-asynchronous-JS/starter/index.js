const fs = require('fs');
const superagent = require('superagent');

//build  a promise
const readFilePromise = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) return reject('Icould not find that file 🤗 ');
            resolve(data);
        });
    });
};

const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) return reject('Could not write file !');
            resolve('success!');
        });
    });
};

//consume promise
readFilePromise(`${__dirname}/dog.txt`)
    .then((data) => {
        console.log(`Breed: ${data}`);
        return superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
    })
    .then((response) => {
        console.log(response.body);
        return writeFilePromise('dog-img.txt', response.body.message);
    })
    .then(() => {
        console.log(`Rondom dog image savedto file !`);
    })
    .catch((err) => {
        console.log(err.message);
    });
