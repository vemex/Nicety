<template>
    <div>
        <component v-bind:is="type" v-bind="optionsObj" v-model="valueObj"></component>
    </div>
</template>
<script>
    import RouteLinkRender from './RouteLinkRender'
    import LabelRender from './LabelRender'
    import ActionRender from './ActionRender'
    import TextInputRender from './TextInputRender'
    import CheckboxRender from './CheckboxRender'
    import SelectInputRender from './SelectInputRender'
    import DatePickerRender from './DatePickerRender'
    import NumberRender from './NumberRender'

    export default {
        name: "CellRenderComponent",
        props: {},
        data: function () {
            return {
                optionsObj: {},
            }

        },
        created: function () {
            this._initOptions();
        },
        components: {
            RouteLinkRender,
            LabelRender,
            ActionRender,
            TextInputRender,
            CheckboxRender,
            SelectInputRender,
            DatePickerRender,
            NumberRender
        },
        methods: {
            _initOptions() {
                if (this.params.colDef.getProps) {
                    let option = {
                        value: this.params.data[this.params.colDef.field],
                        columnDef: this.params.colDef,
                        rowData: this.params.node.data
                    };
                    this.optionsObj = this.params.colDef.getProps(option);//this.options|| this.$attrs['options']
                }
            }
        },
        computed: {
            type: {
                get: function () {
                    if (this.params.colDef.renderType) {
                        return this.params.colDef.renderType;
                    }
                    return "LabelRender";
                },
                set: function () {

                }
            },
            valueObj: {
                get: function () {
                    return this.params.formatValue() || this.params.getValue();
                },
                set: function (v) {
                    if (v === undefined || v === null) {
                        return
                    }
                    let data = this.params.data[this.params.colDef.field];
                    let newValue = v;
                    if (this.params.colDef.valueParser) {
                        newValue = this.params.colDef.valueParser({
                            oldValue: data, // the value before the change
                            newValue: v, // the value after the change
                            data: data, // the data you provided for this row
                            node: this.params.node, // the row node for this row
                            colDef: this.params.colDef, // the column def for this column
                            column: this.params.column, // the column for this column
                            api: this.params.api, // the grid API
                            columnApi: this.params.columnApi, // the grid Column API
                            context: null  // the context
                        });
                    }
                    if (data === newValue) {
                        return
                    }
                    this.params.setValue(newValue);//可以通过 valueSetter 处理
                    this._initOptions();
                }
            }
        }
    }
</script>
