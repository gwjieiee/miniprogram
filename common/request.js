function request(url,method,data){
	var header = {
		'content-type':'application/x-www-form-urlencoded'
	}
	return new Promise((res,rej)=>{
		uni.request({
			url: url,
			method: method,
			data: data,
			header: header, 
			success(response) {
				if (response.statusCode == 500 || response.status == 500) {
					uni.showToast({
						title: '服务器错误',
						icon: 'none',
					});
				} else {
					res(response.data)
				}
			},
			fail(err) {
				console.log('err', err)
				uni.showToast({
					title: '网络请求失败，请检查网络。',
					icon: 'none',
				});
				rej()
			}
		})
	})
}

export default request;