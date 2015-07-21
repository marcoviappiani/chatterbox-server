/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var results = [];
var validUrls = ['/classes/messages','/classes/room1','/classes/chatterbox'];

// http://127.0.0.1:3000/classes/messages/?order=-createdAt.
// indexOf(searchvalue, from index)



exports.requestHandler = function(request, response) {

  // var pos1 = request.url.indexOf("/", 7);
  // var pos2 = request.url.lastIndexOf("/");
  // var subString = request.url.substring(pos1, pos2);
  // console.log(subString);
  // console.log(request.url);
  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode;
  var jsonObject = {
    message: "",
    results: results
  }; 
 
  var headers = defaultCorsHeaders;
 
  headers['Content-Type'] = "application/JSON";
  
  if(validUrls.indexOf(request.url) === -1) {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(jsonObject));

  } else if(request.method === 'GET') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    jsonObject.message = "Hello, World!";
    response.end(JSON.stringify(jsonObject));

  } else if(request.method === 'POST'){
    statusCode = 201;
    response.writeHead(statusCode, headers);
    var body;
    body = '';
    request.setEncoding('utf8');

    request.on('data', function (chunk) {
      body += chunk;
    });

    request.on('end', function () {
      try {
        var data = JSON.parse(body);
        results.push(data);
      } catch (er) {
        response.statusCode = 400;   
        return response.end('error: ' + er.message);
      }
      response.end(JSON.stringify(jsonObject));
    });

  }
};




// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

