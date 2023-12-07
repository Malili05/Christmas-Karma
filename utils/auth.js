// auth.js

const withAuth = (redirectIfNotLoggedIn = true) => (req, res, next) => {
  if (redirectIfNotLoggedIn && !req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
