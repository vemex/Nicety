import Pagination from './src/pagination';

/* istanbul ignore next */
export default {
    install: function (Vue) {
        Vue.component(Pagination.name, Pagination);
    }
}
