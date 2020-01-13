//This is a good file to study and understand how to setup and run tests with mocha

import should from 'should';
import {readFile} from 'fs';
import request from 'request';
import mocha from 'mocha';

/* Globals */
let listings;

/*
  Describe blocks organize your unit tests into distinct categories of functionality.
 */
mocha.describe('UF Directory Server Unit Tests', () => {

    /*
      This mocha.before hook loads the JSON data to the listings variable, so that we can compare
      the response to 'http://localhost:5000/listings' to the data we expect to receive.
     */
    mocha.before((done) => {
        readFile('listings.json', 'utf8', (err, data) => {
            listings = JSON.parse(data);

            /*
              Calling done() will pass code execution to the next appropriate block of code.
              In this case, execution will pass to the first mocha.it() statement.
             */
            done();
        });
    });

    mocha.describe('Server responds to requests', () => {
        mocha.it('should respond', (done) => {
            /*
              The request module allows us to make HTTP requests. This module could also be useful in
              making API calls to web services you make use of in your application, such as Google Maps.
             */
            request.get('http://localhost:5000', (error, response, body) => {
                /*
                  The 'should' module is an assertion library. Assertions allow us to compare the functions
                  that we are testing to the values we expect to recieve back. In this block, we expect that the
                  server should respond to a request made.

                  Note in this unit test we are only testing the existence of a response, and are not concerned
                  with what is contained in the response.
                 */
                should.not.exist(error);
                should.exist(response);
                done();
            });
        });
    });

    mocha.describe('Server provides listing data as JSON on proper request', () => {
        mocha.it('responds correctly to a GET request to "/listings"', (done) => {
            request.get('http://localhost:5000/listings', (error, response, body) => {
                should.not.exist(error);
                should.exist(body);

                const bodyData = JSON.parse(body);
                should.deepEqual(listings, bodyData);
                done();
            });
        });

        mocha.it('responds with a 404 error to other GET requests', (done) => {
            request.get('http://localhost:5000/pizza', (error, response, body) => {
                response.statusCode.should.be.exactly(404);
                body.should.be.exactly('Bad gateway error');
                done();
            });
        });
    });

});
