const Student = require('../models/student');
const fs = require('fs');
const {Transform ,AsyncParser, transforms: {flatten, unwind}, transforms} = require('json2csv');

module.exports.create = async function(req, res){
    try{
        let newStudent = await  Student.create({
            name : req.body.name,
            email: req.body.email,
            college: req.body.college,
            placement: req.body.placement,
            scores: {
                dsa: req.body.Dsa,
                webD: req.body.webD,
                react: req.body.react
            }
        });
        console.log('New user created: ');
        return res.redirect('back');
    }catch(err){
        console.log('Error while creating the student record: ', err);
        return res.redirect('back');
    }


}

module.exports.downloadCSV = async function(req, res){
    try {
        let students = await Student.find()
        .populate('interviews.interview','company');
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=students.csv');
        console.log(__dirname);

        const file = `${__dirname}/export.csv`;

        const fields = ['name', 'email', 'college', 'placement', 'interviews.interview.company', 'interviews.status', 'interviews.dateApplied', 'interviews.dateOfInterview', 'scores.dsa', 'scores.webD', 'scores.react'];
        const transforms = [unwind({paths: ["interviews"], blankOut: true}),flatten({ objects: false, arrays: true })];
        const opts1 = {fields, header: false};
        const parser1 = new AsyncParser(opts1);
        const opts2 = {fields, transforms, header: false};
        const parser2 = new AsyncParser(opts2);
        fs.appendFileSync(file,'"name","email","college","placement","Company","Status","dateApplied","dateOfInterview","score(dsa)","score(webD)","scores(react)"');
        fs.appendFileSync(file, '\n');
        let size = students.length;
        for(let i=0; i<size; i++){
            let csv = await parser1.parse(students[i]).promise();
            fs.appendFileSync(file,csv)
            fs.appendFileSync(file,'\n');
            let x = students[i].interviews.length;
            for(let i = 0; i<x; i++){
                csv = await parser2.parse(students[i]).promise();
            }
            fs.appendFileSync(file,csv);
            fs.appendFileSync(file,'\n');
        }
        res.download(file, 'students.csv', (err) => {
            if (err) {
              console.log('Error while downloading csv file ', err);
              res.status(500).send({
                message: 'Unable to download the csv file',
              });
            }
            fs.unlinkSync(file);
          });

    } catch (error) {
        console.log('Error while downloading csv file ', error);
        res.redirect('back');
    }
}