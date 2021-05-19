const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  post_data: { type: String, required: true },
  post_date: { type: Date, default: Date.now(), required: true },
});

PostSchema.set('toJSON', { virtuals: true });

PostSchema.virtual('url').get(function () {
  return `/post/${this._id}`;
});

PostSchema.virtual('edit_url').get(function () {
  return `/post/${this._id}/edit`;
});

PostSchema.virtual('delete_url').get(function () {
  return `/post/${this._id}/delete`;
});

module.exports = mongoose.model('Post', PostSchema);
