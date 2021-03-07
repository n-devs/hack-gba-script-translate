const fs = require('fs');
const translate = require('translation-google');

const F_MAIN = "SCRIPTS";

function Folders(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            // console.log(files.length);
            resolve(files)
        })
    })
}

function Files(dir) {
    const count = []
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {


            resolve(files)
        })
    })
}



function App(dir) {
    return new Promise((resolve, reject) => {
        Folders(F_MAIN).then(folders => {
            const p_files = []
            const p_folders = []
            var count = 0;
            var c_folders = folders.length;

            folders.map(folder => {
                if (!fs.existsSync("./" + dir + "/" + folder)) {
                    console.log("./" + dir + "/" + folder);
                    fs.mkdirSync(dir + "/" + folder);
                } else {

                    p_folders.push(folder.length)

                    // if (p_folders.length === c_folders) {
                    // console.log(p_folders.reduce((partial_sum, a) => partial_sum + a, 0));

                    Files(F_MAIN + "/" + folder).then(files => {

                        // console.log(files);
                        // console.log(folders.length);
                        // console.log(p_folders.reduce((partial_sum, a) => partial_sum + a,0));
                        files.map(file => {

                            if (!fs.existsSync("./" + dir + "/" + folder + "/" + file)) {
                                count++

                                p_files.push({
                                    read: `${F_MAIN + "/" + folder + "/" + file}`,
                                    write: `${dir + "/" + folder + "/" + file}`
                                })
                                if (!fs.existsSync('./path')) {
                                    fs.mkdirSync('path');

                                } else {
                                    fs.appendFile('path/read.txt', `${F_MAIN + "/" + folder + "/" + file} \n`, function (err, data) {
                                        if (err) {
                                            return console.log(err);
                                        }

                                        console.log("The path read file was saved!");
                                    })

                                    fs.appendFile('path/write.txt', `${dir + "/" + folder + "/" + file} \n`, function (err, data) {
                                        if (err) {
                                            return console.log(err);
                                        }

                                        console.log("The path read file was saved!");
                                    })
                                }

                                // if (p_files.length === 1404) {
                                //     resolve(p_files)
                                // }


                                // console.log(p_files.length);

                                // if (p_files.length === count) {
                                //     console.log(p_files);
                                // }
                                // fs.readFile(F_MAIN + "/" + folder + "/" + file, 'utf8', function (err, data) {
                                //     if (err) throw err;

                                //     // console.log(data)
                                //     translate(data, { from: "en", to: "th" }).then(res => {
                                //         // console.log(res.text);
                                //         console.log('OK: ' + F_MAIN + "/" + folder + "/" + file);
                                //         //=> I speak English
                                //         // console.log(res.from.language.iso);

                                //         fs.writeFile(dir + "/" + folder + "/" + file, res.text, function (err) {
                                //             if (err) {
                                //                 return console.log(err);
                                //             }

                                //             console.log("The file was saved!");
                                //         });


                                //     }).catch(err => {
                                //         console.error(err);
                                //     });;

                                // });
                            }
                        })
                    })
                    // }


                }


            })
        })
    })
}

function Start() {
    const dir_build = './build';
    if (!fs.existsSync(dir_build)) {
        fs.mkdirSync(dir_build);

    } else {
        if (!fs.existsSync(dir_build + "/" + F_MAIN)) {
            fs.mkdirSync('build/SCRIPTS')
        } else {
            App("build" + "/" + F_MAIN).then(_d => {
                console.log(_d);
            })
        }

    }



}

Start()