import express, { Application } from 'express';
import helmet from 'helmet';
import nocache from 'nocache';
import compression from 'compression';
import logger from 'morgan';
import cors from 'cors';
import env from 'dotenv';
import grpcServer from './src/interfaces/grpc-config/grpc-server';
import addNewCP from './src/application/events/consumer/add-new-cp';
import acceptBookedFdm from './src/application/events/consumer/assign-fdm-cp';
import removeSendingFdm from './src/application/events/consumer/remove-sending-fdm';
import getNodalDetailsToApex from './src/application/events/consumer/get-nodal-details-to-apex';
import pushFdmToRecievingQueue from './src/application/events/consumer/add-fdm-to-recieving';
import removeRecievedFdm from './src/application/events/consumer/remove-recieved-fdm';
import fdmToNodalSendingQueue from './src/application/events/consumer/add-fdm-to-sending';

class nodeApp {
  public app: Application

  constructor() {
    env.config()
    this.app = express()

    this.initialiseMiddleware()
    this.initiliseGatewayListner()
    this.messageConsumers()
  }


  private initialiseMiddleware(): void {
    this.app.use(cors())
    this.app.use(helmet());
    this.app.use(nocache())
    this.app.use(compression())
    this.app.use(logger('dev'))
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private messageConsumers() {
    acceptBookedFdm()
    addNewCP()
    removeSendingFdm()
    getNodalDetailsToApex()
    pushFdmToRecievingQueue()
    removeRecievedFdm()
    fdmToNodalSendingQueue()
  }

  private initiliseGatewayListner(): void {
    grpcServer()
  }

  public listen(port: string): void {
    this.app.listen(port, () => console.log('nodal service is running at', port))
  }
}


export default nodeApp