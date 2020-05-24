function Student(name, email) {
    let _name = name;
    let _email = email;
    let _homeworkResults = [];
    let _failedHWnumber = 0;

    this.getName = function() {
        return _name;
    }
    this.getEmail = function() {
        return _email;
    }
    this.addHomeworkResult = function(topic, success) {
        _homeworkResults.push({
            'topic' : topic,
            'success': success
        });
        if(!success) {
            _failedHWnumber++;
        }
    }
    this.getHomeworkResult = function() {
        console.log(_homeworkResults)
    }
    this.getFailedHomework = function() {
        return _failedHWnumber;
    }
}

const student = new Student('Grisha', 'grisha@gmail.com');

function FrontendLab(students, failedLimit) {
    let _studentList = new Map();
    let _failedHomeworksLimit = failedLimit; 

    for(let student of students) {
        let newStudent = new Student(student.name, student.email);
        _studentList.set(student.email, newStudent);
    }
    this.printStudentsList = function() {
        _studentList.forEach(function(value) {
            console.log(`name: ${value.getName()}, email: ${value.getEmail()}`);
            value.getHomeworkResult();
        })
    }
    this.addHomeworkResult = function(homeworkResults) {
        for(let resultItem of homeworkResults.results) {
            _studentList.get(resultItem['email']).addHomeworkResult(homeworkResults.topic, resultItem['success']); 
        }
    }
    this.printStudentsEligibleForTest = function() {
        _studentList.forEach(function(value) {
            if(value.getFailedHomework() <= _failedHomeworksLimit) {
                console.log(`name: ${value.getName()}, email: ${value.getEmail()}`);
            }
        })
    }
}
const lab = new FrontendLab(window.listOfStudents, 1);
lab.printStudentsList();
lab.addHomeworkResult(window.homeworkResults[1]);
lab.addHomeworkResult(window.homeworkResults[0]);
lab.addHomeworkResult(window.homeworkResults[2]);
lab.addHomeworkResult(window.homeworkResults[3]);
lab.addHomeworkResult(window.homeworkResults[4]);
lab.printStudentsEligibleForTest()