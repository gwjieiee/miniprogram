<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" circular="true">
						<swiper-item v-for="(img,index) in imgList" :key="index">
							<image class="swiper" :src="img.url"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				imgList: [
					{url:"../../static/lixian/lixian1.jpg"},
					{url:"../../static/lixian/lixian2.jpg"},
					// {url:"../../static/lixian/lixian3.jpg"},
					{url:"../../static/lixian/lixian4.jpg"}
				]
			}
		},
		methods: {

		}
	}
</script>

<style>
	.swiper{
		width: 100%;
		height: 1000upx;
	}
</style>
