<template>
    <div class="card" style="width: 800px;">
        <div class="card-body">


            <h4>Large Data Set Component (50,000 rows)</h4>
            <ag-grid-vue style="width: 100%; height: 350px;" class="ag-nicety"
                         :gridOptions="gridOptions">
            </ag-grid-vue>
            <div id="page_controller">
                <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">&lt;&lt;</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">&gt;&gt;</a></li>
                    </ul>
                </nav>
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
                    headerHeight: 35,
                    enableColResize: true,
                    enableSorting: true,
                    animateRows: true,
                    pagination: true,
                    paginationPageSize: 50,

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
            for (let i = 0; i < 500; i++) {
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
