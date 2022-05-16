const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const contentSchema = new mongoose.Schema(
	{
		notes: {
			type: String,
			maxlength: 5000,
			trim: true,
			// required: true,
			es_indexed: true,
		},
		title: {
			type: String,
			maxlength: 500,
			trim: true,
			// required: true,
			es_indexed: true,
		},
		tags: {
			type: String,
			maxlength: 500,
			trim: true,
			// required: true,
			es_indexed: true,
		},
		photo: {
			type: String,
		},
		writer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			es_indexed: true,
		},
		contentState: {
			type: String,
			default: 'Draft',
		},
	},
	{ timestamps: true }
);
contentSchema.plugin(mongoosastic, {
	host: 'localhost',
	port: 9200,
});

let Content = mongoose.model('Content', contentSchema);

Content.createMapping((err, mapping) => {
	console.log('mapping created');
});

// var stream = Contents.synchronize();
// stream.on('error', function (err) {
// 	console.log('Error while synchronizing' + err);
// });
// module.exports = mongoose.model('Contents', contentSchema);
module.exports = {
	Content,
};
