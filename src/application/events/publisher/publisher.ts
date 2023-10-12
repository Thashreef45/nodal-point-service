import * as amqp from 'amqplib'
import { config } from 'dotenv'
config()


const URL = String(process.env.RabbitMq_PORT)

const publisher = async(queue: string, data: any) => {
    const connect = await amqp.connect(URL)
    const channel = await connect.createChannel()
    await channel.assertQueue(queue)
    channel.sendToQueue(queue,Buffer.from(JSON.stringify(data)))
}

const addNewNodal = (data: any) => {
    try {
        const queue = 'add-new-nodal'
        publisher(queue, data)
    } catch (error) {
        console.log(error)
    }
}

const UpdateConsignmentStatus = (data:any) => {
    try {
        const queue = 'update-consignment-after-reaching-nodal'
        publisher(queue,data)
    } catch (error) {
        console.error(error)
    }
}


export default {
    addNewNodal,
    UpdateConsignmentStatus
}