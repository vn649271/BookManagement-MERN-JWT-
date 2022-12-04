const {
    authJwt
} = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/user/all", controller.allAccess);

    app.get("/user/creator", [authJwt.verifyToken], controller.userBoard);

    app.get(
        "/user/viewer",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/user/view_all",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};