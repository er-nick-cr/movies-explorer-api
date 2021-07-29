const { NODE_ENV, DB_NAME } = process.env;

const mongoRoute = `mongodb://localhost:27017/${
  NODE_ENV === 'production' ? DB_NAME : 'moviedb'
}`;
const mongoSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

module.exports = { mongoRoute, mongoSettings };
