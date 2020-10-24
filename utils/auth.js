// Auth server middleware
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/secure');
  }
};

module.exports = { isAuth };
