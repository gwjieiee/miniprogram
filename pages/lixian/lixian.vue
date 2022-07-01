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
					{url:'https://wx3.sinaimg.cn/mw2000/7e298279ly1h3qmse2fi0j20u014f79p.jpg'},
					{url:'https://wx3.sinaimg.cn/mw2000/7e298279ly1h3qmsecwxuj20u014fdjv.jpg'},
					{url:'https://wx4.sinaimg.cn/mw2000/7e298279ly1h3qmsepfdzj20u014fq8m.jpg'}
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
