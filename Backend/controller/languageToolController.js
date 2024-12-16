// controllers/languageToolController.js
const languageToolService = require('../services/languageToolService');


const checkText = async (req, res) => {
  const { text,language } = req.body; // استخراج النص من جسم الطلب (Request Body)

  if (!text) {
    return res.status(400).json({ message: 'يرجى إدخال النص للتحقق من الأخطاء' });
  }

  try {
    const errors = await languageToolService.checkSpellingAndGrammar(text,language);

    if (errors.length > 0) {
      return res.status(200).json({ errors }); // إرسال الأخطاء
    } else {
      return res.status(200).json({ message: 'لا توجد أخطاء إملائية أو نحوية' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const checkSpelling = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "يرجى إرسال النص للتدقيق." });
  }

  try {
    const errors = languageToolService.checkSpellingUsingTypo(text);
    res.status(200).json({
      originalText: text,
      errors: errors,
    });
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ أثناء التدقيق الإملائي." });
  }
};

module.exports = {
  checkText,
  checkSpelling,
};
