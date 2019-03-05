<template>
  <div class="content-wrapper">
    <me-scroll class="wrapper" ref="scroll" :style="{'height':maxHeight}">
      <!-- 正文内容显示 -->
      <div class="content">
          <!-- banner -->
        <div class="pic" v-if="content.banner">
          <a :href="content.banner.linkUrl" class="pic-link">
            <img :src="`https:${content.banner.picUrl}`" alt class="pic-img">
          </a>
        </div>
        <!-- 内容 -->
        <div class="section" v-for="(seitem,index) in content.data" :key="index">
            <h5 class="section-title">{{seitem.name}}</h5>
            <ul class="section-list">
            <li class="section-item" v-for="(item, i) in seitem.itemList" :key="i">
              <a href class="section-link">
                <p class="section-pic" v-if="item.picUrl">
                  <img :src="`https:${item.picUrl}`" alt class="section-img">
                </p>
                <p class="section-name">{{item.name}}</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </me-scroll>
    <div class="g-backtop-container">
      <me-backtop :visible="isBacktopVisible" @backtop="backToTop"/>
    </div>
  </div>
</template>

<script>
import MeScroll from "@/components/scroll";
import MeBacktop from "@/components/backtop";
export default {
  name: "CatContent",
  components: {
    MeScroll,
    MeBacktop
  },
  // tab页面导出的ID导父级页面 然后父页面的ID传到这个页面
  // 使用props来接收父级传过来的ID
  props: {
    crID: {
      type: String,
      default: ""
    }
  },
  data(){
      return{
          content:'',
          // 获取一个可视高度
          maxHeight:document.documentElement.clientHeight - 100 + 'px',
          isBacktopVisible: true
      };
  },
  // 通过 watch来监听 ID 并且调用 里面的 getContent 把数据传到接口中
  watch:{
      crID(id){
          this.getContent(id);
          console.log(id)
      }
  },
  methods:{
     getContent(id) {
      // this.$axios.defaults.baseURL = "http://localhost:8080";
      // ajax的数据 return出去
      // 数据出去之后 用 content 调用 接口里面的值
      return this.$axios
      //                                这里的ID就是传过来的ID
        .get(`http://www.imooc.com/api/category/content/${id}`)
        .then(res => {
          //if (res.data.code == 0) {
          console.log( res.data);
          this.content = res.data.content;
          console.log(this.content);
          //}
        })
        .catch(err => {
          console.log(err);
        });
    },
    backToTop() {
      this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0);
    }
  }
};
</script>

<style scoped>
.content-wrapper {
 overflow: hidden;
  background: #fff;
}
.pic-link {
  display: block;
}
.pic-img {
  width: 100%;
}
.section {
  padding:5px;
  margin-bottom: 12px;
  box-sizing:border-box;
}
.section:last-child {
  margin-bottom: 0;
}

.section-title {
  height: 28px;
  line-height: 28px;
  color: #080808;
  font-weight: bold;
}

.section-list {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 10px 10px 0;
}

.section-item {
  width: 33%;
}
.section-link {
  display: block;
}

.section-pic {
  position: relative;
  width: 80%;
  padding-bottom: 80%;
  margin: 0 auto;
}

.section-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.section-name {
  height: 36px;
  line-height: 36px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>