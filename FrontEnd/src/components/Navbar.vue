<template>
    <div id="nav">
       <router-link to="/">
                <img src="http://pngimg.com/uploads/wallet/small/wallet_PNG77007.png" alt="Logo" width="40" height="32">
              </router-link>
        <router-link to="/">Home</router-link> 
        <router-link to="/addrecord">Add Record</router-link> 
        <router-link to="/report">Report</router-link>
        <router-link to ="/recordlist">Record List</router-link>
        <router-link to="/personalinfo">Personal Info</router-link>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    
}
</script>

<style scoped>
    #nav {
        background-image: linear-gradient(rgb(137, 203, 244), rgb(82, 166, 239));
        
        padding: 15px 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    #nav #logo-url {
        margin: auto;
        margin-left: 0;
    }

    #logo {
        width: 100px;
        height: 50px;
    }

    #nav a{
        color: #000000;
        text-decoration: none;
        margin: 12px;
        transition: .5s;
    }

    #nav a:hover {
        color: #FFF;
    }
</style>