// import repository from "../../infrastructure/repositories/repository";
// import { hash } from 'bcrypt'
// import { verify } from "jsonwebtoken";

// const nodalSignup = async (data: any, token: string ) => {
//     token = token.split(" ")[1]
//     const nodalExist = await repository.findNodal(data.id)
//     const pincodeAvailable = await repository.findByPin(data.address.pincode)
//     const isApex = verify(token, String(process.env.JWT_SIGNATURE))
//     if (!nodalExist && !pincodeAvailable) {
//         if (typeof isApex === 'object' && isApex.administration =='apex') {
//             data.password = await hash(data.password, 10)
//             const resData = await repository.createNodal(data)
//             return { message: 'success', data: resData }
//         }else{
//             return {message:'Apex not authorized'}
//         }
//     } else {
//         return { message: 'Nodal Point Already Exist' }
//     }
// }

// export default nodalSignup