<template>
  <div>
      <nav-bar>
        <i class="iconfont icon-back" @click="goback" slot="left"></i>
        <div slot="center" class="navbar-center">商品详情</div>
        <i class="iconfont icon-msg" slot="right"></i>
      </nav-bar>
      <div class="product-con">
          <!-- <img :src="this.$route.params.imgurl" alt=""> -->
          <img :src="`https:${this.product.baseinfo.picUrl}`" alt="">
          <div class="detail_decoration">
              <div class="price">
                  <div class="prc">¥<em>8000</em>.00</div>
                  <div class="msg">
                      <del>¥<em>10999</em>.00</del>
                      <p>京东秒杀</p>
                  </div>
              </div>
              <div class="price-time"></div>
          </div>
          <div class="part">
              <div class="title">{{ this.product.name.shortName }} - {{this.product.name.longName}}</div>
              <div class="desc">{{ this.product.merit.desc }}</div>
          </div>
      </div>
      <div class="buy">
          <div class="addCart" @click="addToCart">加入购物车</div>
          <div class="buyshop" @click="addToCart">立即购买</div>
      </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar";
export default {
  mame: "product",
  data(){
      return{
         buyNum: 1
      }
  },
  components: {
    NavBar
  },
  methods:{
      goback(){
          this.$router.go(-1);
      },
      addToCart() {
      //  添加  商品信息到购物车  ,在本地存储中将你添加的商品存储
      let productInfo = {
        id: this.$route.params.id,
        img: this.product.baseinfo.picUrl,
        title: this.product.name.shortName,
        type: this.$route.params.id, //类型：如果是同一个商品增加数量,不是同一个商品添加到购物车
        quantity: this.buyNum, // 商品数量
        price: this.product.price.actPrice,
        inventory: this.product.baseinfo.stock, // stock 库存
        // 这个传过去用过 每个商品的 单选按钮
        isCheck:false
      };
      this.$store.dispatch("addToCart", productInfo);
      console.log("添加到购物车成功!");
    }
  },
  computed: {
    // 获得 vueX 中 一个商品的详细信息
    product() {
      return this.$store.state.productInfo;
    }
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: linear-gradient(#eee, #ddd);
}
.navbar-center{
    text-align: center !important;
}
.product-con{
    width:100%;
    height:100%;
}
.product-con img{
    width:100%;
}
.product-con .detail_decoration{
    display:flex;
    justify-content:space-between;
    background: linear-gradient(90deg,#ff7f4e,#ff3131);
    height:50px;
}
.product-con .detail_decoration .price{
    height:50px;
    display: flex;
    padding: 0 10px;
    color:#fff;
    align-items: center;
}
.product-con .detail_decoration .price em{
    font-size: 25px;
}
.product-con .detail_decoration .price .msg{
    display:flex;
    flex-direction: column;
    font-size: 12px;
    margin-left: 5px;
}
.product-con .detail_decoration .price .msg em{
    font-size: 12px;
}
.product-con .detail_decoration .price-time{
    width:116px;
    background:#f7f7f7;
}
.buy{
    z-index:1002;
    bottom:51px;
    position:absolute;
    width:100%;
    height:35px;
    background:#ccc;
    display: flex;
    justify-content:space-between;
    color:#fff;
    text-align: center;
    font-weight:bold;
}
.buy .addCart{
    width:50%;
    background:rgb(253, 142, 15);
    line-height: 35px;
}
.buy .buyshop{
     width:50%;
    background:rgb(235, 70, 5);
    line-height: 35px;
}
.part{
  padding: 5px;
  box-sizing: border-box;
  line-height: 20px;
  font-size:14px;
  height:30px;
  color:#f60;
}
.part .title{
  text-decoration:underline;
}
.part .desc{
  font-size:12px;
  color:#aaa;
  text-decoration:underline;
}
</style>