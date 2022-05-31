<template>
	<view>
		<view class="list" v-for="item in list" :key="item.name">
			<!-- <image style="width: 50upx;height: 50upx;" src="../../static/index/leaf.png"> -->
			<text>{{item.name}} {{item.date}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:['list'],
		
		methods: {
			
		}
	}
</script>

<style>
.list{
	display: flex;
	align-items: center;
}
.list text{
	color: #555;
	font-size: 26upx;
	padding-left: 30upx;
}


</style>
