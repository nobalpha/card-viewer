// import { model, Schema, connection } from "@ioc:Mongoose";

/* const cardModel = mongoose.model(
  "Card",
  new mongoose.Schema({
    id: Number,
    langs: Object,
    image: String,
  })
); */

// FIXME
// So, basically, with object destructuring, I can define this model without any problem, but the thing is, it hangs when I start a find query...
// What I'm thinking, as a theory, is with destructuring, I lose the connection property of mongoose object, so it can't poll and get the data form the database. Am I right?

import mongoose from "@ioc:Mongoose";

const cardModel = mongoose.model(
  "Card",
  new mongoose.Schema({
    id: Number,
    langs: Object,
    image: String,
  })
);

console.log("Card Model created.");
// console.log(mongoose.model == model);  // It returns true!?! If so, why the heck, it wasn't working!

// If I import it with a reference namespace (?), it works like a charm!
// So, the provider works, as a IoC containerizer, that means it caches the result of your function/object (?) and whenever you call it, like a variable, it gives you access of e.g. your pre-established connection...
// Also, I needed to create a contract file whom I've not understood the functionality yet... It seems only a type definition for this... junky... little... s*... typescript (?)

export default cardModel;
