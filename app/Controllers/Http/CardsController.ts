import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Card from "App/Models/Card";

export default class CardsController {
  public async view({ view }: HttpContextContract) {
    const card = new Card();
    console.log(await Card.find());
    const cards = await Card.find();
    if (cards) {
      return view.render("view", { err: 0, data: cards });
    } else {
      return view.render("view", { err: 1, err_msg: "No entries found..." });
    }
  }
  public async edit({ request, view }: HttpContextContract) {
    const card = new Card();
    // const imageURL = request.input("image");
    const cardID = request.input("card-id");
    const vobj = { langs: {} }; // virtual object
    for (const prop in request.all()) {
      if (/-data$/.test(prop) || /-validated$/.test(prop)) {
        const lang = prop.slice(0, 2);
        const subprop = prop.slice(3);
        console.log("langg");
        if (!vobj.langs[lang]) vobj.langs[lang] = {};
        vobj.langs[lang][subprop] = request.all()[prop];
        console.log(lang, request.all()[prop]);
      } else if (request.all()[prop] && prop !== "card-id") {
        vobj[prop] = request.all()[prop];
      }
    }
    console.log(vobj, { cid: cardID.toString() });
    // console.log("finding", await Card.find({ cid: cardID.toString() })); FIXME: Not working!!
    // console.log(await Card.findOneAndUpdate({ id: cardID }, { $set: vobj }));
  }
}
