const handleLogin=(req, res, con)=>{
  var email= req.body.email;
  var password = req.body.password;
  console.log(req.body);
  con.query('SELECT * FROM users WHERE email = ?',[email], function (error, result) {
  if (error) {
    // console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', result);
    if(results.length >0){
      if(results[0].password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
  });
}

module.exports = {
  handleLogin: handleLogin
};
