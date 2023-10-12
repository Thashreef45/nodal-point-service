import { compare } from 'bcrypt'
import { sign } from "jsonwebtoken";
import repository from '../../infrastructure/repositories/repository';


const login = async (data:any) => {
    try {
        const nodalExist = await repository.findNodal(data.id)
        if (nodalExist) {
            if (await compare(data.password, nodalExist.password)) {
                return { message: "success", token: sign({ id: data.id,administration:"nodal"}, String(process.env.JWT_SIGNATURE), { expiresIn: '24h' }) ,status:200}
            }else{
                return { message: "Wrong password",status:401 }
            }
        }else{
            return { message: "Nodal not exist" ,status:404}
        }

    } catch (error) {
        console.log(error)
    }
}

export default login