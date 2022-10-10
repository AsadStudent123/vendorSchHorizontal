const bodyParser = require('body-parser')
const express=require('express')
const cors=require('cors')
const app=express()
const mysql=require('mysql')
const allDayStartTime='00:00'
const allDayEndTime ='24:00'
const db=mysql.createPool({
    host:"localhost",
    user: "root",
    password: "root",
    database:"vendorsched",
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
function getDateFromHours(time) {
    time = time.split(':');
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
}

app.get('/api/getVendors',(req,res)=>{
    const dbquery="select customerid as customerid,name as name from vendorsched.customers;";
    db.query(dbquery,(err,result)=>{
        if(!err)
        res.status(201).send(result);
        else
        res.send(err)
    });
    
})

app.post('/api/postTime',(req,res)=>{
    const customerid=req.body.customerid;
    const day=req.body.day;
    const startTime=req.body.startTime;
    const endTime=req.body.endTime;
    let query="";
    const datetimenow=new Date();
    if(startTime =='*' && endTime=='*'){
        let myPromise = new Promise(function(myResolve, myReject) {
            query ="Delete from vendorsched.jobschedule where customerid= ? ";
            db.query(query,[customerid],(err,result)=>{
                myResolve(result)
            });
        });
        myPromise.then(
            function(value) {
                query ="insert into vendorsched.jobschedule(customerid,day,time,endtime,lastmodifieddatetime) VALUES ?";
                 var values = [
                [customerid, 'mon', allDayStartTime,allDayEndTime,datetimenow],
                [customerid, 'tue', allDayStartTime,allDayEndTime,datetimenow],
                [customerid, 'wed', allDayStartTime,allDayEndTime,datetimenow],
                [customerid, 'thrs', allDayStartTime,allDayEndTime,datetimenow],
                [customerid, 'fri', allDayStartTime,allDayEndTime,datetimenow],
                [customerid, 'sat', allDayStartTime,allDayEndTime,datetimenow],
                [customerid, 'sun', allDayStartTime,allDayEndTime,datetimenow],
                 ];
                db.query(query,[values],(err,result)=>{
                    res.send(result);
                });
            },
            function(error) {console.log(error);}
          );
      
    }
    else{
        let myPromise = new Promise(function(myResolve, myReject) {
            if(startTime ==allDayStartTime && endTime==allDayEndTime){
                query ="Delete from vendorsched.jobschedule where customerid= ? and day= ?";
                db.query(query,[customerid,day],(err,result)=>{
                    console.log(err)
                    myResolve(result)
                });
            }
            else{
                query ="select time as stime , endtime as etime from vendorsched.jobschedule where customerid= ? and day= ? ";
                db.query(query,[customerid,day],(err,result)=>{
                    console.log(err)
                    myResolve(result)
                });
            }
        });
        myPromise.then(
            function(value) {
                // var sTimeMilisec= (getDateFromHours(value[0].stime));
                // sTimeMilisec.getTime()
                // var eTimeMilisec= (getDateFromHours(value[0].stime));
                // eTimeMilisec.getTime()
                // var usersTimeMilisec= (getDateFromHours(startTime));
                // usersTimeMilisec.getTime()
                // var usereTimeMilisec= (getDateFromHours(endTime));
                // usereTimeMilisec.getTime()
                // if(usersTimeMilisec >= sTimeMilisec && usersTimeMilisec <= eTimeMilisec){
                // }
                // console.log(value[0].stime)
                query =" insert into vendorsched.jobschedule(customerid,day,time,endtime,lastmodifieddatetime) VALUES ?";
                var values = [
                    [customerid, day, startTime,endTime,datetimenow],
                ];
                db.query(query,[values],(err,result)=>{
                    console.log(err)
                    res.send(result);
                });
            },
            function(error) {console.log(error);}
          );
        
    }
   
    
})
app.get('/api/getdays',(req,res)=>{
    const dbquery="select daycode as daycode,dayname as dayname from vendorsched.days;";
    db.query(dbquery,(err,result)=>{
        if(!err)
        res.status(201).send(result);
        else
        res.send(err)
    });
    
})

// app.get('/api/getjobschedule/:customerid/:day',(req,res)=>{
//     const customerid=req.params.customerid;
//     const day=req.params.day;
//     const dbquery="select time as starttime,endtime as endtime,day as day from vendorsched.jobschedule where customerid=? and day =? order by lastmodifieddatetime desc ";
//     db.query(dbquery,[customerid,day],(err,result)=>{
//         res.send(result);
//     });
    
// })
app.get('/api/getjobschedule/:customerid',(req,res)=>{
    const customerid=req.params.customerid;
    const dbquery="select time as starttime,endtime as endtime,day as day from vendorsched.jobschedule where customerid=? order by lastmodifieddatetime desc ";
    db.query(dbquery,[customerid],(err,result)=>{
        if(!err)
        res.status(201).send(result);
        else
        res.send(err)
    });
    
})

app.post('/api/postCustomername',(req,res)=>{
    const name=req.body.vname;
    inserquery ="insert into vendorsched.customers(name) VALUES ?";
    var values = [
        [name],
    ];
    db.query(inserquery,[values],(err,result)=>{
        if(!err)
        res.status(201).send(result);
        else
        res.send(err)
    });
    
})

app.listen('3001',()=>{
    console.log('Vednor Scheduler');
})