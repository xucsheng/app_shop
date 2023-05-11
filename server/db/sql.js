const mysql = require('mysql');  
  
// 配置连接字符串  
const connection = mysql.createConnection({  
  host: 'localhost',  
  user: 'root',  
  password: 'tiger',  
  database: 'aolai'  
});  
  
module.exports = connection;
