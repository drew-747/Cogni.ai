const LearningModule = require('../src/models/LearningModule');

exports.createModule = async (req, res) => {
  try {
    const module = new LearningModule(req.body);
    await module.save();
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateModule = async (req, res) => {
  try {
    const module = await LearningModule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!module) return res.status(404).json({ message: 'Module not found' });
    res.json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteModule = async (req, res) => {
  try {
    const module = await LearningModule.findByIdAndDelete(req.params.id);
    if (!module) return res.status(404).json({ message: 'Module not found' });
    res.json({ message: 'Module deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
