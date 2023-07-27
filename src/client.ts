import parseArgs from 'minimist'
const grpc = require('@grpc/grpc-js')

import hello_proto from './proto'

const client = async () => {
  const argv = parseArgs(process.argv.slice(2), {
    string: 'target'
  })
  const target = argv.target || 'localhost:50051'
  const user = argv._.length ? argv._[0] : 'world'

  const client = new hello_proto.Greeter(target, grpc.credentials.createInsecure())
  client.sayHello({name: user}, function(err, response) {
    console.log('Greeting:', response.message)
  })
  // const response = await client.sayHello({name: user})
  // client.sayHello({name: user})
  // console.log('Greeting:', response.message)
}

client()