<template>
  <footer class="footer">
    <div class="apps">
      Apps KED (nécessite une adresse <strong>@xebia.fr</strong> ou <strong>@publicissapient.com</strong>).
      <div class="badges">
        <a
          target="_blank"
          href="https://appdistribution.firebase.dev/i/acee8c10c8f5b635"
        >
          <img
            src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
            alt="Application iOS KED"
          />
        </a>
        <a
          target="_blank"
          href="https://play.google.com/store/apps/details?id=fr.xebia.xke"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Application Android KED"
          >
        </a>
      </div>
    </div>
    <div class="copyright">
      © {{new Date().getFullYear()}} Publicis Sapient Engineering. <a
      href="https://github.com/xebia-france/schedule-view-conf-companion/issues"
      target="_blank"
      class="issues"
    >
      Questions?</a>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style scoped lang="scss">
  .footer {
    font-size: .8em;
    color: #2B2B2B;
    text-align: center;
    margin: 30px 10px;
  }

  .badges {
    text-align: center;
    margin: 10px;

    a {
      width: fit-content;
      display: inline;
      margin: 10px;
    }

    img {
      height: 50px;
      margin-top: 10px;
    }
  }

  .copyright {
    margin-top: 30px;
  }

  .issues {
    display: inline;
    width: fit-content;
    text-decoration: underline;
  }
</style>
