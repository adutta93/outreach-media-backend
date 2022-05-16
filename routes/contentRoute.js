const express = require('express');
const {
	getAllContent,
	getContentById,
	createContent,
	updateContent,
	deleteContent,
	SearchContent,
	ElasticIndex,
} = require('../controller/contentController');

const { protect, isAdmin } = require('../middleware/authHandler');

const router = express.Router();
router.use(ElasticIndex);
// router.get('/search/:index/:type', SearchContent);

router.get('/search', SearchContent);
router.route('/content').get(getAllContent).post(createContent);
// router.route('/content/search').get(SearchContent);
router
	.route('/content/:id')
	.get(protect, getContentById)
	.put(protect, updateContent)
	.delete(protect, isAdmin, deleteContent);

module.exports = router;
