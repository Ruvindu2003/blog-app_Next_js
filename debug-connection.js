require('dotenv').config();
const { DataSource } = require('typeorm');
const fs = require('fs');

console.log('Starting debug connection...');

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 3306),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    entities: ['dist/**/*.entity.js'],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
        fs.writeFileSync('debug_error.txt', err.toString() + '\n' + JSON.stringify(err, null, 2));
        process.exit(1);
    });
