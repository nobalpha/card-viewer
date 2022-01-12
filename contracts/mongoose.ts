declare module "@ioc:Mongoose" {
  import Mongoose from "mongoose";
  interface MongooseDriver {
    "@ioc:Mongoose": typeof Mongoose;
  }
  /* interface ContainerBindings {
    "@ioc:Mongoose/Schema": typeof Schema;
    "@ioc:Mongoose/Model": typeof model;
    "@ioc:Mongoose/Mongoose": typeof Mongoose;
  } */
}
