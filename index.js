const express = require("express");
const mongoose = require("mongoose");
const app = express();
const url = "mongodb://127.0.0.1:27017/student";
async function connectDB(){
    await mongoose.connect(url);
    console.log("connection to db successful");
}
connectDB();
const StudentSchema =new mongoose.Schema( 
    {name:String,
    roll_no:Number,
    wad_marks: Number,
    dsbda_marks:Number}
);

const StudentMark = mongoose.model("StudentMark", StudentSchema);
app.get("/addDocs",async(req,res)=>{
    const result = await StudentMark.insertMany([{name:"Shreya",roll_no:33365,wad_marks:100,dsbda_marks:100},{name:"Saniya",roll_no:33369,wad_marks:100,dsbda_marks:100}]);
    console.log(result);
    res.send("Added Successfully");
});

app.get("/totalCount",async(req,res)=>{
    const totalCount = await StudentMark.countDocuments();
    res.send(`total count of documents : ${totalCount}`);
})

app.get("/listAll",async(req,res)=>{
    const allDocuments = await StudentMark.find();
    res.json(allDocuments);
})

app.get("/moreThan20DSBDA",async(req,res)=>{
    const students = await StudentMark.find({dsbda_marks:{$gt:20}});
    res.json(students);
})

app.get("/updateMarks",async(req,res) =>{
    const filter = { name: "Shreya" }; 

    const update = { $inc: { wad_marks: 10, dsbda_marks: 10} };
    
    const result = await StudentMark.updateMany(filter, update);

    res.send(`documents updated`);
})

app.get("/removeStudent", async (req, res) => {
    
        const filter = { name: "ABC" }; 
        
        
        const result = await StudentMark.deleteOne(filter);

       
        if (result.deletedCount === 1) {
            res.send("Student document removed successfully");
        } else {
            res.send("No student document found with the specified criteria");
        }
   
});


app.get("/displayStudents", async (req, res) => {
   
        const students = await StudentMark.find();

      
        let html = "<table border='1'><tr><th>Name</th><th>Roll No</th><th>WAD</th><th>DSBDA</th><th>CNS</th><th>CC</th><th>AI</th></tr>";
        students.forEach(student => {
            html += `<tr><td>${student.name}</td><td>${student.roll_no}</td><td>${student.wad_marks}</td><td>${student.dsbda_marks}</td><td>${student.cns_marks}</td><td>${student.cc_marks}</td><td>${student.ai_marks}</td></tr>`;
        });
        html += "</table>";

       
        res.send(html);
    
});

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
})