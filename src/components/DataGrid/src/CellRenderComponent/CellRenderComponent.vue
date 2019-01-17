<template>
    <div>
        <component v-bind:is="type" v-bind="optionsObj" v-model="value"></component>
    </div>
</template>
<script>
    import RouteLinkRender from './RouteLinkRender'
    import LabelRender from './LabelRender'
    import ActionRender from './ActionRender'
    import TextInputRender from './TextInputRender'
    import CheckboxRender from './CheckboxRender'
    import SelectInputRender from './SelectInputRender'

    export default {
        name: "CellRenderComponent",
        props: {},
        data: function () {
            return {
                data:{},
                value:'',
            }

        },
        created: function () {
            this.data=this.params.data;
            this.value= this.params.valueFormatted || this.params.value;
            //this._i18n=this._i18n;
        },
        watch: {
            "data":{
               handler: function (newValue) {
                     if ( newValue[this.params.colDef.field]===this.value) {
                         return
                     }
                     this.value=this.params.formatValue() || this.params.getValue();
                },
                deep:true
            },
            value:function (value) {
                if (value===undefined || value===null) {
                    return
                }
                let data = this.params.data;
                //let data = this.params.node.data;
                let oldValue = this.params.value;
                let newValue = value;
                if (this.params.colDef.valueParser) {
                    newValue = this.params.colDef.valueParser({
                        oldValue: oldValue, // the value before the change
                        newValue: newValue, // the value after the change
                        data: data, // the data you provided for this row
                        node: this.params.node, // the row node for this row
                        colDef: this.params.colDef, // the column def for this column
                        column: this.params.column, // the column for this column
                        api: this.params.api, // the grid API
                        columnApi: this.params.columnApi, // the grid Column API
                        context: null  // the context
                    })
                }
                this.params.setValue(newValue);//可以通过 valueSetter 处理
                    if (data[this.params.colDef.field] !== newValue) {
                        data[this.params.colDef.field] = value;
                    }
                this.$nextTick(function () {
                    this.params.refreshCell();
                });
            }

        },
        components: {
            RouteLinkRender,
            LabelRender,
            ActionRender,
            TextInputRender,
            CheckboxRender,
            SelectInputRender
        },
        computed: {
            optionsObj: function () {
                if (this.params.colDef.getProps) {
                    let option = {
                        value: this.params.value,
                        columnDef: this.params.colDef,
                        rowData: this.params.node.data
                    };
                    return this.params.colDef.getProps(option);//this.options|| this.$attrs['options']
                }
                return {};
            },
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
        }
    }
</script>
