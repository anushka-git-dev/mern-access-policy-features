    import mongoose from 'mongoose';  
    
    //create "students" collection/table structure
    const studentSchema = mongoose.Schema(
        {
        name: String,
        age: Number,
        city: String,
        stream: String,
        email: String 
        }
        );

    const Student_model = mongoose.model('students', studentSchema);   //build connection with 'students' collection table

    export default Student_model;       //export model to access from other files
   