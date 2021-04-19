const fs = require('fs');
const readline = require('readline');

const path = process.argv[2];

var file = 0;
var directories = 0;

fs.readdir(path, (err, files) => {

    if(err){
        console.log(err.message);
    }else{
        if(files.length > 0){

            readAnswer();

        }else{

            removeEmpty(path);

        }
    }

});


function removeEmpty(path){
    fs.rm(path, {recursive:true}, (err) => {

        console.log("1 directory removed!")

    });
}

function remove(path){
    fs.rm(path, {recursive:true}, (err) => {

        console.log(`removed--${directories} directories, ${file} files`);

    });
}

function readAnswer(){

    const rd = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rd.question("Directory is not empty, do you want to remove all content? yes/no:", (answer) => {
        if(answer === 'yes'){
            read(path);
            remove(path);
            rd.close();
        }else{
            console.log("Directory not removed!");
            rd.close();
        }
    })
}

function read(path){
    fs.readdir(path, (err, content) => {

        content.forEach(element => {
            const stat = fs.statSync(`${path}/${element}`)
            if(stat.isDirectory()){
                directories += 1;
                read(`${path}/${element}`);
            }else{
                file += 1;
            }
        });
    });
}