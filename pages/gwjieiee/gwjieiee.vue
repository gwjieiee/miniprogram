<template>
	<view>
		<view class="user-info">
			<view class="login-button" v-if="!hasInfo" @tap="getOpenId">点击获取头像和昵称</view>
			<view class="info-user" v-else>
				<image class="user-photo" :src="userPhoto" mode="widthFix"></image>
				<view class="user-name">{{userNickname}}</view>
				<view class="weather-info">
					<view v-if="weather && weather[0]">日期：{{weather[0].date}}</view>
					<view v-if="weather && weather[0]">天气：{{weather[0].wea}}</view>
					<view v-if="weather && weather[0]">气温：{{weather[0].tem2}}-{{weather[0].tem1}}°C</view>
				</view>
			</view>
		</view>
		<view class="weather-detail">
			<view class="top">
				<view class="left">
					<view>空气质量</view>
					<view v-if="weather && weather[0]">{{weather[0].air_level}}</view>
				</view>
				<view class="right">
					<view v-if="weather && weather[0]">{{weather[0].win[0] + weather[0].win_speed}}</view>
					<view v-if="weather && weather[0]">{{weather[0].win_meter}}</view>
				</view>
			</view>
			<view class="bottom">
				<view class="left">
					<view>湿度</view>
					<view v-if="weather && weather[0]">{{weather[0].humidity}}</view>
				</view>
				<view class="right">
					<view>能见度</view>
					<view v-if="weather && weather[0]">{{weather[0].visibility}}</view>
				</view>
			</view>
		</view>
		<view class="chart-box">
			<view class="chart-title">近五日天气气温折线图</view>
			<qiun-data-charts type="line" :chartData="chartsDataLine1" />
		</view>
	</view>
</template>

<script>
	import qiunDataCharts from '@/components/qiun-data-charts/qiun-data-charts/qiun-data-charts.vue'
	import util from '@/common/util.js'
	export default {
		components:{
			qiunDataCharts
		},
		data() {
			return {
				hasInfo: false,
				userPhoto: '',
				userNickname: '',
				chartsDataLine1: {},
				weather:[],
				
			}
		},
		watch:{
			weather:{
				handler(newV,old){
					if(newV){
						this.weather = newV
						this.handle_chart()
					}
				},
				deep:true
			}
		},
		onLoad() {
			if (util.getValue('userInfo')) {
				this.hasInfo = true
				let user = util.getValue('userInfo')
				this.userNickname = user.nickName
				this.userPhoto = user.avatarUrl
			} else {
				this.hasInfo = false
			}
			this.getweather();
		},
		onShow() {

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
					this.weather = res.data;
					this.handle_chart()
					console.log(res)
				})
			},
			handle_chart(){
				// "series": [{
				// 	"name": "气温°C",
				// 	"data": [1,2,3,4,5,6,7]
				// }]
				let wea = this.weather.filter((item,index)=>index < 5)
				let series = [{
					name:'最高气温°C',
					data:wea.map(item=>item.tem1)
				},
				{
					name:'最低气温°C',
					data:wea.map(item=>item.tem2)
				}]
				let data = wea.map(item=>item.date.substr(5,9))
				this.chartsDataLine1 = {
					categories:data,
					series:series
				}
			},
			getOpenId() {
				let _this = this
				uni.getUserProfile({
					desc: '登录',
					success: (info) => {
						this.hasInfo = true
						this.userNickname = info.userInfo.nickName
						this.userPhoto = info.userInfo.avatarUrl
						util.setValue('userInfo', info.userInfo)
						console.log(info)
						//这里取到的是用户的信息，自己安排自己的业务
						// uni.login({
						// 	provider: 'weixin',
						// 	success: (res) => {
						// 		console.log('res',res)
						// 		// this.get_secret(res.code)
						// 		//这里获取的是用户的code，用来换取 openid、unionid、session_key 等信息，再将信息丢给后台自己的登录业务就行了
						// 	}
						// })
					},
					fail: (err) => {
						console.log('no', err);
					}
				})
			},
			get_secret(code) {
				this.$request('https://api.weixin.qq.com/sns/jscode2session', 'get', {
					appid: '',
					secret: '',
					js_code: code,
					grant_type: 'authorization_code'
				}).then(res => {
					console.log('last', res)
				})
			},
		}
	}
</script>

<style lang="scss">
	.user-info {
		display: flex;
		width: 100%;
		height: auto;
		justify-content: center;
		align-items: center;

		.login-button {
			width: 100%;
			height: 50px;
			line-height: 50px;
			margin: 30px auto;
			text-align: center;
		}

		.info-user {
			display: flex;
			align-items: center;
			width: 100%;
			height: auto;
			padding: 15px;
			border-bottom: 1px solid #B0D4D2;
			color: #B0D4D2;
		}

		.user-photo {
			width: 55px;
			border-radius: 50%;
			margin-right: 20px;
		}

		.user-name {
			color: #6EACA7;
			margin-right: 50px;
		}
		.weather-info{
			view{
				width: 100%;
				height: 30px;
				line-height: 30px;
			}
		}
	}
	.chart-box{
		width: 100%;
		height: 300px;
		margin-top: 20px;
		.chart-title{
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			color: #aaa;
		}
	}
	.weather-detail{
		width: 90%;
		height: auto;
		margin: 10px 2.5%;
		padding: 2.5%;
		border-radius: 10px;
		background: rgba(176,212,210,.7);
		color:#fff;
		.top,.bottom{
			width: 100%;
			height: auto;
			display: flex;
			.left,.right{
				width: 50%;
				view{
					&:nth-child(1){
						font-size: 13px;
						width: 100%;
						height: 30px;
						line-height: 30px;
					}
					&:nth-child(2){
						width: 100%;
						height: 40px;
						line-height: 40px;
					}
				}
			}
		}
	}
</style>
