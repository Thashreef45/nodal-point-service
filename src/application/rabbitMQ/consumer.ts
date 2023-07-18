// import * as amqp from 'amqplib'

// const Url = 'amqp://localhost:5672'

// const registerNodal = async() => {
//     try {
//         console.log('-----registerNodal--consumer')
//         let recivedData
//         const connection = await amqp.connect(Url)
//         const channel = await connection.createChannel()
//         const queue = 'create-nodal'
//         await channel.assertQueue(queue)
//         channel.consume(queue,(data:any)=>{
//             recivedData = data?.content.toString()
//             channel.ack(data)
//             console.log(data.content.toString())
//         })
//         console.log(recivedData,'recivedData ---16')
//     } catch (error) {
//         console.log(error)  
//     }
// }

// export default registerNodal