const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const seedUsers = require("./seed/seed");
const cors = require('cors');
const sequelize = require('./models/user.model').sequelize;

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api', authRoutes);
const startServer = async () => {
    try {
        seedUsers();
        await sequelize.sync();
        app.listen(8000, () => {
            console.log('Server running on http://localhost:8000');
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
startServer();