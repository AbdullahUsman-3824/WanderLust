const mongoose = require("mongoose");
const initData = require("../init/data");
const Listing = require("../models/listing");

//Connection to mongoDB
(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/wanderlust");
    console.log("> Connected to MongoDB");
  } catch (error) {
    console.error("> Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
})();

(async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6609c355c1601985a2d15e33",
  }));
  await Listing.insertMany(initData.data);
  console.log(`${initData.data.length} documents inserted!! `);
})();
