const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, config.auth.jwtSecret, { expiresIn: '1h' });
};

// Register User
const registerUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword });
    res.status(201).send('User created');
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || user.locked) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        user.failed_attempts += 1;
        if (user.failed_attempts >= config.auth.lockThreshold) {
            user.locked = true;
        }
        await user.save();
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    user.failed_attempts = 0;
    await user.save();
    const token = generateToken(user);
    res.json({ token });
};

const generateLink = async (req, res) => {
    const { username } = req.body;
    const token = generateToken({ username });
    res.json({ link: `http://localhost:3000/auth/link/${token}` });
};

const linkLogin = async (req, res) => {
    const token = req.params.token;
    jwt.verify(token, config.auth.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        const user = decoded;
        res.json({ token: generateToken(user) });
    });
};

const getTime = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, config.auth.jwtSecret, (err) => {
        if (err) {
            console.log(token.split(' ')[1])
            console.log(err)
            return res.status(401).json({error: 'Invalid token'})
        };
        res.json({ time: new Date() });
    });
};

const kickout = async (req, res) => {
    const { username } = req.body;
    await User.update({ locked: true }, { where: { username } });
    res.json({ message: `User ${username} has been kicked out.` });
};
module.exports = {
    registerUser, login, kickout, getTime, linkLogin, generateLink
}