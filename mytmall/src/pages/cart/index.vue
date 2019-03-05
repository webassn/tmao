<template>
  <div>
    <nav-bar>
      <i class="iconfont icon-back" @click="goback" slot="left"></i>
      <div slot="center" class="navbar-center">购物车</div>
      <i class="iconfont icon-msg" slot="right"></i>
    </nav-bar>
    <!-- 购物车为空 -->
    <div class="carerror" :class="isshow?'isshow':''">
      <img src="@/assets/icon/pay_pop_img_loading_fail.png" alt>
      <div class="gotoHome" @click="gotoHome">再去逛逛</div>
    </div>
    <!-- 购物车有数据 -->
    <div class="carlist" :class="isshow?'':'isshow'">
      <div class="carlist-top">
        <!-- 头部全选 -->
        <span class="check-icon" @click="QchooseAll()">
          <img :src="chooseAll?checkIcon:checkNotIcon" alt>
        </span>
        <i class="tmall"></i>
        <span>云店铺</span>
        <a class="gl" onclick="javascript:void">管理</a>
      </div>
      <div class="carlist-bot" v-for="(item,index) in cartLists" :key="index">
        <span class="check-icon" @click="chooseOne(index)">
          <img :src="item.isCheck?checkIcon:checkNotIcon" alt>
        </span>
        <div class="commodity">
          <img :src="`https:${item.img}`" alt>
          <div class="commoditydetails">
            <div class="commoditydetailstitle">
              <div class="title"><span class="titleName">{{item.title}}}</span><span class="title-qx" @click="itemdel(item)">×</span></div>
              
              <div class="price">
                <span>
                  ¥
                  <em>{{item.price}}</em>
                </span>
                <div class="quantity">
                  <a onclick="javascript:void(0)" @click="reduceNum(item)">-</a>
                  <span class="num">{{ item.quantity }}</span>
                  <a onclick="javascript:void(0)" @click="addNum(item)">+</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="c-footer">
          <div class="c-f-left">
            <div class="qx">
              <span class="check-icon" @click="QchooseAll()">
                <img :src="chooseAll?checkIcon:checkNotIcon" alt>
              </span>
              <h3>全选</h3>
            </div>
            <p>
              合计:
              <span>￥</span>
              <strong>{{totalPrice.toFixed(2)}}</strong>
            </p>
          </div>
          <div class="c-f-right" @click="sumbitBtn">结算 ({{totalQuantity}})</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import NavBar from "@/components/navbar";
export default {
  name: "cart",
  data() {
    return {
      isshow: false,
      //这是总价格
      totalPrice: 0,
      // 这是结算数量
      totalQuantity: 0,
      checkNotIcon: require("@/assets/icon/order_not_checked.png"),
      checkIcon: require("@/assets/icon/order_checked.png"),
      chooseAll: false,
      // 创建一个空的数组变量 用于存储 car 里面的 added里面的数据
      cartLists: []
    };
  },
  components: {
    NavBar
  },
  // Dom创建之后加载
  created() {
    // 获得本地数据
    // 获得 cat 下面的 added 里面的数据
    // 调用下面的这个事件
    this.carts();
  },
  // 计算属性
  computed: {
    //  组成一个新数据 添加的时候
    quantityArray() {
      if(this.cartLists){
        let added = this.cartLists;
        let array = [];
        for (let item of added) {
          array.push(item.quantity);
        }
        // console.log(array)
        return array;
      }
    }
  },
  methods: {
    sumbitBtn() {
      if (this.totalQuantity) {
        MessageBox.alert("恭喜你结算成功,请等待收货！");
        this.$store.state.cart.added = [];
        storage.setItem("cart", []);
      }
    },
    goback() {
      this.$router.go(-1);
    },
    gotoHome() {
      this.$router.replace("/home");
    },
    carts() {
      this.cartLists = this.$store.state.cart.added;
      if (this.cartLists.length==0) {
        this.isshow = false;
        
      }else{
        this.isshow = true;
      }
    },
    chooseOne(id) {
      console.log(id);
      this.cartLists[id].isCheck = !this.cartLists[id].isCheck;
      this.sumlenth();
      // this.getAllCart();
      let item = this.cartLists[id]
      if(this.cartLists[id].isCheck == true){
        this.totalQuantity += item.quantity;
          // 累加的总价钱
        this.totalPrice += item.price * item.quantity;
      }else{
        this.totalQuantity -= item.quantity;
          // 累加的总价钱
        this.totalPrice -= item.price * item.quantity;
      }
    },
    getAllCart() {
      for (let item of this.cartLists) {
        if(item.isCheck){
          // 累加的总数量
          this.totalQuantity += item.quantity;
          // 累加的总价钱
          this.totalPrice += item.price * item.quantity;
        }
      }
    },
    reduceNum(item) {
      let { id, type, quantity } = item;
      quantity--;
      if (quantity <= 1) {
        quantity = 1;
      }
      let newProduct = {
        id: id,
        type: type,
        quantity: quantity
      };
      // 这里的updateThisCart 是执行 car里面的数据更新 函数
      this.$store.dispatch("updateThisCart", newProduct);
    },
    addNum(item) {
      let { id, type, quantity } = item;
      quantity++;
      if (quantity <= 1) {
        quantity = 1;
      }
      let newProduct = {
        id: id,
        type: type,
        quantity: quantity
      };
      // 这里的updateThisCart 是执行 car里面的数据更新 函数
      this.$store.dispatch("updateThisCart", newProduct);
    },
    // 判断全选
    sumlenth() {
      let num = 0;
      let len = this.cartLists.length;
      for (let item of this.cartLists) {
        if (item.isCheck) {
          num++;
        }
      }
      if (num == len) {
        this.chooseAll = true;
      } else {
        this.chooseAll = false;
      }
    },
    // 直接调用事件  如果使用监听会导致 非全选的时候不想删除选中的商品也会删除选中
    QchooseAll() {
      console.log(this.chooseAll)
      this.chooseAll = !this.chooseAll
      if (this.chooseAll) {
        for (let item of this.cartLists) {
          item.isCheck = true;
        }
        this.totalQuantity = 0;
        this.totalPrice = 0;
        this.getAllCart();
      } else {
        for (let item of this.cartLists) {
          item.isCheck = false;
        }
        this.totalQuantity = 0;
        this.totalPrice = 0;
      }
    },
    // 删除单个商品
    itemdel(Ditem){
     let { id, type, quantity } = Ditem;
     this.$store.dispatch("updateThisCart", { id, type, quantity:quantity=0 } );
     this.carts()
    }
  },
  watch: {
    quantityArray() {
      if(this.quantityArray){
      // 监听数据的变化 从而改变价格
      // 总数
      this.totalQuantity = 0;
      // 总价
      this.totalPrice = 0;
      this.getAllCart();
      }
    }
  }
};
</script>

