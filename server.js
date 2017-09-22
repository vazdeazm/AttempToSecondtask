'use strict'
/**
 * Import the 'restify' module and create an instance.
 */
const restify = require('restify')
const globals = require('./modules/globals')
const server = restify.createServer()

/**
 * Import modules to access external data
 */
const Accordion = require('./modules/displaycontent')
server.use(restify.fullResponse())
server.use(restify.queryParser()) // needed to acces req.quer.q (to search something in the query)
server.use(restify.bodyParser())  // needed to access req.body (generally for POST, PUT, etc)
server.use(restify.authorizationParser())  // needed to access req.authorization (for securing the API)
//Endpoints
// basic response from the root endpoint
server.get('/', function(req, res, next) {
	Accordion.fetchData(function(data){
		res.send(globals.status.ok, data)
		res.end()
	})
})

//Search for heading and content and getting the results using GET
server.get('/sections', Accordion.searchSection)

//Port number
const pNum = 8080
const port = process.env.PORT || pNum

// now run the server and print a message to tell if it worked
server.listen(port, function(err) {
	if (err) {
		console.error(err)
	} else {
		console.log('Success - App is running at : ' + port)
	}
})
