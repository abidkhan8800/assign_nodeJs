const handleRegister = (req,res,con)=>{
  // console.log("req",req.body);
  var users={
    "name":req.body.name,
    "email":req.body.email,
    "password":req.body.password,
    "type": req.body.type

  }
  console.log(req.body);
  con.query('INSERT INTO users SET ?',[users], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
}
module.exports = {
  handleRegister: handleRegister
};
