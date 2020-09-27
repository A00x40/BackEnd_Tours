const dotenv = require('dotenv');

const mongoose = require('mongoose');

const app = require('./main');

dotenv.config({ path: './config.env' });

const db = process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD)

mongoose
  //.connect(process.env.DATABASE_LOCAL, {
  .connect(db, {
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false

  }).then( () => console.log("DB Connection Success"));

// Start Server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
