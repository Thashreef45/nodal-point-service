import express,{Request,Response,Application} from 'express'
import controller from './controller/controller'

const route: Application = express()

route.post('/create-nodal',controller.createNodal)

export default route