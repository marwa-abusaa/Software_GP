// services/languageToolService.js
const axios = require('axios');

const Typo = require("typo-js");


const checkSpellingAndGrammar = async (text,language) => {
  const apiUrl = 'https://api.languagetool.org/v2/check'; // رابط API الخاص بـ LanguageTool

  try {
    const response = await axios.post(apiUrl, null, {
      params: {
        text: text,
        language: language, // اللغة العربية
      }
    });

    return response.data.matches; // إرجاع الأخطاء المكتشفة
  } catch (error) {
    throw new Error('خطأ في الاتصال بـ LanguageTool API');
  }
};



let dictionary;

const loadDictionary = () => {
  if (!dictionary) {
    dictionary = new Typo("en_US"); // تحميل القاموس الإنجليزي مرة واحدة
  }
};

const checkSpellingUsingTypo = (text) => {
  loadDictionary(); // تأكد من تحميل القاموس
  const words = text.split(/\s+/); // تقسيم النص إلى كلمات
  const errors = [];

  words.forEach((word) => {
    if (!dictionary.check(word)) {
      errors.push({
        word: word,
        suggestions: dictionary.suggest(word),
      });
    }
  });

  return errors;
};
module.exports = {
  checkSpellingAndGrammar,
  checkSpellingUsingTypo,
};
