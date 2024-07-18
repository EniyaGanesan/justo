const User = require('../models/user.model');
const checkLock = async (req, res, next) => {
    const user = await User.findOne({where: {username: req.body.username}});
    if (user && user.locked) {
        return res.status(403).send({data:'Account is locked.'});
    }
    next();
};
module.exports = checkLock;