import { connect } from "mongoose";

export async function connectMongo() {
  const user = 'admin'
  const password = 'admin'
  const daseDatos = 'ecommerce'
  const uri = `mongodb+srv://${user}:${password}@ecommerce.wjlqeps.mongodb.net/${daseDatos}?retryWrites=true&w=majority`
  try {
    await connect(
      `${uri}`
    );
    console.log("conectado a mongo");

  } catch (error) {
    console.log(error);
    throw "no se ha podido conectar a mongo";
  }
}
