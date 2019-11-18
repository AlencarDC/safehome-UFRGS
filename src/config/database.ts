import 'dotenv/config'

const DBConfig =  {
  database: process.env.NAME,
  username: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST, 
  dialect: "postgres",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};

export default DBConfig;