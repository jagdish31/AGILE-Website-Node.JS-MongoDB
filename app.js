const express = require("express");
const http = require('http');
const path = require("path"); 
const app = express();
// const mongoose = require('mongoose');
const port = 80;
const bodyparser = require("body-parser");

// mongoose.connect('mongodb://localhost/message_AGILE', {useNewUrlParser: true});

// To send mail
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",  // sets automatically host, port and connection security settings
    auth: {
        user: "jagdish.tripathy31@gmail.com",
        pass: "Vold Portal 20031"
    }
 });

// // Define mongoose schema
// var messageSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     subject: String,
//     message: String,
//   });

// var Message = mongoose.model('Message', messageSchema);

// EXPRESS SPECIFIC STUFF
app.use('/assets', express.static('assets')) // For serving static files
app.use(express.urlencoded())


// ENDPOINTS
app.get("/", (req, res)=>{ 
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get("/portfolio-details.html", (req, res)=>{ 
    res.sendFile(path.join(__dirname + '/portfolio-details.html'));
});
app.get("/pmec", (req, res)=>{ 
    res.redirect('https://www.pmec.ac.in/');
});

app.post('/', (req, res)=>{ 

    // var messageData = new Message(req.body);
    // messageData.save().then(()=>{
    //     res.send("Thank you, Your message has been sent.")
    // }).catch(()=>{
    //     res.status(400).send("Oops, failed to send your message. Try again.")
    // });

        var data= req.body;
      smtpTransport.sendMail({ 
         from: "Sender Name <jagdish.tripathy31@gmail.com>", 
         to: "Receiver Name <jagdish.tripathy31@gmail.com>", 
         subject: "Message for AGILE", 
         text: "Hey! We got a message for Agile Society"+"\n"+"Name: "+data.name+"\n"+"Email: "+data.email+"\n"+"Subject: "+data.subject+"\n"+"Message: "+data.message
      }, function(error, response){  //callback
         if(error){
            res.status(400).send("Oops, failed to send your message. Try again.")
         }else{
            res.send("Thank you, Your message has been sent.");
         }
      
         smtpTransport.close(); // shut down the connection pool, no more messages. Comment this line out to continue sending emails.
      });
        
      });


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
