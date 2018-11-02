const handleSubmitFrom = (req, res, con)=>{
  const { name, email, status,uid} = req.body;
  var survey={
    "name": name,
    "email": email,
    "status": status,
    "sdate": new Date(),
    "uid": uid
  }
  console.log(req.body);
  con.query('INSERT INTO survey SET ?',[survey], function (error, results, fields) {
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
      "success":"Form submitted sucessfully"
        });
  }
  });
}

module.exports = {
  handleSubmitFrom: handleSubmitFrom
};
