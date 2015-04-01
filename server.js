var express = require('express');

var fs = require('fs');

var app = express();



app.use(express.static(__dirname + '/public'));	

app.get('/mainQuizPage.html', function(request, response) {

        response.send("Hola puta");
});





app.set('port', (process.env.PORT || 4000));
app.listen(app.get('port') ,function() {
        console.log("Node app is running at localhost:" + app.get('port'))
});
