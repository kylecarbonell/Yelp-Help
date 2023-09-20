import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { db, adminDB } from "./Mongo.mjs";

import dotenv from "dotenv";
import { v4 as uuid } from "uuid";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

dotenv.config();
