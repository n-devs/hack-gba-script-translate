const fs = require('fs');
const folderSetup = require('./folderSetup');
const fileSetup = require('./fileSetup');
const exec = require('child_process').exec


describe.only('folderSetup.js', () => {
    test('build file ok!', () => {
        return folderSetup().then(data => {
            if (data) {
                fileSetup(data).then(path_files => {
                    // console.log(path_files.length);
                    expect(path_files).toBe(path_files);
                    exec('rm -Rf ./build', (data) => {
                        expect(data).toBe(null);
                    })
                    exec('rm -Rf ./path', (data) => {
                        expect(data).toBe(null);
                    })
                }).catch(e => {
                    // console.log(e);
                    expect(e).toMatch(e)
                })


            }

        }).catch(e => {
            // console.log(e);
            expect(e).toMatch(e)
        })
    });

});

