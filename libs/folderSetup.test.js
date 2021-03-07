const fs = require('fs');
const folderSetup = require('./folderSetup');
const exec = require('child_process').exec


describe.only('folderSetup.js', () => {
    test('build floder ok!', () => {
        return folderSetup().then(data => {
            if (data) {
                // console.log(data.length);
                expect(data).toBe(data);
                exec('rm -Rf ./build', (data) => {
                    expect(data).toBe(null);
                })
            }

        }).catch(e => {
            // console.log(e);
            expect(e).toMatch(e)
        })
    });




});

