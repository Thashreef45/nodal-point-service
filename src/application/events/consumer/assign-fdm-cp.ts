import * as amqp from 'amqplib'
import { config } from 'dotenv'
import repository from '../../../infrastructure/repositories/repository'
import publisher from '../publisher/publisher'
config()


const URL = String(process.env.RabbitMq_PORT)
const queue = 'fdm-cp-to-nodal'


const acceptBookedFdm = async () => {
    const connection = await amqp.connect(URL)
    const channel = await connection.createChannel()
    await channel.assertQueue(queue)

    channel.consume(queue, (data: any) => {
        channel.ack(data)
        execute(data.content.toString())
    })
}

export default acceptBookedFdm



const execute = async (data: any) => {
    data = JSON.parse(data)
    const fdm = data.data

    const existingData = await repository.getSendingFdms(data.nodalId)

    let updatedFdms
    if (existingData) {

        updatedFdms = existingData.fdm.sending
        updatedFdms.push(...fdm)

        updateFdm(data.nodalId,fdm,data.address,data.name)
    }    
}


const updateFdm = (id:string,data:[string],address:string,name:string) => {
    repository.assignCpBookedFdms(id,data)
    UpdateConsignmentStatus(id,data,address,name)
}


//after assigning of fdm from cp to nodalPoint - It should be updated in Consignment db.
const UpdateConsignmentStatus = (id:string,data:any,address:string,name:string) => {
    publisher.UpdateConsignmentStatus({id,data,address,name})
}


// Recieving cp's booked fdms
