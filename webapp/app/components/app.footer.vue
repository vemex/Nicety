<<template>
  <footer>
    <div>
      <!-- react-text: 45 -->© 2008-2017, Nicety.io by WANGWEIWEI
      <!-- react-text: 48 -->. All rights reserved.
      <!-- /react-text -->Version：{{version}}
    </div>
  </footer>
</template>

<script>
  import {
    VERSION
  } from '../app.constants.js'
  export default {
    components: {
      //   MainLayout
    },
    data: function() {
      return {
        version: `${VERSION}`
      };
    }
  }
</script>
