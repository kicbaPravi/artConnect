import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { createError } from '../error.js';
import jwt from 'jsonwebtoken';
// Sign up
export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
        await newUser.save();
        res.status(200).send('User has been created!');
    }
    catch (err) {
        next(err);
    }
};
// Sign in
export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return next(createError(404, 'User not found!'));
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        if (!correctPassword)
            return next(createError(404, 'Wrong credentials!'));
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        // return access token in cookie
        const { password, ...others } = user._doc;
        res
            .cookie('access_token', token, {
            httpOnly: true,
            expires: new Date(Number(new Date()) + 8 * 60 * 60 * 1000)
            // expires: new Date(Number(new Date()) + 10 * 1000)
        })
            .status(200)
            .json(others);
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=auth.js.map