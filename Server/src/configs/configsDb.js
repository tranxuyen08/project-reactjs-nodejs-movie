const mongodb = require('mongoose')

async function connect() {
  try {
    await mongodb.connect("mongodb+srv://tranxuyen08:xuyen123123@xuyen.nvls4ac.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Movie"
    });
    console.log("connect successfully");
  } catch (error) {
    console.log("connect failure");
  }
}

module.exports = { connect };
