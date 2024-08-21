const LearningModule = require('../src/models/LearningModule');
const User = require('../src/models/User');
const aiService = require('../services/aiService');
const gamificationService = require('../services/gamificationService');

exports.getModules = async (req, res) => {
  try {
    const modules = await LearningModule.find();
    res.json(modules);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getModuleById = async (req, res) => {
  try {
    const module = await LearningModule.findById(req.params.id);
    if (!module) return res.status(404).json({ message: 'Module not found' });
    
    const personalizedContent = await aiService.generatePersonalizedContent(req.user.learningStyle, module.title);
    module.content = personalizedContent;
    
    res.json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.completeModule = async (req, res) => {
  try {
    const { moduleId, assessmentScore } = req.body;
    const user = await User.findById(req.user.id);
    
    user.progress.set(moduleId, assessmentScore);
    user.points += gamificationService.calculatePoints([moduleId], [assessmentScore]);
    user.level = gamificationService.determineLevel(user.points);
    
    await user.save();
    res.json({ message: 'Module completed', points: user.points, level: user.level });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};