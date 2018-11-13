const handleGetStatus= (req, res, con)=>{
  
  const sql ="select name,email from users where type='patient' and email not in(select email from survey where sdate>=(select subdate(curdate(), interval 14 day)) and sdate<=curdate())";
  con.query(sql,(error,result)=>{
    if(error) {
      throw error;
    }else{
      console.log(result.length)
      if(result.length < 0){
         res.send("no record found");
         console.log('record not found')
      }else{
        var list = [];
        for( var i=0;i<result.length; i++){
             list.push(result[i].name);
        }
        res.json(list)
      }
    }
  })

}
module.exports ={
  handleGetStatus: handleGetStatus
};
