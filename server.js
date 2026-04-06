const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  const { name, event } = req.body;
  await db.collection("registrations").add({ name, event });
  res.send("Success");
});

app.get("/data", async (req, res) => {
  const snapshot = await db.collection("registrations").get();
  const registrations = snapshot.docs.map(doc => doc.data());
  res.json(registrations);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});