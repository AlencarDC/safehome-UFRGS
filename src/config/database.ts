import 'dotenv/config'

const DBConfig =  {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST, 
  dialect: "postgres",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};

export default DBConfig;