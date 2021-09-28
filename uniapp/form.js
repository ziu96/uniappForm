export default {
	data() {
		return {
			timeParams: {
				year: false,
				month: false,
				day: false,
				hour: true,
				minute: true,
				second: true
			},
			dateParams: {
				year: true,
				month: true,
				day: true
			},
			regionParams: {
				province: true,
				city: true,
				area: true,
			},
			action: this.$config.upUrl,
			header: {
				'Authorization': this.$session.get('token'),
				'token': this.$session.get('token'),
				'Content-Type': 'application/json'
			},
			isScroll: true,
		}
	},
	filters: {
		// 单列下拉value转label
		filterValueToLabelSingle(value, arr) {
			if (value) {
				let label = '';
				arr.forEach(item => {
					if (item.value == value) {
						label = item.label;
					}
				})
				return label;
			}
		}
	},
	methods: {
		Params(fad) {
			console.log(fad)
		},
		selectConfirm(e, key) {
			const {
				label,
				value
			} = e[0];
			this.formData[key] = String(value);
			this.selectDefaultValue[key][0] = String(Number(value) - 1);
			this.validation(key) //单条验证
		},
		selectClick(key) {
			uni.hideKeyboard()
			this.selectShow[key] = true
		},
		checkboxGroupChange(e, key) {
			this.formData[key] = e
		},
		timeConfirm(val, key) {
			this.formData[key] = Object.keys(val).map(key => val[key]).join(':')
		},
		// 日期确认选择
		dateConfirm(e, key) {
			const {
				year,
				month,
				day
			} = e
			this.formData[key] = `${year}-${month}-${day}`
			this.validation(key) //单条验证
		},
		// 省市区确认选择
		regionConfirm(e, key) {
			console.log('e', e)
			const {
				area,
				city,
				province
			} = e;
			this.formData[key] = `${province.label}/${city.label}/${area.label}`;
			this.formData.belongProvince = province.label
			this.formData.belongingCity = city.label
			this.formData.belongDistrict = area.label
			this.validation(key) //单条验证
		},
		// 图片上传成功回调
		onUploadComplete(lists, keyName) {
			console.log(keyName, 'keyName')
			let arr = [];
			lists.forEach(item => {
				if (item.progress == 100) {
					arr.push(item.response[0]);
				}
			})
			this.formData[keyName] = arr.join(',');
			this.validation(keyName) //单条验证
		},

		// 图片上传chnage事件
		onUploadListChange(lists, keyName) {
			let arr = [];
			lists.forEach(item => {
				if (item.progress == 100) {
					arr.push(item.response[0]);
				}
			})
			this.formData[keyName] = arr.join(',');
			this.validation(keyName) //单条验证
		},
		// 评分 change事件 input
		onChangeRate(e, keyName) {
			this.formData[keyName] = e;
			this.validation(keyName) //单条验证
		},
		// 单条验证
		validation(key) {
			console.log('验证了', key)
			if (this.$refs[key][0]) {
				setTimeout(() => {
					this.$refs[key][0].validation(); // 验证单条form-item规则
				}, 300)
			} else {
				setTimeout(() => {
					this.$refs[key].validation(); // 验证单条form-item规则
				}, 300)
			}

		}

	},
	onReady() {
		uni.onKeyboardHeightChange((res) => {
			this.isScroll = res.height ? false : true
		})
		// this.$refs.uForm.setRules(this.rules);
	},
	onShow() {
		this.header = {
			'Authorization': this.$session.get('token'),
			'token': this.$session.get('token'),
			'Content-Type': 'application/json'
		}
	}
}
