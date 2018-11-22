var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs')
var uniqid = require('uniqid');
var http = require('http').createServer(app);
var otpGenerator = require('otp-generator');
app.use(cors())
app.use(bodyParser.json());
app.use(express.static('./Public'));
app.use(bodyParser.urlencoded({ extended: true }));
http.listen(process.env.PORT || 5000);
var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/medical_blockchain"
var requestmap = []
var procurermap = []
var usermap = []


app.get('/login/:emailid',function(req,res){
    var user = req.params.emailid
    var obj = {
        id:user,
        rating:3
    }
    usermap.push(obj)
    res.send({"result":"done"})
})

app.post('/storerequest/:emailid',function(req,res){
    var id = req.params.emailid;
    var requestid = uniqid()
    var otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    var record = {
        request_id:requestid,
        otp:otp,
        id:id,
        item:req.body.item,
        time:req.body.duration,
        area:req.body.area,
        procurer:null,
        flag:false,
        flag2:false,
        depositedAmount:null,
        actualAmount:null,
        flag3:false
    }
    requestmap.push(record)
    console.log(requestmap)
    // mongo.connect(url,function(err,db){
    //     db.collection('registration').insertOne(record,function(err,result){
    //         if(err)
    //         {
    //             console.log(err)
    //         }
    //         else{
    //             res.send({"response":"success"})
    //         }
    //     })
    // })

})

app.get('/requestAccepted/:id/:record',async function(req,res){
    console.log(req.params.id)
    var rec = JSON.parse(req.params.record)
    var l = requestmap.length
    var i
    // console.log("array :",requestmap)
    // console.log("test record:",rec)
    for(i=0;i<l;i++)
    {
        if(JSON.stringify(requestmap[i])==(JSON.stringify(rec)))
        {
            // console.log("test")
            // console.log(requestmap[i])
            requestmap[i].procurer = req.params.id
            requestmap[i].flag = true
        }
    }
    res.send({"result":"done"})
})

app.get('/login/:id/:pwd',async function(req,res){
    var id = req.params.id
    var pwd = req.params.pwd
    var result = await checkValidity(id,pwd)
    res.send({"result":result})
})



app.get('/getRequests/:emailid',async function(req,res){
    console.log("triggered")
    var email = req.params.emailid
    if(procurermap.includes(email)==false)
    {
        procurermap.push(req.params.emailid)
    }

    console.log(procurermap)
    // let rel = new Array()
    // let db = await mongo.connect(url)
    // var cursor = await db.collection('hospital_patients').find({})
    // cursor.forEach(function(doc,err){
    //     rel.push(doc.patient)
    // })
    // setTimeout(function(){
    //     console.log(rel)
    //     console.log("sending")
    //     res.send({"result":rel})
    // },3000)
    var rel = []
    var l = requestmap.length
    var i
    for(i = 0 ; i < l ; i++)
    {
        if(requestmap[i].flag==false)
        {
            rel.push(requestmap[i])
        }
    }
    res.send({"requests":rel})
})

app.get('/notifications/:emailid',function(req,res){
    var l = requestmap.length
    var id = req.params.emailid
    var i
    var result = []
    for(i = 0 ; i < l  ; i++)
    {
        var temp = requestmap[i].id
        if(temp==id && requestmap[i].procurer!=null && requestmap[i].depositedAmount==null&&requestmap[i].flag3==false)
        {
            requestmap[i].flag3=true
            result.push(requestmap[i])
        }
    }
    res.send({"result":result})
})

app.get('/payment/:emailid/:value/:record',function(req,res){
    var id = req.params.emailid
    var value = req.params.value
    var rec = JSON.parse(req.params.record)
    console.log(rec)
    var l = requestmap.length
    var i
    var result = []
    for(i = 0 ; i < l  ; i++)
    {
        if(JSON.stringify(requestmap[i])==(JSON.stringify(rec)))
        {
            // console.log("test")
            // console.log(requestmap[i])
            requestmap[i].depositedAmount = value
        }
    }
    console.log(requestmap)
    res.send({"result":"Success"})
})

app.get('/confirmations/:emailid',function(req,res){
    var l = requestmap.length
    var id = req.params.emailid
    var i
    var result = []
    for(i = 0 ; i < l  ; i++)
    {
        var temp = requestmap[i].id
        if(requestmap[i].procurer==id&&requestmap[i].depositedAmount!=null&&requestmap[i].flag2==false)
        {
            requestmap[i].flag2=true
            result.push(requestmap[i])
        }
    }
    res.send({"result":result})
})

app.get('/getAcceptedRequests/:emailid',function(req,res){
    var l = requestmap.length
    var id = req.params.emailid
    var i
    var result = []
    for(i = 0 ; i < l  ; i++)
    {
        var temp = requestmap[i].id
        if(requestmap[i].procurer==id&&requestmap[i].depositedAmount!=null&&requestmap[i].flag2==true)
        {
            result.push(requestmap[i])
        }
    }
    console.log(result)
    res.send({"result":result})
})

app.get('/endtrip/:emailid',function(req,res){
    var id = req.params.emailid
    var i = procurermap.indexOf(id)
    procurermap.splice(i,1);
})

app.get('/getotp/:reqid',function(req,res){
    var id = req.params.reqid
    var l = requestmap.length
    var i
    var otp
    for(i = 0 ; i < l ; i++)
    {
        if(requestmap[i].request_id==id)
        {
            otp = requestmap[i].otp
            break
        }
    }
    res.send({"result":otp})
})


app.get('/getMyRequests/:emailid',function(req,res){
    var l = requestmap.length
    var id = req.params.emailid
    var i
    var result = []
    for(i = 0 ; i < l  ; i++)
    {
        var temp = requestmap[i].id
        if(requestmap[i].id==id)
        {
            result.push(requestmap[i])
        }
    }
    console.log("My requests")
    console.log(result)
    res.send({"result":result})
})

app.get('/deleteRequest/:requestid',function(req,res){
    var l = requestmap.length
    var id = req.params.requestid
    var i
    var result = []
    for(i = 0 ; i < l  ; i++)
    {
        var temp = requestmap[i].request_id
        if(temp==id)
        {
            requestmap.splice(i,1);
        }
    }
    res.send({"result":"done"})
})

app.get('/storerating/:emailid/:rating',function(req,res){
    console.log(req.params.rating)
})
