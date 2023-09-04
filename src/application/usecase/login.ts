// import repository from '../../infrastructure/repositories/repository'
// import { compare } from 'bcrypt'
// import { sign } from 'jsonwebtoken'

// const login = async (data: { id: string, password: string }) => {
//     try {
//         const nodalExist = await repository.findNodal(data.id)
//         if (nodalExist) {
//             if (await compare(data.password, nodalExist.password)) {
//                 return { message: "success", token: sign({ id: data.id,administration:"nodal"}, String(process.env.JWT_SIGNATURE), { expiresIn: '24h' }) }
//             }
//             return { message: "Wrong password" }
//         } return { message: "Nodal not exist" }
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default login