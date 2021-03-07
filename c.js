const fs = require('fs');
const translate = require('@vitalets/google-translate-api');
const util = require("util");

var toJSON = require('plain-text-data-to-json')

function name() {

    fs.readFile('./SCRIPTS/ANIMAL INTERACTIONS/BIRTH_1087.txt', 'utf16le', function (err, data) {
        // Timer.set_time(data.length)
        // console.log(data);
        console.log(`./build/SCRIPTS/ANIMAL INTERACTIONS/BIRTH_1087.txt => ใช้เวลา ${data.length / 100} วินาที`);
        //    console.log(`${data}`);
        // var doc = toJSON(data)
        // console.log(doc);
        // fs.writeFileSync('output.json', JSON.stringify(doc, null, 2) + '\n')

        // fs.writeFileSync('./test/a.json', [ { text:`${data}`  }], 'utf8')
        //    console.log(content);
        translate(data, {to: 'th'}).then(res => {
            console.log(res.text.toUpperCase());
            //=> I speak English
            fs.writeFileSync('a.txt', res.text.toUpperCase(), 'utf8')
            console.log(res.from.language.iso);
            //=> nl
        }).catch(err => {
            console.error(err);
        });
    })
}

name()