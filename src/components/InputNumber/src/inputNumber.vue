<template>
    <div
            @dragstart.prevent
            :class="[
      'nicety-input-number',
      inputNumberSize ? 'nicety-input-number--' + inputNumberSize : '',
      { 'is-disabled': inputNumberDisabled },
      { 'is-without-controls': !controls },
      { 'is-controls-right': controlsAtRight }
    ]">
    <span
            class="nicety-input-number__decrease"
            role="button"
            v-if="controls"
            v-repeat-click="decrease"
            :class="{'is-disabled': minDisabled}"
            @keydown.enter="decrease">
      <i :class="`nicety-icon-${controlsAtRight ? 'arrow-down' : 'minus'}`"></i>
    </span>
        <span
                class="nicety-input-number__increase"
                role="button"
                v-if="controls"
                v-repeat-click="increase"
                :class="{'is-disabled': maxDisabled}"
                @keydown.enter="increase">
      <i :class="`nicety-icon-${controlsAtRight ? 'arrow-up' : 'plus'}`"></i>
    </span>
        <text-input
                ref="input"
                :value="displayValue"
                :placeholder="placeholder"
                :disabled="inputNumberDisabled"

                :max="max"
                :min="min"
                :name="name"
                :label="label"
                @keydown.up.native.prevent="increase"
                @keydown.down.native.prevent="decrease"
                @blur="handleBlur"
                @focus="handleFocus"
                @input.native="handleInput"
                @change="handleInputChange">
        </text-input>
    </div>
</template>
<script>
    import Focus from '../../../mixins/focus';
    import RepeatClick from '../../../directives/repeat-click';

    export default {
        name: 'NicetyInputNumber',
        mixins: [Focus('input')],
        inject: {
            nicetyForm: {
                default: ''
            },
            nicetyFiled: {
                default: ''
            }
        },
        directives: {
            repeatClick: RepeatClick
        },
        props: {
            step: {
                type: Number,
                default: 1
            },
            max: {
                type: Number,
                default: Infinity
            },
            min: {
                type: Number,
                default: -Infinity
            },
            value: {},
            disabled: Boolean,
            size: String,
            controls: {
                type: Boolean,
                default: true
            },
            controlsPosition: {
                type: String,
                default: 'right'
            },
            name: String,
            label: String,
            placeholder: String,
            precision: {
                type: Number,
                validator(val) {
                    return val >= 0 && val === parseInt(val, 10);
                }
            }
        },
        data() {
            return {
                currentValue: 0,
                userInput: null
            };
        },
        watch: {
            value: {
                immediate: true,
                handler(value) {
                    let newVal = value === undefined ? value : Number(value);
                    if (newVal !== undefined) {
                        if (isNaN(newVal)) {
                            return;
                        }
                        if (this.precision !== undefined) {
                            newVal = this.toPrecision(newVal, this.precision);
                        }
                    }
                    if (newVal >= this.max) newVal = this.max;
                    if (newVal <= this.min) newVal = this.min;
                    this.currentValue = newVal;
                    this.userInput = null;
                    this.$emit('input', newVal);
                }
            }
        },
        computed: {
            minDisabled() {
                return this._decrease(this.value, this.step) < this.min;
            },
            maxDisabled() {
                return this._increase(this.value, this.step) > this.max;
            },
            numPrecision() {
                const {value, step, getPrecision, precision} = this;
                const stepPrecision = getPrecision(step);
                if (precision !== undefined) {
                    if (stepPrecision > precision) {
                        console.warn('[Element Warn][InputNumber]precision should not be less than the decimal places of step');
                    }
                    return precision;
                } else {
                    return Math.max(getPrecision(value), stepPrecision);
                }
            },
            controlsAtRight() {
                return this.controls && this.controlsPosition === 'right';
            },
            _elFormItemSize() {
                return (this.nicetyFiled || {}).elFormItemSize;
            },
            inputNumberSize() {
                return this.size || this.nicetyFiled || (this.$ELEMENT || {}).size;
            },
            inputNumberDisabled() {
                return this.disabled || (this.elForm || {}).disabled;
            },
            displayValue() {
                if (this.userInput !== null) {
                    return this.userInput;
                }
                const currentValue = this.currentValue;
                if (typeof currentValue === 'number' && this.precision !== undefined) {
                    return currentValue.toFixed(this.precision);
                } else {
                    return currentValue;
                }
            }
        },
        methods: {
            toPrecision(num, precision) {
                if (precision === undefined) precision = this.numPrecision;
                return parseFloat(parseFloat(Number(num).toFixed(precision)));
            },
            getPrecision(value) {
                if (value === undefined) return 0;
                const valueString = value.toString();
                const dotPosition = valueString.indexOf('.');
                let precision = 0;
                if (dotPosition !== -1) {
                    precision = valueString.length - dotPosition - 1;
                }
                return precision;
            },
            _increase(val, step) {
                if (typeof val !== 'number' && val !== undefined) return this.currentValue;

                const precisionFactor = Math.pow(10, this.numPrecision);
                // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
                return this.toPrecision((precisionFactor * val + precisionFactor * step) / precisionFactor);
            },
            _decrease(val, step) {
                if (typeof val !== 'number' && val !== undefined) return this.currentValue;

                const precisionFactor = Math.pow(10, this.numPrecision);

                return this.toPrecision((precisionFactor * val - precisionFactor * step) / precisionFactor);
            },
            increase() {
                if (this.inputNumberDisabled || this.maxDisabled) return;
                const value = this.value || 0;
                const newVal = this._increase(value, this.step);
                this.setCurrentValue(newVal);
            },
            decrease() {
                if (this.inputNumberDisabled || this.minDisabled) return;
                const value = this.value || 0;
                const newVal = this._decrease(value, this.step);
                this.setCurrentValue(newVal);
            },
            handleBlur(event) {
                this.$emit('blur', event);
            },
            handleFocus(event) {
                if (this.currentValue===0){
                    this.$refs.input.select();
                }
                this.$emit('focus', event);
            },
            setCurrentValue(newVal) {
                const oldVal = this.currentValue;
                if (typeof newVal === 'number' && this.precision !== undefined) {
                    newVal = this.toPrecision(newVal, this.precision);
                }
                if (newVal >= this.max) newVal = this.max;
                if (newVal <= this.min) newVal = this.min;
                if (oldVal === newVal) return;
                this.userInput = null;
                this.$emit('input', newVal);
                this.$emit('change', newVal, oldVal);
                this.currentValue = newVal;
            },
            handleInput(event) {
                var r = /^-?(0|(\d*))(\.?)(\d*)$/.test(event.target.value);
                if (r) {
                    this.userInput = event.target.value;
                }
            },
            handleInputChange(value) {
                const newVal = value === '' ? undefined : Number(value);
                if (!isNaN(newVal) || value === '') {
                    this.setCurrentValue(newVal);
                }
                this.userInput = null;
            },
            select() {
                this.$refs.input.select();
            }
        },
        mounted() {
            let innerInput = this.$refs.input.$refs.input;
            innerInput.setAttribute('role', 'spinbutton');
            innerInput.setAttribute('aria-valuemax', this.max);
            innerInput.setAttribute('aria-valuemin', this.min);
            innerInput.setAttribute('aria-valuenow', this.currentValue);
            innerInput.setAttribute('aria-disabled', this.inputNumberDisabled);
        },
        updated() {
            if (!this.$refs || !this.$refs.input) return;
            const innerInput = this.$refs.input.$refs.input;
            innerInput.setAttribute('aria-valuenow', this.currentValue);
        }
    };
</script>
