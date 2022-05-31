<template>
	<view class="index">
		<view class="top">
			<view class="location">{{location}}</view>
			<view class="weather_current">
				<view class="weather_tem">
					{{tem}}°C
				</view>
				<view class="weather_description">{{wea}}</view>
			</view>
			<image class="top_bg" src="../../static/index/lixian.jpg"></image>
		</view>
		
		<!-- <li-info :list="list"></li-info> -->
		<view class="middle">
			<view style="display: flex;" v-for="(wea,index) in weather" :key="index">
				<view>{{wea.day}}</view>
				<view>{{wea.wea}}</view>
				<view>{{wea.tem2}}-{{wea.tem1}}°C</view>
			</view>
			<image class="middle_bg" src="../../static/index/q_lixian.jpg"></image>
		</view>
		<!-- <view class="bottom"></view> -->
		
		
		
	</view>
</template>

<script>
	import liInfo from '@/pages/index/li-info.vue'
	export default {
		data() {
			return {
				location:'',
				list:[
					{name:'lixian',date:'1019'},
					{name:'gwjieiee',date:'0808'},
				],
				weather:[],
				tem:'',
				wea:'',
				wea_img:''
			}
		},
		components:{
			liInfo
		},
		onLoad() {
			this.getweather();
		},
		methods: {
			getweather(){
				this.$request('https://www.tianqiapi.com/ip','post',{
					version:'v9',
					appid:'29272956',
					appsecret:'gXp6lPLv'
				}).then(res=>{
					this.getweatherData(res.ip)
				})
			},
			getweatherData(ip){
				this.$request('https://www.tianqiapi.com/api','get',{
					version:'v9',
					appid:'29272956',
					appsecret:'gXp6lPLv'
				}).then(res=>{
					this.location = res.city;
					this.weather = res.data;
					this.wea = this.weather[0].wea;
					this.tem = this.weather[0].tem;
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #f8f8f8;
	}
	.top{
		width: 100%;
		height: 390upx;
		text-align: center;
		background-color: #fff;
		/* border-radius: 20upx; */
		position: relative;
		overflow: hidden;
	}

	.top_bg{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.5;
	}

	.location{
		width: 100%;
		height: 130upx;
		line-height: 130upx;
		font-size: 20px;
	}

	.weather_current{
		width: 100%;
		height: 260upx;
	}

	.weather_tem{
		width: 100%;
		height: 150upx;
		line-height: 150upx;
		text-align: center;
		font-size: 35px;
	}

	.weather_description{
		width: 100%;
		height: 110upx;
		line-height: 110upx;
		font-size: 20px;
	}

	.middle{
		margin-top: 30upx;
		width: 100%;
		height: 700upx;
		background-color: #fff;
		/* border-radius: 20upx; */
		position: relative;
		font-size: 30upx;
		overflow: hidden;
	}
	
	.middle_bg{
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0.5;
	}
	
	.middle view view{
		width: 33%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
	}
	
	/* 图片放大缩小动画 */
	@keyframes animate{
		from{
			transform: scale(1);
		}
		to{
			transform: scale(1.5);
		}
	}
	
	.top_bg{
		animation: animate 15s infinite;
	}
	
</style>
