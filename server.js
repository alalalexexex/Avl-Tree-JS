const express = require('express'); 
const path = require('path'); 

const app = express(); 
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) =>{

}); 

app.listen(8080, () => {
    console.log('App is listening on 8080...'); 
})