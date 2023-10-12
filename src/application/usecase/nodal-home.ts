import { verify } from "jsonwebtoken"
import repository from "../../infrastructure/repositories/repository"
import { config } from 'dotenv'
config()

const nodalHome = async (id: string) => {

    const jwtSignature = String(process.env.JWT_SIGNATURE)
    let token = id.split(" ")[1]

    const verifiedId = verify(token, jwtSignature)

    if (typeof verifiedId == 'object') {
        id = verifiedId.id
    }

    const response = await repository.nodalData(id)
    if (response) {
        response.status = 200
        return response
    } else {
        return { status: 404 }
    }

}

export default nodalHome