<template>
    <div>
       <my-scroll class="wrapper">
           <div class="myheader">
               <div class="photo">
                   <div class="portrait">
                       <img src="./img/tx.jpeg" alt="">
                       <div class="mytitle">
                           <em>小小阿里</em>
                           <div class="qinqing"></div>
                       </div>
                   </div>
               </div>
           </div>
       </my-scroll>
    </div>
</template>

<script>
import MyScroll from '@/components/scroll';
    export default {
       name:'personal' ,
       components:{
           MyScroll
       }
    }
</script>

<style scoped>
*{
    font-family:'微软雅黑';
}
.myheader{
    padding:30px 0;
    width:100%;
    height:180px;
    background-image: linear-gradient(to right, #FD9126, #FF5000);
}
.photo{
    width:100%; 
    padding:0px 20px;
}
.photo > .portrait > img{
    border:2px solid #fff;
    border-radius:50%;
    width:50px;
    height:100%;
    margin-right:10px;
}
.photo .portrait{
    display:flex;
}
.photo .portrait .mytitle{
    width:100%;
    font-size:19px;
    font-weight:bold;
    color:#fff;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
}
.photo .portrait .qinqing{
  width:60%;
  height:100%;
  background-image:url('./img/qinqing.png');
  background-size:100%;
  background-position:center center;
  background-repeat: no-repeat;
}
</style>