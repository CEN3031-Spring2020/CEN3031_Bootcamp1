import * as http from 'http';
const port = 5000;

const requestHandler = function (request, response) {
    response.end('Request received!');
};

// a server is created, but not started
const server = http.createServer(requestHandler);

// the server is now started, listening for requests on port 5000 - go to your browser and paste in http://127.0.0.1:5000
server.listen(port, () => {
    //once the server is listening, this callback function is executed
    console.log(`Server listening on: http://127.0.0.1:${port}`);
});

console.log('Is the server started?');
