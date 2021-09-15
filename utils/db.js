import mongoose from "mongoose";

const connection = {};

async function connect() {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("nova conexao");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
  if (process.env.NODE_ENV === "production") {
    await mongoose.disconnect();
    connection.isConnected = false;
  } else {
    console.log("nao disconectado");
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
