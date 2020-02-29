class AuthMiddleware {
    ignite(req,res,next) {
        console.log('auth');
        return next();
    }
}

module.exports = new AuthMiddleware();