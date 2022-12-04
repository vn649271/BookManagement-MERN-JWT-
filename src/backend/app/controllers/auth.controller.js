const config = require("../config/auth");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

var salt = "";

exports.getSalt = (req, res) => {
    salt = bcrypt.genSaltSync(10);
    res.status(200).send({ 
        error: 0,
        data: { salt }
    })
}

exports.signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({
                error: 1,
                message: err
            });
            return;
        }

        if (req.body.roles) {
            Role.find({
                    name: {
                        $in: req.body.roles
                    }
                },
                (err, roles) => {
                    if (err) {
                        res.status(500).send({
                            error: 2,
                            message: err
                        });
                        return;
                    }

                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({
                                error: 3,
                                message: err
                            });
                            return;
                        }

                        res.send({
                            message: "User was registered successfully!"
                        });
                    });
                }
            );
        } else {
            Role.findOne({
                name: "user"
            }, (err, role) => {
                if (err) {
                    res.status(500).send({
                        error: 4,
                        message: err
                    });
                    return;
                }

                user.roles = [role._id];
                user.save(err => {
                    if (err) {
                        res.status(500).send({
                            error:5,
                            message: err
                        });
                        return;
                    }

                    res.send({
                        message: "User was registered successfully!"
                    });
                });
            });
        }
    });
};

exports.signin = (req, res) => {
    User.findOne({
            username: req.params.username
        })
        // .populate("roles", "-__v")
        .exec((err, user) => {
            if (err) {
                res.status(500).send({
                    error: 6,
                    message: err
                });
                return;
            }
            if (!user) {
                return res.status(404).send({
                    error: 7,
                    message: "User Not found"
                });
            }
            if (req.params.password != user.password) {
                return res.status(401).send({
                    error: 8,
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({
                id: user.id
            }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
            res.status(200).send({
                error: 0,
                data: {
                    id: user._id,
                    username: user.username,
                    accessToken: token
                }
            });
        });
};