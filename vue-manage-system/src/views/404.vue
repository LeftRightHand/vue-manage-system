<template>
    <div class="err-wrapper">
      <p>404</p>
      <span class="des">Looks like we've got some broken links.</span>
      <div class="take">
        <a href="/">Take me home.</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "404"
    }
</script>

<style scoped>
  .err-wrapper {
      text-align: center;
      width: 100%;
      height: 100%;
  }
  .err-wrapper p {

      margin-top: 100px;
      margin-bottom: 20px;
      font-size: 60px;
      font-weight: 900;
  }
  .des {
      font-size: 1.2rem;
      color: #999;
      border-left: .25rem solid #dfe2e5;
      margin-left: 0;
      padding-left: 1rem;
  }
  .take {
      margin: 20px;
  }
  .take a {
      color: #3eaf7c;
  }
</style>
