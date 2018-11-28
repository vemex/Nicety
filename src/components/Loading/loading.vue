<template>
    <transition name="nicety-loading-fade" @after-leave="handleAfterLeave">
        <div
                v-show="visible"
                class="nicety-loading-mask"
                :style="{ backgroundColor: background || '' }"
                :class="[customClass, { 'is-fullscreen': fullscreen }]">
            <div class="nicety-loading-content">
               <span class="nicety-loading-spinner">
                   <div class="sk-rotating-plane" v-if="isRotatingPlane"></div>
                   <div class="sk-double-bounce" v-if="isDoubleBounce">
                       <div class="sk-child sk-double-bounce1"></div>
                       <div class="sk-child sk-double-bounce2"></div>
                   </div>
                   <div class="sk-wave" v-if="isWave">
                       <div class="sk-rect sk-rect1"></div>
                       <div class="sk-rect sk-rect2"></div>
                       <div class="sk-rect sk-rect3"></div>
                       <div class="sk-rect sk-rect4"></div>
                       <div class="sk-rect sk-rect5"></div>
                   </div>
                   <div class="sk-wandering-cubes" v-if="isWanderingCubes">
                       <div class="sk-cube sk-cube1"></div>
                       <div class="sk-cube sk-cube2"></div>
                   </div>
                   <div class="sk-spinner sk-spinner-pulse" v-if="isPulse">
                   </div>
                   <div class="sk-chasing-dots" v-if="isChasingDots">
                       <div class="sk-child sk-dot1"></div>
                       <div class="sk-child sk-dot2"></div>
                   </div>
                   <div class="sk-three-bounce" v-if="isThreeBounce">
                       <div class="sk-child sk-bounce1"></div>
                       <div class="sk-child sk-bounce2"></div>
                       <div class="sk-child sk-bounce3"></div>
                   </div>
                   <div class="sk-circle" v-if="isCircle">
                       <div class="sk-circle1 sk-child"></div>
                       <div class="sk-circle2 sk-child"></div>
                       <div class="sk-circle3 sk-child"></div>
                       <div class="sk-circle4 sk-child"></div>
                       <div class="sk-circle5 sk-child"></div>
                       <div class="sk-circle6 sk-child"></div>
                       <div class="sk-circle7 sk-child"></div>
                       <div class="sk-circle8 sk-child"></div>
                       <div class="sk-circle9 sk-child"></div>
                       <div class="sk-circle10 sk-child"></div>
                       <div class="sk-circle11 sk-child"></div>
                       <div class="sk-circle12 sk-child"></div>
                   </div>
                   <div class="sk-cube-grid" v-if="isCubeGrid">
                       <div class="sk-cube sk-cube1"></div>
                       <div class="sk-cube sk-cube2"></div>
                       <div class="sk-cube sk-cube3"></div>
                       <div class="sk-cube sk-cube4"></div>
                       <div class="sk-cube sk-cube5"></div>
                       <div class="sk-cube sk-cube6"></div>
                       <div class="sk-cube sk-cube7"></div>
                       <div class="sk-cube sk-cube8"></div>
                       <div class="sk-cube sk-cube9"></div>
                   </div>
                   <div class="sk-fading-circle" v-if="isFadingCircle">
                       <div class="sk-circle1 sk-circle"></div>
                       <div class="sk-circle2 sk-circle"></div>
                       <div class="sk-circle3 sk-circle"></div>
                       <div class="sk-circle4 sk-circle"></div>
                       <div class="sk-circle5 sk-circle"></div>
                       <div class="sk-circle6 sk-circle"></div>
                       <div class="sk-circle7 sk-circle"></div>
                       <div class="sk-circle8 sk-circle"></div>
                       <div class="sk-circle9 sk-circle"></div>
                       <div class="sk-circle10 sk-circle"></div>
                       <div class="sk-circle11 sk-circle"></div>
                       <div class="sk-circle12 sk-circle"></div>
                   </div>
                   <div class="sk-folding-cube" v-if="isFoldingCube">
                       <div class="sk-cube1 sk-cube"></div>
                       <div class="sk-cube2 sk-cube"></div>
                       <div class="sk-cube4 sk-cube"></div>
                       <div class="sk-cube3 sk-cube"></div>
                   </div>
               </span>

                <p v-if="text" class="nicety-loading-text">{{ text }}</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data () {
        return {
            text: null,
            spinner: null,
            background: null,
            fullscreen: true,
            visible: false,
            customClass: ''
        };
    },
    computed: {
        isRotatingPlane: function () {
            return this.spinner === 'rotating-plane';
        },
        isDoubleBounce: function () {
            return this.spinner === 'double-bounce';
        },
        isWave: function () {
            return this.spinner === 'wave' || this.spinner === '' || this.spinner === null ;
        },
        isWanderingCubes: function () {
            return this.spinner === 'wandering-cubes';
        },
        isPulse: function () {
            return this.spinner === 'pulse';
        },
        isChasingDots: function () {
            return this.spinner === 'chasing-dots';
        },
        isCircle: function () {
            return this.spinner === 'circle';
        },
        isThreeBounce: function () {
            return this.spinner === 'three-bounce';
        },
        isCubeGrid: function () {
            return this.spinner === 'cube-grid';
        },
        isFadingCircle: function () {
            return this.spinner === 'fading-circle';
        },
        isFoldingCube: function () {
            return this.spinner === 'folding-cube';
        }
    },
    methods: {
        handleAfterLeave () {
            this.$emit('after-leave');
        },
        setText (text) {
            this.text = text;
        }
    }
};
</script>
