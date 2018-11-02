const handleGetStatus= (req, res, con)=>{
  var sql ="select name, email from survey where  status='no' and sdate>=(select subdate(curdate(), interval 14 day)) and sdate<=curdate();"
  con.query(sql,(error,result,field)=>{
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
