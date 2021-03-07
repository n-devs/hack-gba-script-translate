const fs = require('fs');
const Timer = require('./Timer')
const translate = require('@vitalets/google-translate-api');

async function buildTranslate(files) {
    return await new Promise((resolve, reject) => {

        files.map(dataPath => {
            fs.readFile(dataPath.read.file, 'utf16le', function (err, data) {
             
                console.log(`${dataPath.write.file} => ${data.length} ตัวอักษร`);
                translate(data, { from: "en", to: "th" }).then(res => {
                    // console.log(res.text);
                    // console.log('OK: ' + F_MAIN + "/" + folder + "/" + file);
                    //=> I speak English
                    // console.log(res.from.language.iso);
                    
                    fs.writeFileSync(dataPath.write.file, res.text.toUpperCase(),"utf8", function (err) {
                        if (err) {
                            if (err) throw reject(err);
                        }

                        console.log("บันทึกไฟล์แลัว");
                    });
                }).catch(e => {
                    if (!fs.existsSync(dataPath.writeError.folder)) {
                        fs.mkdir(dataPath.writeError.folder, { recursive: true }, (err) => {
                            if (err) throw reject(err);

                            if (!fs.existsSync(dataPath.writeError.file)) {
                                if (err) throw reject(err);

                                fs.writeFileSync(dataPath.writeError.file, data,"utf8", function (err) {
                                    if (err) {
                                        if (err) throw reject(err);
                                    }
            
                                    console.log("บันทึกไฟล์ error แลัว");
                                });
                            }   
                        })
                    }
                })
            })
        })
       
    })
}

module.exports = buildTranslate;