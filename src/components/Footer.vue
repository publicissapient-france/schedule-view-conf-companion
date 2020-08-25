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
      © {{new Date().getFullYear()}} Publicis Sapient Engineering. All right reserved. Questions?
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
    margin: 30px 0;
  }

  .badges {
    display: flex;
    justify-content: center;

    a {
      width: fit-content;
      margin: 10px;
    }

    img {
      height: 50px;
    }
  }

  .copyright {
    margin-top: 30px;
  }
</style>
