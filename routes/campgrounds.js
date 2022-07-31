const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const {isLoggedin, isAuthor, validateCampground} = require('../middleware');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(campgrounds.index)
    .post(isLoggedin, upload.array('image'), validateCampground, campgrounds.createCampground)

router.get('/new', isLoggedin, campgrounds.renderNewForm)

router.route('/:id')
    .get(campgrounds.showCampground)
    .put(isLoggedin, isAuthor, upload.array('image'), validateCampground, campgrounds.updateCampground)
    .delete(isLoggedin, isAuthor, campgrounds.deleteCampground)

router.get('/:id/edit', isLoggedin, isAuthor, campgrounds.renderEditForm)

module.exports = router;