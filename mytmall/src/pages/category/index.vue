<template>
  <div>
    <nav-bar>
      <i class="iconfont icon-back" @click="goback" slot="left"></i>
      <div class="navbar-center" slot="center">列表页</div>
      <i class="iconfont icon-msg" slot="right"></i>
    </nav-bar>
    <div class="content">
        <div class="sidebar tab">
            <con-tab @switchID="getCurrentId"></con-tab>
        </div>
        <div class="main">
            <cat-content :crID="crID"></cat-content>
        </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar";
import ConTab from "./tab";
import CatContent from "./content";
export default {
  name: "category",
  components: {
    NavBar,
    ConTab,
    CatContent
  },
  data(){
      return{
          crID:""
      }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getCurrentId(id) {
      this.crID = id;
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 50px;
  background: linear-gradient(#eee, #ddd);
  z-index:10001;
}
.navbar-center {
  text-align: center;
}
.sidebar {
width:30%;
  height: 100%;
}
.content{
    display:flex;
}
.content .main {
width:70%;
  height: 100%;
}
</style>