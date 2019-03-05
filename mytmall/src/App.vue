<template>
  <div class="g-container" id="app">
		<div class="g-view-container">
      <router-view></router-view>
    </div>
		<div class="g-footer-container">
			<div class="g-tabbar">
				<router-link  to="/home" class="item active">
					<i class="iconfont icon-home"></i>
					<span>首页</span>
				</router-link>
				<router-link  to="/category" class="item">
					<i class="iconfont icon-category"></i>
					<span>分类</span>
				</router-link>
				<router-link  to="/cart" class="item">
					<i class="iconfont icon-cart"></i>
					<span>购物车</span>
				</router-link>
				<router-link  to="/personal" class="item">
					<i class="iconfont icon-personal"></i>
					<span>我的</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import tabbar from "@/components/tabbar";
export default {
  name: 'App',
  components:{
    tabbar
	},
	created(){
			this.$store.state.cart.added = JSON.parse(window.localStorage.getItem("cart"));
			if(this.$store.state.cart.added==null){
				this.$store.state.cart.added = []
			}
	}
}
</script>

