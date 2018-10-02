const state = {
    version: "",// 版本信息
    copyrightTimeRange: "2018-208",//版权时间区间
    copyright: "wang weiwei ",//版权说明
    siteName: "Nicety",//网站名称
    defaultLang: "zh-ccn"//默认语言
};

const getters = {
    version: state => state.version,// 版本信息
    copyrightTimeRange: state => state.copyrightTimeRange,// 版本信息
    copyright: state => state.copyright,// 版本信息
    siteName: state => state.siteName,// 版本信息
    defaultLang: state => state.defaultLang,// 版本信息
};

const mutations = {
    setVersion(state, version) {
        state.version = version;
    },
    setCopyrightTimeRange(state, copyrightTimeRange) {
        state.copyrightTimeRange = copyrightTimeRange;
    },
    setCopyright(state, copyright) {
        state.copyright = copyright;
    },
    setSiteNamen(state, siteName) {
        state.siteName = siteName;
    },
    setLang(state, lang) {
        state.defaultLang = lang;
    },
};
export default {
    namespaced: true,
    state,
    getters,
    mutations
}