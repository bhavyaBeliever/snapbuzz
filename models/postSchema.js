const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the Comment schema
const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Custom validation function to check that at least one photo or video is provided
const mediaValidation = function() {
  return this.photos.length > 0 || this.videos.length > 0;
};

// Create the Post schema
const PostSchema = new Schema({
  photos: [{ type: String }],
  videos: [{ type: String }],
  likes: {
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    count: { type: Number, default: 0 }
  },
  comments: [CommentSchema],
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add the custom validation to the schema
PostSchema.path('photos').validate(mediaValidation, 'A post must contain at least one photo or video.');
PostSchema.path('videos').validate(mediaValidation, 'A post must contain at least one photo or video.');

// Create and export the Post model
module.exports = mongoose.model('Post', PostSchema);
