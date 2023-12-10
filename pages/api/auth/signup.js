import { hashPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password, name } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message: "Invalid Inputs",
      });
      return;
    }
    const client = await connectToDatabase();

    const db = client.db();
    const hashedPassword = await hashPassword(password);

    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "User exists already!" });
      return;
    }

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
      name: name,
    });

    res
      .status(201)
      .json({ message: "User created successfully!", user: result });
  }
}

export default handler;
