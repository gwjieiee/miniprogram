<template>
	<view>
		<view class="user-info">
			<view class="login-button" v-if="!hasInfo" @tap="getOpenId">点击获取头像和昵称</view>
			<view class="info-user" v-else>
				<image class="user-photo" :src="userPhoto" mode="widthFix"></image>
				<view class="user-name">{{userNickname}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '@/common/util.js'
	export default {
		data() {
			return {
				hasInfo:false,
				userPhoto:'',
				userNickname:''
			}
		},
		onLoad() {
			if(util.getValue('userInfo')){
				this.hasInfo = true
				let user = util.getValue('userInfo')
				this.userNickname = user.nickName
				this.userPhoto = user.avatarUrl
			}else{
				this.hasInfo = false
			}
		},
		onShow() {
			
		},
		methods: {
			getOpenId() {
				let _this = this
				uni.getUserProfile({
					desc: '登录',
					success: (info) => {
						this.hasInfo = true
						this.userNickname = info.userInfo.nickName
						this.userPhoto = info.userInfo.avatarUrl
						util.setValue('userInfo',info.userInfo)
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
						console.log('no',err);
					}
				})
			},
			get_secret(code){
				this.$request('https://api.weixin.qq.com/sns/jscode2session','get',{
					appid:'wxafd51a9aec0d24ce',
					secret:'a08337afd51e7928eb5b0b288a7b824f',
					js_code:code,
					grant_type:'authorization_code'
				}).then(res=>{
					console.log('last',res)
				})
			},
		}
	}
</script>

<style lang="scss">
	.user-info{
		display: flex;
		width: 100%;
		height: auto;
		justify-content: center;
		align-items: center;
		.login-button{
			width: 100%;
			height: 50px;
			line-height: 50px;
			margin: 30px auto;
			text-align: center;
		}
		.info-user{
			display: flex;
			align-items: center;
			width: 100%;
			height: auto;
			padding: 15px;
			border-bottom: 1px solid #B0D4D2;
		}
		.user-photo{
			width: 55px;
			border-radius: 50%;
			margin-right: 20px;
		}
		.user-name{
			color: #6EACA7;
		}
	}
</style>
