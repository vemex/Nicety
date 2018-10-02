<template>
    <div :class="['nicety tabs']">
        <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <slot></slot>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
            <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {

        }
    }
</script>