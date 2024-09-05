var express = require('express');
var router = express.Router();
var userNeedCheck = require('../controller/userNeedCheck')

router.post('/changeLike', userNeedCheck.changeLike)
router.post('/changeUserLike', userNeedCheck.changeUserLike)
router.post('/addComment', userNeedCheck.addComment)

// router.post('/changeCoin', userNeedCheck.changeCoin)
// router.post('/changeCoin', userNeedCheck.changeStar)
// router.post('/changeShare', userNeedCheck.changeShare)

module.exports = router;