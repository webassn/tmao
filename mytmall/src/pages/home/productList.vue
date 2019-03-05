<template>
  <div class="cp">
    <h3>热卖推荐</h3>
    <ul class="pro-list">
      <!-- 调用 findProduct 事件 -->
      <li class="pro-con" v-for="(item,key) in productList" :key="key" @click="findProduct(key)">
        <router-link
          :to="{name:'product',params:{id:item.baseinfo.itemId,imgurl:item.baseinfo.picUrl}}"
        >
          <p class="con-img">
            <img v-lazy="`https:${item.baseinfo.picUrl}`" alt>
          </p>
          <div class="con-particulars">
            <span>{{item.name.shortName}}</span>
            <del>¥{{item.price.origPrice}}</del>
            <div class="xianjia">
              <h4>¥{{item.price.actPrice}}</h4>
              <span class="yishou">已售{{item.remind.soldCount}}件</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// 导入 axios
import axios from "axios";
export default {
  name: "productList",
  data() {
    return {
      productList: [],
      page: 1,
      totalPage: 1
    };
  },
  created() {
    this.getProductList();
  },

  methods: {
    update() {
      return this.getProductList();
    },
    getProductList() {
      // this.$axios.defaults.baseURL = "http://localhost:8080";
      return (
      //   this.$axios
      //     //   这里的api 等于 config里面的 index.js中的 api 下的 target的链接
      //     .get("/api/json/tg/ajaxGetItemsV2.json", {
      //       params: {
      //         page: this.page,
      //         psize: 20,
      //         type: 0,
      //         frontCatId: ""
      //       }
      //     })
         this.$jsonp('https://ju.taobao.com/json/tg/ajaxGetItemsV2.json',{
              page: this.page,
              psize: 20,
              type: 0,
              frontCatId: ""
         })
          // 这里是 axios的 格式 正确的
          .then(res => {
            // console.log(res.data);
            if (res.code == "200") {
              this.page++;
              this.totalPage = res.totalPage;
              this.productList = this.productList.concat(res.itemList);
              // 将数据保存在vuex中 这里的 dispatch 是对 Actions 的操作
              // 参考 https://www.jianshu.com/p/a804606ad8e9
              this.$store.dispatch("addGoods", this.productList);
              // 定义 OBJ 父传子 给 Home 文件
              let obj = {
                productList: this.productList,
                page: this.page,
                totalPage: this.totalPage
              };
              // $emit定义的 loaded 带这 obj 数据 给home
              this.$emit("loaded", obj);
            }
          })
          // 这里是 axios的 格式 错误的返回信息
          .catch(err => {
            console.log(err);
          })
      );
    },
    findProduct(id) {
      // 将一个商品存到vueX中
      this.$store.dispatch("productInfo", this.goodList[id]);
    }
  },
  // 计算属性 这个属性会一直监听的数据 一直运行 把数据 return 出去 在上面调用
  computed: {
    goodList() {
      return this.$store.state.goodsList;
    }
  }
};
</script>

<style scoped>
.cp > h3 {
  padding: 10px 0;
  text-align: center;
}
.pro-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.pro-list .pro-con {
  margin-top: 5px;
  width: 48%;
  height: 100%;
  background: #fff;
}
.pro-list .pro-con .con-img {
  width: 100%;
  height: 100%;
}
.pro-list .pro-con .con-img img {
  width: 100%;
}
.pro-con .con-particulars {
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  font-size: 14px;
}
.pro-con .con-particulars span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.pro-con .con-particulars del {
  font-size: 13px;
  color: #ccc;
  padding: 5px 0;
}
.pro-con .con-particulars h4 {
  color: #f00;
}
.pro-con .con-particulars .xianjia {
  display: flex;
  justify-content: space-between;
}
.pro-con .con-particulars .xianjia span {
  font-size: 12px;
  color: #ccc;
}
</style>