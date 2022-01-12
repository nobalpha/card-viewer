const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main_2() {
  mongoose
    .connect("mongodb://joshuqa:test12345@localhost:27017/exolingo", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(async () => {
      console.log("DB Connected!");
      var connection = mongoose.connection;
      // run logic once db is connected.
      const result = connection.db.collection("cards").find({});
      console.log(await result.toArray());
    })
    .catch((err) => {
      console.log(err);
    });
}

async function main() {
  await mongoose.connect(
    "mongodb://joshuqa:test12345@localhost:27017/exolingo"
  );
  console.log("DB connected");
  const cardSchema = new mongoose.Schema({
    id: Number,
    langs: Object,
    image: String,
  });
  console.log("Schema...");
  const Card = mongoose.model("Card", cardSchema);
  const card = new Card();
  console.log("Model");
  card.id = 1234;
  card.langs = {};
  card.image = "afda";
  console.log("Saving");
  await card.save();
  console.log("Saved");

  console.log(await mongoose.model("Card").find({}));
}
