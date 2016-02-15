var server = require('express');
var app = server();
var path = require('path');

app.get('/', (req, res) => {
  var file = path.join(__dirname, 'index.html');
  res.sendFile(file, (err) => {
    if(err){
      throw err;
    }
    else {
      console.log(file + ' sent.');
    }
  });
});

app.get('/:query' , (req,res) => {
	var tiempo = req.params.query;
	if (!isNaN(tiempo)){tiempo = parseInt(tiempo)*1000}
	var d = new Date(tiempo);
	var obj = {
		unix: null,
		natural: null
	};
	
	
	if ( Object.prototype.toString.call(d) === "[object Date]" ) {
  	// it is a date
  		if (isNaN(d.getTime())){  // d.valueOf() could also work
    	// date is not valid
    	res.json(obj);
  		}
  		else {
    	// date is valid
    	var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    	var day = d.getDate();
  		var year = d.getUTCFullYear();
  		obj.natural = months[d.getMonth()] + ' ' + day + ', ' + year;
  		obj.unix = Date.parse(d)/1000;
  		res.json(obj);
  		} 
	}
	else {
  	// not a date
  	res.json(obj);
	}
});
var port = process.env.PORT || 3500;

app.listen(port, function(){
  console.log("Listening on port: " + port);
});
