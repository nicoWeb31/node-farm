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

const getDogPic = async () => {
    try {
        const data = await readFilePromise(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        console.log(res.body);

        await writeFilePromise('dog-img.txt', res.body.message);
        console.log(`Rondom dog image savedto file !`);
    } catch (err) {
        console.log('err', err);
    }
    return console.log('2 : ok')
};
(async () => {
    try {
        console.log('1 : will get dog pics!' )
        const x = await getDogPic();
        console.log(x)
        console.log('3 : Done getting dog!' )
    } catch (err) {
        console.log('err:  💣 ')
    }
})();

//consume promise
// readFilePromise(`${__dirname}/dog.txt`)
//     .then((data) => {
//         console.log(`Breed: ${data}`);
//         return superagent.get(
//             `https://dog.ceo/api/breed/${data}/images/random`
//         );
//     })
//     .then((response) => {
//         console.log(response.body);
//         return writeFilePromise('dog-img.txt', response.body.message);
//     })
//     .then(() => {
//         console.log(`Rondom dog image savedto file !`);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });
