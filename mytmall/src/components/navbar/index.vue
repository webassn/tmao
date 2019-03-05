<template>
    <div class="navbar">
        <div class="navbar-left" v-if="$slots.left">
            <slot name="left">左</slot>
        </div>
        <div class="navbar-center" v-if="$slots.center">
            <slot name="center">中</slot>
        </div>
         <div class="navbar-right" v-if="$slots.right">
            <slot name="right">右</slot>
        </div>
    </div>
</template>

<script>
    export default {
        name:'NavBar'
    }
</script>

<style scoped>
.navbar-left{
     margin-left: 10px;
}
.navbar-center{
    flex:1;
    margin: 0 10px;
}
.navbar-right{
    margin-right:10px;
}
</style>