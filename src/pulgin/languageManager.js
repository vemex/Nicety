// i18n-setup.js
import Axios from 'axios';

let i18n = {};

function seti18m (that, value) {
    i18n[that] = value;
}

function geti18n (that) {
    return i18n[that];
}

let loadLanguages = {};

function getLoadLanguages (that) {
    if (!loadLanguages[that]) {
        loadLanguages[that] = [];
    }
    return loadLanguages[that];
}

/**
 * 加载语言文件
 * @param lang
 * @returns {*}
 */
function loadLanguageResource (that, lang) {
    let i18n = geti18n(that);
    let loadedLanguages = getLoadLanguages(that);
    if (loadedLanguages.indexOf(lang) > 0) {
        return Promise.resolve(i18n.messages[lang]);
    }
    return Axios.get(`./i18n/${lang}.json`).then(function (messages) {
        i18n.setLocaleMessage(lang, messages);
        loadedLanguages.push(lang);
        return messages;
    });
}

function setLang (that, lang) {
    let i18n = geti18n(that);
    i18n.locale = lang;
    Axios.defaults.headers.common['Accept-Language'] = lang;
    document.querySelector('html').setAttribute('lang', lang);
    return lang;
}

class LanguageManager {
    constructor (i18n, defaultLang) {
        seti18m(this, i18n);
        this.defaultLang = defaultLang;
    }

    loadLanguageAsync (lang) {
        if (lang === undefined) {
            lang = this.defaultLang;
        }
        if (i18n.locale !== lang) {
            let _ = this;
            return loadLanguageResource(this, lang).then((messages) => {
                return setLang(_, lang);
            }).catch(function () {
                console.log(`lang:${lang} load failed.`);
            });
        }
        return Promise.resolve(lang);
    }
}

export default LanguageManager;
