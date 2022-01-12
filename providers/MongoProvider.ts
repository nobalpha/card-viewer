import { ApplicationContract } from "@ioc:Adonis/Core/Application";
import { Mongoose, set } from "mongoose";
/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class MongoProvider {
  constructor(protected app: ApplicationContract) {}

  public async register() {
    set("debug", true);
    const mongoose = new Mongoose();
    const URI = "mongodb://joshuqa:test12345@localhost:27017/exolingo";
    await mongoose.connect(URI);
    console.log("Connected");
    await this.app.container.singleton("Mongoose", () => {
      console.log("Using the singleton!");
      mongoose.set("debug", true);
      return mongoose;
    });
    // console.log("Binded...");
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    await this.app.container.use("Mongoose").disconnect();
  }
}
