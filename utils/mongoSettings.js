const mongoRoute = 'mongodb://localhost:27017/mestodb';
const mongoSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

module.exports = { mongoRoute, mongoSettings };
