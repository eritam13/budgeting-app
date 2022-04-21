
<template>
<nav>
  <RecordList title="Record List"/>
  <div id="home" class="content">

<!-- Image -->
<img src="https://torange.biz/photofxnew/172/HD/dollars-desktop-wallpaper-digital-matrix-style-background-172051.jpg" alt="The Band" class="cropped" >

  <div class="center">
    <button class="btn"><router-link to="/recordlist">Record List</router-link></button>
  </div>

<!-- End Content -->
</div>
</nav>

</template>
<style>
.cropped {
width: 3000px; 
height: 879px; 
overflow: hidden;
border: 5px solid black;
}
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