<style scoped>
.isshow {
  display: none;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: #fff;
}
.navbar-center {
  text-align: center;
}
.carlist {
  margin: 15px 0 0 0;
  background: #fff;
  width: 100%;
  height: 100%;
}
.carlist-top {
  display: flex;
  align-items: center;
}
.carlist-top span {
  display: inline-block;
  flex: 1;
}
.carlist-top .tmall {
  width: 25px;
  height: 25px;
  display: inline-block;
  background: url(./images/tmall.png);
  background-size: 100%;
  margin: 0 10px;
}
.carlist-bot {
  margin: 10px 0;
  display: flex;
  align-items: center;
  font-size: 13px;
}
.carlist-bot .commodity {
  display: flex;
}
.carlist-bot .commodity img {
  margin: 0 10px;
  width: 100px;
  height: 100%;
}
.commodity .commoditydetails .commoditydetailstitle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.commodity .commoditydetails .commoditydetailstitle .title {
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
}
.commodity .commoditydetails .commoditydetailstitle .title .titleName{
  display: inline-block;
  white-space: nowrap;
  flex: 1;
  overflow: hidden;
}
.commodity .commoditydetails .commoditydetailstitle .title .title-qx{
  display: inline-block;
  font-size:18px;
  font-weight: bold;
  flex: 0.2;
  text-align: right;
}
.commodity .commoditydetails .commoditydetailstitle .price {
  display: flex;
  justify-content: space-between;
}
.commodity .commoditydetails .commoditydetailstitle .price span {
  display: inline-block;
  width: 130px;
}
.commodity .commoditydetails .commoditydetailstitle .price .quantity span {
  display: inline-block;
  width: 50px;
  text-align: center;
}
.commodity .commoditydetails .commoditydetailstitle .price > span {
  font-size: 15px;
  color: #f60;
}
.gotoHome {
  margin: 0 auto;
  width: 100px;
  line-height: 45px;
  background: #f60;
  color: #fff;
  font-weight: bold;
  text-align: center;
}
.check-icon img {
  width: 30px;
}
.c-footer {
  position: fixed;
  bottom: 50px;
  width: 100%;
  max-width: 640px;
  min-width: 320px;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: #fff;
}
.c-f-left {
  width: 70%;
  display: flex;
  justify-content: space-between;
  padding: 0px 5px;
  align-items: center;
}
.qx {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.c-f-left p {
  font-size: 14px;
  padding: 0px 3px;
  color: #000;
}
.c-f-left span,
.c-f-left strong {
  color: #f60;
}
.c-f-left strong {
  font-size: 16px;
}
.c-f-right {
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  background: #f60;
}
.carerror{
  text-align: center;
}
</style>