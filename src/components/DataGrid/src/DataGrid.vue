<template>
    <div class="data-grid" :style="gridStyleObj">
        <div ref="toolPanel" class="data-grid-tool-panel"
             :style="toolPanelStyleObj" v-if="operations&&operations.length>0">
            <template v-for="item in operations">
                <button type="button" v-show="_computeOperationVisible(item.visible)"
                        class="btn btn-outline-primary btn-sm" @click="handleAction(item.type)"><i
                        :class="item.icon"></i>{{item.display}}
                </button>
            </template>
        </div>
        <ag-grid-vue style="width: 100%; height: 100%" class="ag-theme-balham" :columnDefs="columnDefObj"
                     :rowData="rowData" :gridReady="onGridReady"
                     :gridOptions="gridOptions">
        </ag-grid-vue>
        <div class="data-grid-page-panel" :style="pagePanelStyleObj" ref="pagePanel" v-if="pageable">
            <nicety-pagination @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="currentPage"
                               :page-sizes="pageSizes"
                               :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="total"></nicety-pagination>
        </div>
    </div>
</template>
<script>
    import {AgGridVue} from "ag-grid-vue";
    import CellRenderComponent from "./CellRenderComponent/CellRenderComponent";
    import NicetyPagination from "../../Pagination/src/pagination";
    import Vue from 'vue';

    let columnRenderCreator = function (router, i18n, store) {
        let _router = router;
        let _i18n = i18n;
        let _store = store;
        return function (parameter) {
            let columnDef = parameter.colDef;
            if (columnDef.renderType) {
                let props = {};
                if (columnDef.getProps) {
                    props = columnDef.getProps({value: parameter.value, columnDef, rowData: parameter.node.data});
                }
                let renderType = columnDef.renderType;

                let component = new Vue({
                    i18n: _i18n,
                    store: _store,
                    el: document.createElement('div'),
                    render: h => {
                        return h(CellRenderComponent, {
                            props: {
                                type: renderType,
                                options: props
                            }
                        })
                    },
                    router: _router,
                });
                return component.$el;
            } else {
                return parameter.value;
            }
        }
    }
    export default {
        name: "NicetyDataGrid",
        props: {
            gridOptions: [Object],
            operations: [Array],
            columnDefs: [Array],
            rowData: [Array],
            pageSizes: {
                type: Array, default: function () {
                    return [50, 100, 150, 200];
                }
            },
            pageable: false,
            pageSize: {type: Number, default: 0},
            total: {type: Number, default: 0},
            currentPage: {type: Number, default: 0},
            checkBoxSelection: {type: Boolean, default: false}

        },
        components: {
            AgGridVue,
            NicetyPagination,
            CellRenderComponent
        },
        data: function () {
            return {
                gridStyleObj: {
                    'padding-top': `auto`,
                    'padding-bottom:': `auto`,
                },
                toolPanelStyleObj: {
                    'margin-top': `auto`
                },
                pagePanelStyleObj: {
                    'margin-top': `auto`
                }
            };
        },
        methods: {
            _computeOperationVisible: function (visible) {
                if (visible !== undefined) {
                    return visible === true;
                }
                return true;
            },
            onGridReady(params) {
                // 获取gridApi
                this.gridApi = params.api;
            },
            handleAction: function (actionType) {
                let option = {
                    actionType,
                    selectRows: this.gridApi.getSelectedRows()
                };
                this.$emit("gridAction", option);
            },
            handleSizeChange: function (value) {
                this.$emit("update:pageSize", value);
            },
            handleCurrentChange(value) {
                this.$emit("update:currentPage", value);
            },
            select(filter) {
                this.gridApi.forEachNode((node, index) => {
                    if (filter(node.data) === true) {
                        node.setSelected(true);
                    }
                });
            }
        },
        mounted: function () {
            this.gridStyleObj["padding-top"] = `${this.toolPanelHeight}px`;
            this.toolPanelStyleObj["margin-top"] = `${this.toolPanelHeight * -1}px`;
            this.gridStyleObj["padding-bottom"] = `${this.pagePanelHeight}px`;
        },
        computed: {
            toolPanelHeight: function () {
                if (this.$refs.toolPanel) {
                    return this.$refs.toolPanel.getBoundingClientRect().height;
                }
                return 0;
            },
            pagePanelHeight: function () {
                if (this.$refs.pagePanel) {
                    return this.$refs.pagePanel.getBoundingClientRect().height;
                }
                return 0;
            },
            columnDefObj: function () {
                let _ = this;
                let result = this.columnDefs.map(function (item) {
                    item.cellRendererFramework = 'CellRenderComponent';
                    //item.cellRenderer=columnRenderCreator(_.$router);
                    return item;
                });

                if (this.checkBoxSelection) {
                    let checkCloumn = {
                        headerName: '',
                        field: ' no',
                        pinned: true,
                        width: 55,
                        suppressResize: true,
                        headerCheckboxSelection: this.gridOptions.rowSelection === "multiple",
                        checkboxSelection: true
                    };
                    result = [checkCloumn].concat(result);
                }

                return result;
            }
        }
    }
</script>

<style>

    .data-grid {
        height: 100%;
    }

    .data-grid > .data-grid-page-panel {
        bottom: 0px;
        height: 50px;
        padding-top: 5px;
    }

    .data-grid > .data-grid-tool-panel {
        height: 36px;
        padding-top: 5px;
        text-align: right;
        display: block;
        border: 1px solid #dee2e6;
        border-bottom: 0px;
        padding-right: 0.6rem;
    }
</style>
