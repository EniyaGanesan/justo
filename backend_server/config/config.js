module.exports = {
    db: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'user_auth_db',
        dialect:"mysql",
        port:'3306'
    },
    auth: {
        jwtSecret: 'your_jwt_secret',
        lockThreshold: 5,
        linkValidityMinutes: 10,
        rateLimit : 5
        // rateLimit: {
        //     points: 5,
        //     duration: 1
        // }
    }
};
