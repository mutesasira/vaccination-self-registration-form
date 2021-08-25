import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

// const mysql = require('mysql');
// const mysqlConnection = mysql.createConnection({
//   host:'localhost',
//   user:'root',
//   password:'',
//   database:'self_registration'
// });

// mysqlConnection.connect((err)=>{
// if(err)
//   console.log('you man you have connected')
// else
//   console.log('the thing is not working')
// });

// module.exports = mysqlConnection;

// const express = require('express');
// //const cors = require('cors')

// const app = express();
// //app.use(cors());
// app.use(express.json())


// app.post('/api/create', (req,res)=> {

// mysqlConnection.query("INSERT INTO identification (client_category, alternative_id_type, alternative_id_number) VALUES (clientcategory,alternativeidtype,alternativeidnumber?)",(err,result)=>{
//    if(err) {

//    console.log(err)
//    } 
//    console.log(result)
// });   })


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
