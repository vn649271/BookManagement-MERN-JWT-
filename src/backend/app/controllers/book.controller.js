const db = require("../models");
const {
    ROLES
} = require('./common');
const User = db.user;
const Role = db.role;
const Book = db.book;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const {
    ObjectId
} = require("mongoose/lib/types");

exports.registerBook = (req, res) => {
    let userId = req.userId;
    User.findOne({
            _id: ObjectId(userId)
        })
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
            if (user.roles - 0 !== ROLES.CREATOR - 0) {
                return res.status(200).send({
                    error: 1,
                    message: "Not has role to create book"
                });
            }
            let now = new Date();
            let book = {
                title: req.body.title,
                description: req.body.description,
                author: req.userId,
                published_at: now.toISOString(),
            };
            Book.insertMany([book]).then((ret) => {
                if (ret.length < 1) {
                    return res.status(200).send({
                        error: 2,
                        message: "Failed to create book"
                    });
                }
                res.status(200).send({
                    error: 0,
                    newBookId: ret[0].id
                });
            });

        });
};

exports.getBooks = (req, res) => {
    let userId = req.userId;
    User.findOne({
            _id: ObjectId(userId)
        })
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
            let filter = {};
            if (user.roles === ROLES.NONE) {
                return res.status(200).send({
                    error: 8,
                    message: "No right to browse book list"
                });
            }
            // Get the books for creator or viewer
            if (user.roles === ROLES.CREATOR ||
                user.roles === ROLES.VIEWER) {
                filter = {
                    author: user.id
                };
            }
            // Get the books according to the filter from client
            if (req.query.old || req.query.new) {
                let now = new Date();
                let _10minAgo = new Date(now - 600 * 1000);
                if (req.query.old) {
                    filter["published_at"] = { "$lt": _10minAgo.toISOString() };
                } else {
                    filter["published_at"] = { "$gte": _10minAgo.toISOString() };
                }
            }
            Book.find(filter).then((ret) => {
                if (ret.length < 1) {
                    return res.status(200).send({
                        error: 2,
                        message: "Failed to create book"
                    });
                }
                res.status(200).send({
                    error: 0,
                    books: ret
                });
            });
        });
};

exports.getBook = (req, res) => {
    let userId = req.userId;
    User.findOne({
            _id: ObjectId(userId)
        })
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
            let filter = {};
            if (req.params.bookId) {
                filter = {
                    _id: ObjectId(req.params.bookId)
                };
            }
            if (user.roles === ROLES.NONE) {
                return res.status(200).send({
                    error: 8,
                    message: "No right to browse book list"
                });
            }
            if (user.roles === ROLES.CREATOR ||
                user.roles === ROLES.VIEWER) {
                filter = {
                    author: user.id
                };
                if (req.params.bookId) {
                    filter = {
                        _id: ObjectId(req.params.bookId),
                        author: user.id
                    };
                }
            }
            Book.find(filter).then((ret) => {
                if (ret.length < 1) {
                    return res.status(200).send({
                        error: 2,
                        message: "No book data"
                    });
                }
                res.status(200).send({
                    error: 0,
                    books: ret
                });
            });
        });
};

exports.deleteBook = (req, res) => {
    let userId = req.userId;
    User.findOne({
            _id: ObjectId(userId)
        })
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
            let filter = {};
            if (req.body.bookId) {
                filter = {
                    _id: ObjectId(req.body.bookId)
                };
            }
            if (user.roles !== ROLES.CREATOR) {
                return res.status(200).send({
                    error: 8,
                    message: "No right to delete the book"
                });
            }
            Book.deleteOne(filter).then((ret) => {
                if (ret.length < 1) {
                    return res.status(200).send({
                        error: 2,
                        message: "No book data"
                    });
                }
                res.status(200).send({
                    error: 0,
                    books: ret
                });
            });
        });
};