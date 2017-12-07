<<template>
  <div class="page-footer fixed-bottom">
    <div>
      <!-- react-text: 45 -->© 2008-2017, SonarCloud.io by
      <!-- /react-text --><a href="http://www.sonarsource.com" title="SonarSource SA">SonarSource SA</a>
      <!-- react-text: 48 -->. All rights reserved.
      <!-- /react-text -->Version：{{version}}
    </div>
    <div>
      <a href="https://about.sonarcloud.io/news/">News</a>
      <!-- react-text: 51 -->-
      <!-- /react-text --><a href="https://about.sonarcloud.io/terms.pdf">Terms</a>
      <!-- react-text: 53 -->-
      <!-- /react-text --><a href="https://twitter.com/sonarqube">Twitter</a>
      <!-- react-text: 55 -->-
      <!-- /react-text --><a href="https://about.sonarcloud.io/get-started/">Get Started</a>
      <!-- react-text: 57 -->-
      <!-- /react-text --><a href="https://about.sonarcloud.io/contact/">Help</a>
      <!-- react-text: 59 -->-
      <!-- /react-text --><a href="https://about.sonarcloud.io/">About</a>
    </div>
  </div>
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
