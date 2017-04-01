var settings	=	require('./settings');

exports.show500	= function(req, res, err) {
	if (settings.responseType === 'JSON') {
		res.writeHead(500, "Internal Server Error", {"Content-Type" : "application/json"});
		res.write(JSON.stringify({data:"Error Occured "+err}));
	}else {
		res.writeHead(500, "Internal Server Error", {"Content-Type" : "text/html"});
		res.write("<html><head><title>Oops!</title></head><body><h1>500 : Internal Server Error</h1><p>Details:"+err+"</p></body></html>");
	}
	res.end();
}

exports.show404	= function(req, res) {
	if (settings.responseType === 'JSON') {
		res.writeHead(404, "Resource Not Found !", {"Content-Type" : "application/json"});
		res.write(JSON.stringify({data:"Resource Not Found"}));
	}else {
		res.writeHead(404, "Resource Not Found !", {"Content-Type" : "text/html"});
		res.write("<html><head><title>Oops!</title></head><body><h1>404 : Resource Not Found</h1></body></html>");
	}
	res.end();
}

exports.show413	= function(req, res) {
	if (settings.responseType === 'JSON') {
		res.writeHead(404, "Request Entity Too Large !", {"Content-Type" : "application/json"});
		res.write(JSON.stringify({data:"Request Entity Too Large"}));
	}else {
		res.writeHead(404, "Resource Not Found !", {"Content-Type" : "text/html"});
		res.write("<html><head><title>Oops!</title></head><body><h1>404 : Request Entity Too Large</h1></body></html>");
	}
	res.end();
}


exports.show200	= function(req, res) {
	if (settings.responseType === 'JSON') {
		res.writeHead(200,{"Content-Type" : "application/json"});
			if (doc) {
				res.write({success:true});
			}
	}else {
		res.writeHead(200, {"Content-Type" : "text/html"});
		res.write("<html><head><title>Success</title></head><body><h1>Success</h1></body></html>");
	}
	res.end();
	
}
exports.showIDError =function(req,res)
{
	if (settings.responseType === 'JSON') {
		res.writeHead(404, "Resource Not Found !", {"Content-Type" : "application/json"});
		res.write(JSON.stringify({data:"Resource Not Found"}));
	}else {
		res.writeHead(404, "Resource Not Found !", {"Content-Type" : "text/html"});
		res.write("<html><head><title>Oops!</title></head><body><h1>404 : Resource Not Found</h1></body></html>");
	}
	res.end();
}

