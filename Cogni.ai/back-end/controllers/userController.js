const User = require('../src/models/User');
const aiService = require('../services/aiService');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { preferences } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { preferences }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.analyzeLearningStyle = async (req, res) => {
  try {
    const { responses } = req.body;
    const learningStyle = await aiService.analyzeLearningSyle(responses);
    await User.findByIdAndUpdate(req.user.id, { learningStyle });
    res.json({ learningStyle });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
