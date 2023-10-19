import * as amqp from 'amqplib'
import { config } from 'dotenv'
import repository from '../../../infrastructure/repositories/repository';
config()


const queue = 'nodal-details-to-apex';
const URL = String(process.env.RabbitMq_PORT)


const getNodalDetailsToApex = async () => {
    const connection = await amqp.connect(URL)
    const channel = await connection.createChannel()
    await channel.assertQueue(queue)
    channel.consume(queue, async(data: any) => {
        const cpData = await executeResponse(data?.content.toString())
        if(cpData){
            channel.sendToQueue(
                data.properties.replyTo,
                Buffer.from(JSON.stringify(cpData)),
                { correlationId: data.properties.correlationId }
            );    
        }
        channel.ack(data)
    })
}

export default getNodalDetailsToApex

const executeResponse = async(data: any) => {
    data = JSON.parse(data)
    let response:any = await repository.nodalData(data.id)
    return {id:response.id,address:response.address,name:response.name}
}