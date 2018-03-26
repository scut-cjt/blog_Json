export function func_login(req,res) {

	fs.readFile( PATH + "user.json", 'utf8', function (err, data) {
		data = JSON.parse( data );

     	let userName = req.body.userName;
     	let passWord = req.body.passWord;

     	console.log('用户名 密码: '+req.body.userName,req.body.passWord); 

     	for(let i in data){
     		let item = data[i];
     		
			if(item.name == userName && item.password == passWord){
     			console.log(item);
				console.log('login successful!')
       			res.sendFile(PATH+"/index.html")
       			return 
       		}else{
       			res.end('wrong password')
       		}

     	} 
   	})
	
}