const express = require("express");
const app=express();
port=80;
// app.use()
app.use(express.urlencoded());
app.set('view engine', 'pug');
app.get('/', (req, res) => {
    res.render('index')
  })
  app.use('/', express.static('static'))
  app.use('/static', express.static('static'))

  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/education_website');
  
  const users_data = new mongoose.Schema({
                                        name: String,
                                        password: String,
                                        email: String,
                                        textarea: String
                                    });
  const education_website = mongoose.model('education_website', users_data);
  
  app.post('/', (req, res) => {
      const silence = new education_website( req.body );
      silence.save(function(err,result){
        if (err){
          console.log(err);
        }
        else{
          console.log(result)
        }
        // silence.save();
        res.render('index', { message: 'Form submited!' })
  })    
  })                                    
app.listen(port, () => {
    console.log(`Server running at :${port}`);
  });



  