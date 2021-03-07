const fileSetup = require('./libs/fileSetup');
const folderSetup = require('./libs/folderSetup');
const buildTranslateDev = require('./libs/buildTranslateDev');

function App() {
    folderSetup().then(foders => {
        if (foders) {
            fileSetup(foders).then(files => {
                if (files) {
                    buildTranslateDev(files).then(message => {
                        console.log(message);
                    }).catch(e => {
                        console.log(e);
                    })

                }
            }).catch(e => {
                console.log(e);
            })
        }
    }).catch(e => {
        console.log(e);
    })
}

App()