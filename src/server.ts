const grpc = require('@grpc/grpc-js')

import hello_proto from './proto'

/**
 * Implements the SayHello RPC method.
 */
const sayHello = (call, callback) => {
  callback(null, {message: 'Hello ' + call.request.name})
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
const server = () => {
  const server = new grpc.Server()
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello})
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start()
  })
}

server()