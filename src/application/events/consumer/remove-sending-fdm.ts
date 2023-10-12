import * as amqp from 'amqplib'
import { config } from 'dotenv'
import repository from '../../../infrastructure/repositories/repository'
config()

const Url = String(process.env.RabbitMq_PORT)
const queue = `remove-sending-fdm`

const removeSendingFdm = async() =>{
    try {
        const connection = await amqp.connect(Url)
        const channel = await connection.createChannel()
        await channel.assertQueue(queue)

        channel.consume(queue,(data:any)=>{
            channel.ack(data)
            execute(data.content.toString())
        })

    } catch (error) {
        console.log(error)
    }
}

const execute = async(data:any) => {
    data = JSON.parse(data)
    console.log(data,'@nodal consumer')
    await repository.removeAFdmFromSending(data.id,data.awb)
}

export default removeSendingFdm

