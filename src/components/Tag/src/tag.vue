<script>
export default {
    name: 'NicetyTag',
    props: {
        text: String,
        closable: Boolean,
        type: String,
        hit: Boolean,
        disableTransitions: Boolean,
        color: String,
        size: String
    },
    methods: {
        handleClose (event) {
            event.stopPropagation();
            this.$emit('close', event);
        }
    },
    computed: {
        tagSize () {
            return this.size || (this.$ELEMENT || {}).size;
        }
    },
    render (h) {
        const classes = [ 'nicety-tag', this.type ? `nicety-tag--${this.type}` : '',
            this.tagSize ? `nicety-tag--${this.tagSize}` : '',
            {'is-hit': this.hit}
        ];
        const tagEl = (<span class={classes} style={{backgroundColor: this.color}}>
            { this.$slots.default }
            {
                this.closable && <i class="nicety-tag__close nicety-icon-close fa fa-close" on-click={this.handleClose}></i>
            }
        </span>);
        return this.disableTransitions ? tagEl : <transition name="nicety-zoom-in-center">{ tagEl }</transition>;
    }
};
</script>
