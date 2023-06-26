var express = require('express');
var router = express.Router();
var pool=require("./pool");
var upload=require("./multer");

/* GET home page. */
router.get('/portal', function(req, res, next) {
  res.render('product',{status:null});
});

router.post('/insertrecord',upload.single('picture'),function(req,res){
  console.log('BODY',req.body)
  console.log('FILE',req.file)
  console.log(req.body.myfilename)
  console.log('error')
  pool.query('insert into company(companyname, model, generation, manufacturingdate, description, aboutcompany, emailid, mobileno, price, picture) values(?,?,?,?,?,?,?,?,?,?)',[req.body.companyname,req.body.model,req.body.generation,req.body.manufacturingdate,req.body.description,req.body.aboutcompany,req.body.emailid,req.body.mobileno,req.body.price,req.body.myfilename],function(error,result){
     if(error)
     {
       console.log('Error:',error)
       res.render("product",{status:false})
      }
     else
     {
       res.render("product",{status:true})
     }
  });
});



router.get('/editdeleterecord', function(req, res, next) {
  var btn=req.query.btn;
  if(btn=='Edit')
  {
  pool.query('update company set companyname=?, model=?, generation=?, manufacturingdate=?, description=?, abooutcompany=?, emailid=?, mobileno=?, price=? where companyid=?',[req.query.companyname,req.query.model,req.query.generation,req.query.manufacturingdate,req.query.description,req.query.aboutcompany,req.query.emailid,req.query.mobileno,req.query.price,req.query.companyid],function(error,result){
  if(error)
  {res.redirect('/product/displayall')}
  else
  {res.redirect('/product/displayall')}
})
  }
  else if(btn==Delete)
  { pool.query('delete from company where companyid=?',[req.query.companyid],function(error,result){
    if(error)
    {res.redirect('/product/displaybyid')}
    else
    {res.redirect('/product/displaybyid')}
  })
   }
})

router.get('/showimage', function(req, res, next) {
 res.render('showimage',{data:{companyid:req.query.companyid,picture:req.query.picture,companyname:req.query.companyname,model:req.query.model}})
  
});

router.get('/displayall', function(req, res, next) {
  pool.query("select * from company",function(error,result){
 
 if(error)
 {  res.render('productdisplay',{data:[]});}
 else
 {
   res.render('productdisplay',{data:result});
 
 }
  })
  
  
 });

 router.get('/displaybyid', function(req, res, next) {
  pool.query("select * from company where companyid=?",[req.query.companyid],function(error,result){
 
 if(error)
 {  res.render('productdisplaybyid',{data:[]});}
 else
 {console.log(result)
   res.render('productdisplaybyid',{data:result[0]});
 
 }
  })
  
  
 });

 router.get('/advdisplayall', function(req, res, next) {
  pool.query("select * from company",function(error,result){
 
 if(error)
 {  res.render('advproductdisplay',{data:[]});}
 else
 {
   res.render('advproductdisplay',{data:result});
 
 }
  })
  
  
 });

router.post('/editimage',upload.single('picture'),function(req,res){
  pool.query('update company set pictures=? where companyid=?',[req.body.myfilename,req.body.companyid],function(error,result){
     if(error)
     {
       console.log('Error:',error)
       res.redirect('/product/displayall')
      }
     else
     {
      res.redirect('/product/displayall')
     }
  });
});

module.exports = router;
