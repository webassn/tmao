<template>
	<div>
		<my-scroll class="wrapper" 
		:style="{'height':maxHeight}"
		:data="productData"
		:pullup="pullup"
		@pullup="_pullup"
		@scroll="_scroll"
		:listenScroll="isScroll"
		ref="scroll">
			<div class="content">
				<nav-bar>
					<i class="iconfont icon-scan" slot="left"></i>
					<div class="search-box-wrapper" slot="center">
						<i class="iconfont icon-search"></i>
						<input class="search-box" type="text" title="搜索框" placeholder="开学季5折优惠">
						<i class="iconfont icon-close"></i>
					</div>
					<i class="iconfont icon-msg" slot="right"></i>
				</nav-bar>
				<swiper :options="swiperOption">
					<swiper-slide v-for="(val,key) in sliders" :key="key">
						<a :href="val.imgurl"><img :src="val.imgName" alt=""></a>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
				<nav class="index-nav">
					<ul class="nav">
						<li v-for="(val,key) in navs" :key="key">
							<a href="">
								<img :src="val.navurl" :alt="val.title">
								<span>{{ val.title }}</span>
							</a>
						</li>
					</ul>
				</nav>
				<!-- 产品展示 用子 -->
				<product-list @loaded="getProductData" ref="productList"></product-list>
				<!-- productList这里 -->
				<!-- 返回顶部 -->	
			</div>
		</my-scroll>
		<div class="g-backtop-container">
			<my-top :visible="isBacktopVisible"  @backtop="backToTop"></my-top>
		</div>
	</div>
</template>

<script>
	import NavBar from "@/components/navbar";
	import productList from './productList';
	import { swiper, swiperSlide } from "vue-awesome-swiper";
	import MyScroll from '@/components/scroll';
	import 	MyTop from '@/components/backtop';
	export default {
		name: "home",
		components: {
			NavBar,
			swiper,
			swiperSlide,
			productList,
			MyScroll,
			MyTop
		},
		data() {
			return {
				isScroll: true,
				//返回顶部的按钮
				isBacktopVisible: false,
				//数据
				productData:[],
				page:1,
				totalPage:0,
				pulldown:true,
				pullup:true,
				// 
				maxHeight:document.documentElement.clientHeight - 50 + 'px',
				sliders: [
					{
						imgurl: "http://www.sohu.com",
						imgName: require("./images/1.jpg")
					},
					{
						imgurl: "http://www.baidu.com",
						imgName: require("./images/2.jpg")
					},
					{
						imgurl: "http://www.jd.com",
						imgName: require("./images/3.jpg")
					},
					{
						imgurl: "http://www.tmall.com",
						imgName: require("./images/4.jpg")
					}
				],
				swiperOption: {
					direction: 'horizontal',
					loop: true,
					autoplay: {
						delay: 2000,
						disableOnInteraction: false
					},
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					}
				},
				navs: [{
						navurl: require('./images/nav-item-1.png'),
						title: '热卖'
					},
					{
						navurl: require('./images/nav-item-2.png'),
						title: '热卖'
					},
					{
						navurl: require('./images/nav-item-3.png'),
						title: '团购'
					},
					{
						navurl: require('./images/nav-item-4.png'),
						title: '海鲜'
					},
					{
						navurl: require('./images/nav-item-5.png'),
						title: '化妆'
					},
					{
						navurl: require('./images/nav-item-6.png'),
						title: '秒杀'
					},
					{
						navurl: require('./images/nav-item-7.png'),
						title: '内衣'
					},
					{
						navurl: require('./images/nav-item-8.png'),
						title: '鞋帽'
					}
				]
			};
		},
		methods:{
			getProductData(obj){
				this.productData = obj.productList,
				this.page = obj.page,
				this.totalPage = obj.totalPage
			},
			_scroll(pos) {
			//检测滚动条 ,滚动高度 pos.y
			console.log(pos);
			console.log(pos.y);
			this.isBacktopVisible = pos.y < 0 && -pos.y > 200;
			},
			_pullup(){
				console.log('正在上拉');
				if(this.page > this.totalPage){
					console.log('数据加载完了!!');
					this.pullup = false;
					return false;
				}
				this.$refs.productList.update();
			},
			backToTop(){
				this.$refs.scroll && this.$refs.scroll.scrollTo(0,0)
			}
		}
	};
</script>

<style scoped>
	.navbar {
		height: 50px;
		background: #f60;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.search-box-wrapper {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 7px;
		background-color: #fff;
		border-radius: 20px;
	}
	
	.search-box-wrapper .search-box {
		width: 100%;
	}
	
	.icon-scan,
	.icon-msg {
		color: #fff;
		font-size: 30px;
	}
	
	.search-box-wrapper .iconfont {
		font-size: 20px;
		color: #ccc;
	}
	
	.swiper-slide img {
		width: 100%;
	}
	
	.index-nav {
		background: #fff;
	}
	
	.index-nav .nav {
		padding: 5px 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	
	.index-nav .nav li a {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.index-nav .nav li {
		width: 25%;
	}
	
	.index-nav .nav li img {
		width: 60%;
	}
	
	.index-nav .nav li span {
		padding: 10px 0;
	}
	/*滚动条*/
	.wrapper {
	  width: 100%;
	  height: 1000px;
	  overflow: hidden;
	}
	.content {
	  height: auto;
	}
</style>