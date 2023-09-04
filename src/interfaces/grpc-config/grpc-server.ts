import * as grpc from '@grpc/grpc-js'
import * as protoLoader from "@grpc/proto-loader"
import { config } from 'dotenv'
import controller from '../controller/controller'
config()

const packageDef = protoLoader.loadSync('/home/thashreef/Brototype/express-link/server/microservices/nodal/src/interfaces/grpc-config/nodal.proto')
const grpcObject = grpc.loadPackageDefinition(packageDef)
const nodalPackage:any = grpcObject.nodalPackage;

const server = new grpc.Server()

const grpcServer = () => {
    server.bindAsync(String(process.env.GRPC_PORT),
    grpc.ServerCredentials.createInsecure(),
    (err,port) => {
        if(!err){
            server.start()
            console.log(`gRPC server is running at Port:`, port)
        }
    }
    )
}

server.addService(nodalPackage.nodalService.service,{
    "Home":controller.home
})


export default grpcServer


