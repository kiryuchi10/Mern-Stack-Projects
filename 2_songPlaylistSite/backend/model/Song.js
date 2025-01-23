// Song Model
const Song = mongoose.model('Song', new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    songcode: { type: String, required: true, unique: true },
    album: String,
    duration: { type: Number, required: true },
    fileId: { type: mongoose.Schema
                            .Types.ObjectId, ref: 'uploads.files' }
    // Reference to GridFS file
}));

module.exports = mongoose.model('Song', Song);