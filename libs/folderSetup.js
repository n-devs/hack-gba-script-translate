const fs = require('fs');

async function folderSetup() {
    return await new Promise((resolve, reject) => {

        // ตรวจสอบ build folder
        if (!fs.existsSync('./build')) {
            // ถ้าไม่มี build folder

            // new build folder
            fs.mkdir('./build', { recursive: true }, (err) => {
                if (err) throw reject(err);

                // ตรวจสอบ build/SCRIPTS folder
                if (!fs.existsSync('./build/SCRIPTS') && !fs.existsSync('./build/SCRIPTS_ERROR')) {
                    // ถ้าไม่มี build/SCRIPTS folder

                    fs.mkdir('./build/SCRIPTS_ERROR', { recursive: true }, (err) => {
                        if (err) throw reject(err);
                    })

                    // new build/SCRIPTS folder
                    fs.mkdir('./build/SCRIPTS', { recursive: true }, (err) => {
                        if (err) throw reject(err);

                        // อ่าน dir SCRIPTS
                        fs.readdir('./SCRIPTS', (err, folders) => {

                            let new_folders = []
                            /**
                             * @description
                             * folders: array
                             */

                            // map array folders
                            folders.map(folder_name => {

                                // ตรวจสอบ build/SCRIPTS/${folder_name} folder
                                if (!fs.existsSync(`./build/SCRIPTS/${folder_name}`)) {
                                    // ถ้าไม่มี build/SCRIPTS/${folder_name} folder

                                    // new build/SCRIPTS/${folder_name} folder
                                    fs.mkdir(`./build/SCRIPTS/${folder_name}`, { recursive: true }, (err) => {
                                        if (err) throw reject(err);
                                    })

                                    // push name folder to new_folders
                                    new_folders.push(folder_name)
                                }

                                if (new_folders.length === folders.length) {
                                    resolve(folders)
                                }
                            })
                        })

                    })
                }

            });

        } else {
            // ถ้ามี build folder

            // ตรวจสอบ build/SCRIPTS folder
            if (fs.existsSync('./build/SCRIPTS') && fs.existsSync('./build/SCRIPTS_ERROR')) {
                // ถ้ามี build/SCRIPTS folder

                // อ่าน dir SCRIPTS
                fs.readdir('./SCRIPTS', (err, folders) => {

                    let new_folders = []
                    /**
                     * @description
                     * folders: array
                     */

                    // map array folders
                    folders.map(folder_name => {

                        // ตรวจสอบ build/SCRIPTS/${folder_name} folder
                        if (fs.existsSync(`./build/SCRIPTS/${folder_name}`)) {
                            // ถ้าไม่มี build/SCRIPTS/${folder_name} folder

                            // push name folder to new_folders
                            new_folders.push(folder_name)
                        }

                        if (new_folders.length === folders.length) {
                            resolve(folders)
                        }
                    })
                })
            }

        }
    })
}

module.exports = folderSetup;