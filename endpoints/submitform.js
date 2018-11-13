const handleSubmitFrom = (req, res, con)=>{
  const { name, email, submitstatus,uid} = req.body;
  var survey={
    "name": name,
    "email": email,
    "sdate": new Date(),
    "uid": uid
  }
  console.log(req.body);
  console.log(survey.sdate);
  con.query('CALL submitSurveyForm2(?,?,?,?)',[survey.name, survey.email,survey.sdate, survey.uid], function (error, result) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', result);
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
