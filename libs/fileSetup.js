const fs = require('fs');

async function fileSetup(folders) {
    return await new Promise((resolve, reject) => {
        // ตรวจสอบ path folder
        if (!fs.existsSync('./path')) {
            // ถ้าไม่มี path folder

            // new path folder
            fs.mkdir('./path', { recursive: true }, (err) => {
                if (err) throw reject(err);

                // ตรวจสอบ path/read.txt และ path/config.json  file
                if (!fs.existsSync('./path/config.json')) {
                    // ถ้าไม่มี path/read.txt และ path/config.json  file

                    let new_folders = []
                    let new_files = []
                    let new_path_files = []
                    let count_path_files = []
                    let count_new_path_files = []

                    // map array folders
                    folders.map(folder_name => {

                        new_folders.push(folder_name)

                        fs.readdir(`./SCRIPTS/${folder_name}`, (err, files) => {
                            new_files.push(files.length);

                            files.map(file_name => {
                                new_path_files.push({
                                    file: `${folder_name}/${file_name}`,
                                    folder: `${folder_name}`
                                })

                                if (new_files.reduce((a, b) => a + b, 0) === new_path_files.length) {
                                    count_path_files.push(new_path_files.length)

                                    if (count_path_files.length === folders.length) {
                                        // console.log(new_files.reduce((a, b) => a + b, 0) + " = " + new_path_files.length);


                                        new_path_files.map(data_to_file => {
                                            count_new_path_files.push({
                                                read: {
                                                    file: `./SCRIPTS/${data_to_file.file}`,
                                                    folder: `./SCRIPTS/${data_to_file.folder}`
                                                },
                                                write: {
                                                    file: `./build/SCRIPTS/${data_to_file.file}`,
                                                    folder: `./build/SCRIPTS/${data_to_file.folder}`
                                                },
                                                writeError: {
                                                    file: `./build/SCRIPTS_ERROR/${data_to_file.file}`,
                                                    folder: `./build/SCRIPTS_ERROR/${data_to_file.folder}`
                                                }
                                            })


                                            if (new_path_files.length === count_new_path_files.length) {
                                                // console.log(new_path_files.length + "===" + count_new_path_files.length);

                                                fs.writeFileSync('./path/config.json', JSON.stringify(count_new_path_files), 'utf-8')
                                                resolve(count_new_path_files)
                                            }
                                        })

                                        // resolve(new_path_files)
                                    }
                                }

                            })


                        })
                        // console.log(new_folders.length + "=" + folders.length);


                    })

                }
            })
        } else {
            // ถ้ามี path folder

            // ตรวจสอบ path/read.txt และ path/config.json  file
            if (fs.existsSync('./path/config.json')) {
                // ถ้ามี path/read.txt และ path/config.json  file

                let new_folders = []
                let new_files = []
                let new_path_files = []
                let count_path_files = []
                let count_new_path_files = []

                // map array folders
                folders.map(folder_name => {

                    new_folders.push(folder_name)

                    fs.readdir(`./SCRIPTS/${folder_name}`, (err, files) => {
                        new_files.push(files.length);

                        files.map(file_name => {
                            new_path_files.push(`${folder_name}/${file_name}`)

                            if (new_files.reduce((a, b) => a + b, 0) === new_path_files.length) {
                                count_path_files.push(new_path_files.length)

                                if (count_path_files.length === folders.length) {
                                    // console.log(new_files.reduce((a, b) => a + b, 0) + " = " + new_path_files.length);

                                    // console.log(new_path_files);
                                    new_path_files.map(data_to_file => {
                                        count_new_path_files.push({
                                            read: `./SCRIPTS/${data_to_file}`,
                                            write: `./build/SCRIPTS/${data_to_file}`
                                        })


                                        if (new_path_files.length === count_new_path_files.length) {
                                            // console.log(new_path_files.length + "===" + count_new_path_files.length);

                                            fs.writeFile('./path/config.json', JSON.stringify(count_new_path_files), function (err, data) {
                                                if (err) {
                                                    return reject(err);
                                                }


                                                // console.log("The path read file was saved!");
                                            })
                                            resolve(count_new_path_files)



                                        }
                                    })

                                    // resolve(new_path_files)
                                }
                            }

                        })

                    })
                    // console.log(new_folders.length + "=" + folders.length);
                })

            }
        }
    })

}

module.exports = fileSetup;