const { NODE_ENV, DB } = process.env;

const mongoRoute = `${
  NODE_ENV === 'production' ? DB : 'mongodb://localhost:27017/moviedb'
}`;
const mongoSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

module.exports = { mongoRoute, mongoSettings };
