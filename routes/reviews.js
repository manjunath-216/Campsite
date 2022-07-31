const express = require('express');
const router = express.Router({mergeParams: true});
const {isLoggedin, isReviewAuthor, validateReview} = require('../middleware');
const reviews = require('../controllers/reviews');

router.post('/', isLoggedin, validateReview, reviews.createReview)

router.delete('/:reviewId', isLoggedin, isReviewAuthor, reviews.deleteReview)

module.exports = router;