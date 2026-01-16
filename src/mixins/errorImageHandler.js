// src/mixins/errorImageHandler.js
export default {
	data() {
		return {
			// 可复用的默认图片配置（组件中可覆盖）
			defaultImages: {
				default: 'https://www.pgsoft.com/_nuxt/img/error_icon.2a67ef6.png', // 通用默认图
				small: 'https://www.pgsoft.com/_nuxt/img/error_icon.2a67ef6.png', // 小图默认占位
				big: 'https://www.pgsoft.com/_nuxt/img/error_icon.2a67ef6.png' // 大图默认占位
			}
		};
	},
	methods: {
		/**
		 * 通用图片错误处理方法：直接修改本地数据的图片地址
		 * @param {Array} list - 图片所在的数组（如 HottestCategoryList）
		 * @param {Number} index - 数组项索引
		 * @param {String} key - 图片字段名（icon/image1/bigImg 等）
		 * @param {String} type - 默认图类型（default/small/big）
		 */
		handleImageError(list, index, key, type = 'default') {
			// 安全校验：防止数组/索引/字段不存在导致报错
			if (!Array.isArray(list) || !list[index] || !this.defaultImages[type]) return;
			// 直接替换为默认图（响应式更新）
			this.$set(list[index], key, this.defaultImages[type]);
		},

		/**
		 * 通用头部图片错误处理
		 * @param {String} dataKey - 头部图片在组件data中的key名（如 headerImgSrc）
		 * @param {String} type - 默认图类型
		 */
		handleHeaderImageError(dataKey, type = 'default') {
			if (!this[dataKey] || !this.defaultImages[type]) return;
			this[dataKey] = this.defaultImages[type];
		},

		/**
		 * 初始化检查无效图片地址（可选）
		 * @param {Array} list - 要检查的数组
		 * @param {Object} keyToType - 图片key和默认图类型的映射 { icon: 'default', image1: 'small' }
		 */
		initInvalidImages(list, keyToType) {
			if (!Array.isArray(list) || !keyToType) return;
			list.forEach((item, index) => {
				Object.keys(keyToType).forEach(key => {
					const rawUrl = item[key] || '';
					// 校验无效地址：空值/包含undefined/null
					if (!rawUrl || rawUrl.trim() === '' || /undefined|null/.test(rawUrl)) {
						this.$set(list[index], key, this.defaultImages[keyToType[key]]);
					}
				});
			});
		}
	}
};