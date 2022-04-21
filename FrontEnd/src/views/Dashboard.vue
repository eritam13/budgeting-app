
<template>
<nav>
  <RecordList title="Record List"/>
  <div id="home" class="content">

<!-- Image -->
<img src="https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-investment-financial-management-financial-background-image_194572.jpg" alt="The Band" style="width:100%">

  <div class="center">
    <button class="btn "><router-link to="/recordlist">Record List</router-link></button>
  </div>

<!-- End Content -->
</div>
</nav>

</template>
<style>
.btn {
  border: 2px solid black;
  background-color: rgb(169, 209, 247);
 
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
   border-color: #000102;
  color: rgb(1, 4, 7)
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>

<script setup lang="ts">

</script>
