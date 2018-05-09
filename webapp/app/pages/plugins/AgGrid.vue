<template>
    <div>
        <div class="mb-2">
            <div class="h2">网站订单分析</div>
            <div class="text-black-50 font-italic">ID: tb_353c383a70e946e7bd7c1386fb4f94e8</div>
        </div>


        <div class="flat-tab">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">数据预览</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">数据设计</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">筛选条件</a>
                </li>

            </ul >
            <div class="flat-tab-bar">
                <button type="button" class="btn btn-link"><i class="ti-settings"></i>设置</button>
            </div>

            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                    <ag-grid-vue style="width: 100%; height: 500px;" class="ag-theme-balham"
                                 :gridOptions="gridOptions">
                    </ag-grid-vue>
                </div>
                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">ddddddddddddddddddd</div>
                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">ddddddddddddddddddddddd</div>
            </div>
        </div>



    </div>

</template>

<script>
    import Vue from "vue";
    import {AgGridVue} from "ag-grid-vue";

    export default {
        data() {
            return {
                text: null
            }
        },
        computed: {
            gridOptions: function () {
                let gridOptions = {
                    enableColResize: true,
                    enableSorting: true,
                    animateRows: true,
                    pagination: true,
                    paginationPageSize: 5000,

                    suppressPaginationPanel: true,
                    onPaginationChanged: function () {
                        
                    }
                };
                gridOptions.rowData = this.rowData;
                gridOptions.columnDefs = this.columnDefs;
                return gridOptions
            }
        },
        components: {
            'ag-grid-vue': AgGridVue
        },
        created() {
            // data created here so outside of vue (ie no reactive, not observed)
            // also frozen (prob unnecessarily)
            this.rowData = [];
            for (let i = 0; i < 5000; i++) {
                this.rowData.push(Object.freeze({
                    recordNumber: i,
                    value1: Math.floor(Math.random() * 10000),
                    value2: Math.floor(Math.random() * 10000),
                    value3: Math.floor(Math.random() * 10000),
                    value4: Math.floor(Math.random() * 10000),
                    value5: Math.floor(Math.random() * 10000),
                    value6: Math.floor(Math.random() * 10000),
                    value7: Math.floor(Math.random() * 10000)
                }));
            }
            this.rowData = Object.freeze(this.rowData);

            this.columnDefs = Object.freeze([
                {
                    headerName: 'Record', field: 'recordNumber',
                },
                {
                    headerName: 'Value 1', field: 'value1',
                    cellRenderer: function (params) {
                        if (Number.parseInt(params.value) < 1000) {
                            $(params.eGridCell).addClass('bg-danger').addClass('text-white');
                        }
                        if (Number.parseInt(params.value) < 2000) {
                            $(params.eGridCell).addClass('bg-warning').addClass('text-white');
                        }
                        return '<b>' + params.value + '</b>';
                    }
                },
                {headerName: 'Value 2', field: 'value2'},
                {headerName: 'Value 3', field: 'value3'},
                {headerName: 'Value 4', field: 'value4'},
                {headerName: 'Value 5', field: 'value4'},
                {headerName: 'Value 6', field: 'value4'},
                {headerName: 'Value 7', field: 'value4'}
            ])
        }
    }
</script>

<style>
</style>
