import express from "express";
import database from "../database/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Retrieve a list of all applications.
router.get("/", async (req, res) => {
  let collection = await database.collection("applications");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// Retrieve single application by ID
router.get("/:id", async (req, res) => {
  let collection = await database.collection("applications");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Creates a new application.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      companyName: req.body.companyName,
      companyAddress: req.body.companyAddress,
      income: req.body.income,
      expenses: req.body.expenses,
      assets: req.body.assets,
      liabilities: req.body.liabilities,
      loanAmount: req.body.loanAmount,
      applicationReason: req.body.applicationReason,
    };
    let collection = await database.collection("applications");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding application");
  }
});

// Update an application by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        companyName: req.body.companyName,
        companyAddress: req.body.companyAddress,
        income: req.body.income,
        expenses: req.body.expenses,
        assets: req.body.assets,
        liabilities: req.body.liabilities,
        loanAmount: req.body.loanAmount,
        applicationReason: req.body.applicationReason,
      },
    };

    let collection = await database.collection("applications");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating application");
  }
});

// Delete an application
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = database.collection("applications");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting application");
  }
});

export default router;