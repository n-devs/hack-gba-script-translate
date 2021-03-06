const fs = require('fs');
const translate = require('translation-google');

const F_MAIN = "SCRIPTS";

function Folders(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            resolve(files)
        })
    })
}

function Files(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            resolve(files)
        })
    })
}



function App(dir) {

    Folders(F_MAIN).then(folders => {
        folders.map(folder => {
            if (!fs.existsSync("./" + dir + "/" + folder)) {
                console.log("./" + dir + "/" + folder);
                fs.mkdirSync(dir + "/" + folder);
            } else {
                Files(F_MAIN + "/" + folder).then(files => {
                    files.map(file => {
                        if (!fs.existsSync("./" + dir + "/" + folder + "/" + file)) {
                            fs.readFile(F_MAIN + "/" + folder + "/" + file, 'utf8', function (err, data) {
                                if (err) throw err;

                                // console.log(data)
                                translate(data, { from: "en", to: "th" }).then(res => {
                                    // console.log(res.text);
                                    console.log('OK: ' + F_MAIN + "/" + folder + "/" + file);
                                    //=> I speak English
                                    // console.log(res.from.language.iso);

                                    fs.writeFile(dir + "/" + folder + "/" + file, res.text, function (err) {
                                        if (err) {
                                            return console.log(err);
                                        }

                                        console.log("The file was saved!");
                                    });


                                }).catch(err => {
                                    console.error(err);
                                });;

                            });
                        }
                    })
                })
            }


        })
    })

}

function Start() {
    const dir = './build';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    } else {
        if (!fs.existsSync(dir + "/" + F_MAIN)) {
            fs.mkdirSync('build/SCRIPTS')
        } else {
            App("build" + "/" + F_MAIN)
        }

    }



}

Start()