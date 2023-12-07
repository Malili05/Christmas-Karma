const apiAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        console.log('You are not logged in');
    } else {
        next();
    }
};
module.exports = apiAuth;