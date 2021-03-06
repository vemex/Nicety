<template>
    <table @click="handleMonthTableClick" class="nicety-month-table">
        <tbody>
        <tr>
            <td :class="getCellStyle(0)">
                <a class="cell">{{ t('nicety.datepicker.months.jan') }}</a>
            </td>
            <td :class="getCellStyle(1)">
                <a class="cell">{{ t('nicety.datepicker.months.feb') }}</a>
            </td>
            <td :class="getCellStyle(2)">
                <a class="cell">{{ t('nicety.datepicker.months.mar') }}</a>
            </td>
            <td :class="getCellStyle(3)">
                <a class="cell">{{ t('nicety.datepicker.months.apr') }}</a>
            </td>
        </tr>
        <tr>
            <td :class="getCellStyle(4)">
                <a class="cell">{{ t('nicety.datepicker.months.may') }}</a>
            </td>
            <td :class="getCellStyle(5)">
                <a class="cell">{{ t('nicety.datepicker.months.jun') }}</a>
            </td>
            <td :class="getCellStyle(6)">
                <a class="cell">{{ t('nicety.datepicker.months.jul') }}</a>
            </td>
            <td :class="getCellStyle(7)">
                <a class="cell">{{ t('nicety.datepicker.months.aug') }}</a>
            </td>
        </tr>
        <tr>
            <td :class="getCellStyle(8)">
                <a class="cell">{{ t('nicety.datepicker.months.sep') }}</a>
            </td>
            <td :class="getCellStyle(9)">
                <a class="cell">{{ t('nicety.datepicker.months.oct') }}</a>
            </td>
            <td :class="getCellStyle(10)">
                <a class="cell">{{ t('nicety.datepicker.months.nov') }}</a>
            </td>
            <td :class="getCellStyle(11)">
                <a class="cell">{{ t('nicety.datepicker.months.dec') }}</a>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script type="text/babel">
    import Locale from '../../../../locale';
    import { isDate, range, getDayCountOfMonth, nextDate } from '../util';
    import { hasClass } from '../../../../utils/dom';
    import { arrayFindIndex, coerceTruthyValueToArray } from '../../../../utils/util';

    const datesInMonth = (year, month) => {
        const numOfDays = getDayCountOfMonth(year, month);
        const firstDay = new Date(year, month, 1);
        return range(numOfDays).map(n => nextDate(firstDay, n));
    };

    export default {
        name:'nicety-month-table',
        props: {
            disabledDate: {},
            value: {},
            defaultValue: {
                validator(val) {
                    // null or valid Date Object
                    return val === null || (val instanceof Date && isDate(val));
                }
            },
            date: {}
        },
        mixins: [{
            methods: {
                t:Locale.t
            }
        }],
        methods: {
            getCellStyle(month) {
                const style = {};
                const year = this.date.getFullYear();
                const today = new Date();

                style.disabled = typeof this.disabledDate === 'function'
                    ? datesInMonth(year, month).every(this.disabledDate)
                    : false;
                style.current = arrayFindIndex(coerceTruthyValueToArray(this.value), date => date.getFullYear() === year && date.getMonth() === month) >= 0;
                style.today = today.getFullYear() === year && today.getMonth() === month;
                style.default = this.defaultValue &&
                    this.defaultValue.getFullYear() === year &&
                    this.defaultValue.getMonth() === month;

                return style;
            },

            handleMonthTableClick(event) {
                const target = event.target;
                if (target.tagName !== 'A') return;
                if (hasClass(target.parentNode, 'disabled')) return;
                const column = target.parentNode.cellIndex;
                const row = target.parentNode.parentNode.rowIndex;
                const month = row * 4 + column;

                this.$emit('pick', month);
            }
        }
    };
</script>
