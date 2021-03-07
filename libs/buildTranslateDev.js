const fs = require('fs');
const Timer = require('./Timer')
const translate = require('@vitalets/google-translate-api');

async function buildTranslateDev(files) {
    return await new Promise((resolve, reject) => {
        // print time
        // const time_count = [0]
        var data_count = 0

        // Timer.start()
        Timer.fun = () => {

            fs.readFile(files[data_count].read.file, 'utf16le', function (err, data) {
                Timer.set_time(data.length)
                console.log(`${files[data_count].write.file} => ใช้เวลา ${data.length / 100} วินาที`);
                translate(data, { from: "en", to: "th" }).then(res => {
                    // console.log(res.text);
                    // console.log('OK: ' + F_MAIN + "/" + folder + "/" + file);
                    //=> I speak English
                    // console.log(res.from.language.iso);
                    
                    fs.writeFileSync(files[data_count].write.file, res.text.toUpperCase(),"utf8", function (err) {
                        if (err) {
                            if (err) throw reject(err);
                        }

                        console.log("บันทึกไฟล์แลัว");
                    });
                }).catch(e => {
                    if (!fs.existsSync(files[data_count].writeError.folder)) {
                        fs.mkdir(files[data_count].writeError.folder, { recursive: true }, (err) => {
                            if (err) throw reject(err);

                            if (!fs.existsSync(files[data_count].writeError.file)) {
                                if (err) throw reject(err);

                                fs.writeFileSync(files[data_count].writeError.file, data,"utf8", function (err) {
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


            if (data_count == files.length) {
                console.log("stop")
                this.stop();
                resolve("แปลภาษาเสร็จแล้ว 👏🏼")

            }

            data_count++

        };

        Timer.start()
    })
}

module.exports = buildTranslateDev;