const DBConfig =  {
  database: "safehome",
  username: "postgres",
  password: "safehome",
  host: "localhost", 
  dialect: "postgres",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};

export default DBConfig;