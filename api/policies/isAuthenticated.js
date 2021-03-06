module.exports = (req, res, next) => {
    // if (req.session.authenticated) {
    if (req.isAuthenticated()) {
        return next();
    }

    if (req.wantsJSON) {
        return res.forbidden();
    }

    return res.redirect('/login');
};

