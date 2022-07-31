const User = require('../models/user');
const catchAsync = require('../utils/catch');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

module.exports.register = catchAsync(async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const user = new User({username, email});
        const registeredUser = await User.register(user, password);
        const redirectUrl = req.session.returnTo || '/campgrounds';
        req.login(registeredUser, function(err){
            if(err){
                return next(err);
            }
            req.flash('success', `Welcome to YelpCamp`);
            res.redirect(redirectUrl);
        })
    }
    catch(e){
        req.flash('error', e.message);
        res.redirect('/register');
    }
})

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
}