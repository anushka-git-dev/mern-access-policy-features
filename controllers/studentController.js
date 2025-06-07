import Student_model from '../models/students.js';


//route GET request -- get all students
export function getStudents(req, res){
    Student_model.find()
        .then((result) => {res.send(result)})
        .catch((err) => {res.send(err)});
};


//route POST request -- create new student
export function saveStudent(req, res){   
    if(req.user.role != "admin"){return res.status(403).send("You are not authorized...")};
    
    console.log(req.body);

    const student = new Student_model(req.body);    //create new student object

    student.save()                                  //save student object
        .then(() => {res.send("Student saved successfully...")})
        .catch(() => {res.send("Student not saved...")});  
};

