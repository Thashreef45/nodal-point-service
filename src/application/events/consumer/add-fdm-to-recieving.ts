import * as amqp from 'amqplib'
import { config } from 'dotenv'
import repository from '../../../infrastructure/repositories/repository'
config()

const Url = String(process.env.RabbitMq_PORT)
const queue = `push-fdm-to-nodal-recieved`


const pushFdmToRecievingQueue = async() => {
    const connection = await amqp.connect(Url)
    const channel = await connection.createChannel()
    await channel.assertQueue(queue)

    channel.consume(queue, (data: any) => {
        channel.ack(data)
        execute(data.content.toString())
    })
}


const execute = async (data: any) => {
    data = JSON.parse(data)
    await repository.pushfdmToRecievingQueue(data.id, data.awb)
}

export default pushFdmToRecievingQueue