function setValue(key,val){
		uni.setStorageSync(key,val)
	}
	
function	getValue(key){
		let res = uni.getStorageSync(key)
		if(res){
			return res
		}else{
			console.log('不存在该属性')
		}
	}
function	delValue(key){
		uni.removeStorageSync(key)
	}
function	clear(){
		uni.clearStorageSync()
	}

export default {
	setValue,
	getValue,
	delValue,
	clear
}