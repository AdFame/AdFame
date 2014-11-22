'use strict';
var Hapi = require('hapi');
var Path = require('path');
var joi = require('joi');
var port = Number(process.argv[2]) || 3000;
// var server = Hapi.createServer('0.0.0.0', port);
var server = new Hapi.Server('0.0.0.0', port, { files: { relativeTo: Path.join(__dirname, 'public') } });
var dbOpts = {
  "url"       : "mongodb://localhost:27017/AdFame",
  "options"   : {
    "db"    : {
      "native_parser" : false
    }
  }
};

server.pack.register(require('./plugin'), function (err) {
  if (err) { console.error('Failes to load a plugin:', err); }
});
server.pack.register({
  plugin:require('hapi-mongodb'),
  options: dbOpts 
  
},
function(err){
  if(err){
    console.err(err);
    throw err;
  }
 
});

server.route({
    method: 'GET',
    path: '/grow2',
    handler: function (request, reply) {
        reply.file('./grow2 demo/grow2.html');
    }
});
server.route({
    method: 'GET',
    path: '/grow',
    handler: function (request, reply) {
        reply.file('./growdemo/containerGrow.html');
    }
});

server.route({
    method: 'GET',
    path: '/ball',
    handler: function (request, reply) {
        reply.file('./ball demo/ballbounce.html');
    }
});



server.route({
  method: 'GET',
  path: '/data',
  handler: function (request, reply) {
    var db = request.server.plugins['hapi-mongodb'].db;
    db.collection('data').find().toArray(function (err, doc){
      reply(doc);
    });
  }
});
 

server.route({
  method: 'POST',
  path: '/data',
  config: {
   
    handler: function (request, reply) {

      var Ad = {
        name: request.payload.name,
        data: request.payload.data
      };
      var db = request.server.plugins['hapi-mongodb'].db;

      db.collection('data').insert(Ad, {w:1}, function (err, doc){
          if (err){
            return reply(Hapi.error.internal('Internal MongoDB error', err));
          }else{
            reply(doc);
          }
      });
    },
    validate: {
      payload: {
        name: joi.string().required(),
        data: joi.object().required()
      }
    }
  }
});
 

server.start();
console.log('server started on port', port);
