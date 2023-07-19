export const mongooseObj = {
  url: `mongodb+srv://admin:${process.env.PASSWORD}@customermanagement.huo2wuv.mongodb.net/?retryWrites=true&w=majority`,
  options: {
    dbName: "customer_management",
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
