var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
 
 
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const PATH = __dirname+'/';

app.get('/',(req,res) => {
	res.sendFile(PATH+"/login.html")
})


/**
 * 登录
 * @param  {[type]} err   [description]
 * @param  {[type]} data) {		data      [description]
 * @return {[type]}       [description]
 */
app.post('/login',urlencodedParser, (req,res) => {

	fs.readFile( PATH + "user.json", 'utf8', function (err, data) {
		data = JSON.parse( data );

     	let userName = req.body.userName;
     	let passWord = req.body.passWord;

     	console.log('用户名 密码: '+req.body.userName,req.body.passWord); 

     	for(let i in data){
     		let item = data[i];
     		console.log(item);
     		
			if(item.name == userName && item.password == passWord){ 
				console.log('login successful!')
       			return res.json("登录成功") 
       		} 
     	} 
     	return res.json('用户名不存在或密码错误')
   	})//readFile
	
})



/**
 * 注册
 * @param  {[type]} err   [description]
 * @param  {[type]} data) {		data      [description]
 * @return {[type]}       [description]
 */
app.post('/register',urlencodedParser, (req,res) => {

	let userName = req.body.userName;
 	let passWord = req.body.passWord;		

	fs.readFile( PATH + "user.json", 'utf8', function (err, data) {
		data = JSON.parse( data ); 
		let data_len = Object.keys(data).length;
		let count = 0

		for(let i in data){
			let item = data[i];

 			console.log(typeof(userName),userName , item,userName in item)
			if(userName == item.name){
	     	 	return res.json('这个名字已经有人用过了') 
	     	 }else{
	     	 	count++;
	     	 }
		}
		if(count == data_len){
			let user_tem = {
     	 		"name": userName,
     	 		"password": passWord,
     	 		"id": data_len+1
     	 	};

     	 	data['user'+(data_len+1)] = user_tem;

     	 	writeFile(JSON.stringify(data));

     	 	return res.json('注册成功')

		}

		console.log(data)
     	 
   	})//readFile
})

/**
 * 写入user.json
 * @param  {[type]} text [description]
 * @return {[type]}      [description]
 */
function writeFile(text){
	fs.writeFile('./user.json', text, function(err){
		if (err) {
	        throw err;
	    }

		console.log('写入成功');

		// 写入成功后读取测试
		fs.readFile('./user.json', 'utf-8', function(err, data) {
	        if (err) {
	            throw err;
	        }
	        console.log(data);
	    });
	})
}


/**
 * 启动server服务器
 * @param  {[type]} ){	var host          [description]
 * @return {[type]}         [description]
 */
var server = app.listen(8081 , function(){
	var host = server.address().address;
	var port = server.address().port;
  	console.log("应用实例，访问地址为 http://%s:%s", host, port)
})