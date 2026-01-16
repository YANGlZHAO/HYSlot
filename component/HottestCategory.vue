<template>
	<div class="game-swiper-container">
		<div class="header-inner">
			<img :src="headerImgSrc" class="text_Img_Hottest_Category" @error="handleHeaderImgError" />
			<view v-if="HottestCategoryList.length > 1" class="bi-chevron">
				<i class="bi bi-chevron-left"
					:class="currentIndex !== 0 ? 'bi-chevron-Highlight' : 'bi-chevron-lowDark'"></i>
				<i class="bi bi-chevron-right"
					:class="currentIndex !== HottestCategoryList.length - 1 ? 'bi-chevron-Highlight' : 'bi-chevron-lowDark'"></i>
			</view>
		</div>

		<swiper :indicator-dots="false" :autoplay="false" :circular="false" :current="currentIndex"
			:previous-margin="'1.25rem'" :next-margin="'1.25rem'" class="game-swiper" @change="onSwiperChange">
			<swiper-item v-for="(item, index) in HottestCategoryList" :key="index">
				<div class="game-item-wrapper">
					<div class="game-item" :class="{ active: currentIndex === index }" @click="handleItemClick(item)">
						<div class="category-container">
							<div class="left-container">
								<div class="left-top-card" @click="handleCardClick('large')">
									<img class="large-card-icon" :src="getImgUrl(index, 'icon', 'default')"
										@error="() => setErrorImg(index, 'icon')"></img>
									<div class="large-card-title">{{ item.title }}</div>
									<div class="large-card-desc">{{ item.desc }}</div>
								</div>
								<div class="left-bottom-cards">
									<div class="small-card" @click="handleCardClick('small3')">
										<!-- 图片：状态驱动 + 错误处理 -->
										<img :src="getImgUrl(index, 'image1', 'small')" class="small-card-img"
											@error="() => setErrorImg(index, 'image1')" />
									</div>
									<div class="small-card" @click="handleCardClick('small4')">
										<img :src="getImgUrl(index, 'image2', 'small')" class="small-card-img"
											@error="() => setErrorImg(index, 'image2')" />
									</div>
								</div>
							</div>

							<div class="right-container">
								<div class="right-top-cards">
									<div class="small-card" @click="handleCardClick('small3')">
										<img :src="getImgUrl(index, 'image3', 'small')" class="small-card-img"
											@error="() => setErrorImg(index, 'image3')" />
									</div>
									<div class="small-card" @click="handleCardClick('small4')">
										<img :src="getImgUrl(index, 'image4', 'small')" class="small-card-img"
											@error="() => setErrorImg(index, 'image4')" />
									</div>
								</div>
								<div class="right-bottom-card" @click="handleCardClick('small4')">
									<img :src="getImgUrl(index, 'bigImg', 'big')" class="big-card-img"
										@error="() => setErrorImg(index, 'bigImg')" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	export default {
		props: {
			HottestCategoryList: {
				type: Array,
				required: true,
			},
		},
		data() {
			return {
				currentIndex: 0,
				// 定义默认占位图地址
				defaultImages: {
					default: 'https://www.pgsoft.com/_nuxt/img/error_icon.2a67ef6.png', // 通用默认图
					small: 'https://www.pgsoft.com/_nuxt/img/error_icon.2a67ef6.png', // 小图默认占位
					big: 'https://www.pgsoft.com/_nuxt/img/error_icon.2a67ef6.png' // 大图默认占位
				},
				// 头部图片初始地址
				headerImgSrc: '/static/textImg_Hottest_Category.png',
				// 记录每个图片的错误状态（格式：{ "索引-图片key": true }）
				errorImgMap: {},
				// 图片状态：loading | loaded | error
		imgStatusMap: {} // { "0-icon": "loaded" }
		
			};
		},
		mounted() {},
		methods: {
			// swiper切换事件
			onSwiperChange(e) {
				this.currentIndex = e.detail.current;
			},
			// 卡片点击事件
			handleItemClick(item) {
				this.$emit('item-click', item);
			},
			handleCardClick(cardType) {
				this.$emit("card-click", cardType);
			},

			/**
			 * 核心：获取图片地址（状态驱动）
			 * @param {Number} index - swiper-item索引
			 * @param {String} key - 图片字段名（icon/image1/image2等）
			 * @param {String} type - 默认图类型（default/small/big）
			 * @returns {String} 最终显示的图片地址
			 */
			getImgUrl(index, key, type) {
				// 1. 如果标记为错误，直接返回默认图
				if (this.errorImgMap[`${index}-${key}`]) {
					return this.defaultImages[type];
				}

				// 2. 获取当前item
				const item = this.HottestCategoryList[index] || {};

				// 3. 读取对应字段的图片地址（包括icon）
				const rawUrl = item[key] || '';

				// 4. 空值/无效地址直接返回默认图
				if (!rawUrl || rawUrl.trim() === '' || rawUrl.includes('undefined') || rawUrl.includes('null')) {
					return this.defaultImages[type];
				}

				// 5. 有效地址返回原地址
				return rawUrl;
			},

			/**
			 * 标记图片错误并强制更新视图
			 * @param {Number} index - swiper-item索引
			 * @param {String} key - 图片字段名
			 */
			setErrorImg(index, key) {
				// 标记该图片为错误状态
				this.errorImgMap[`${index}-${key}`] = true;
				// 强制更新视图（小程序关键：触发Vue重新渲染）
				this.$forceUpdate();
				// 打印日志（方便排查）
				console.warn(`图片加载失败，已替换为默认图: 索引${index}-${key} -> ${this.defaultImages.small}`);
			},

			/**
			 * 头部图片错误处理
			 */
			handleHeaderImgError() {
				this.headerImgSrc = this.defaultImages.default;
				console.warn('头部标题图片加载失败，已替换为默认图');
			}
		},
	};
</script>

<style scoped>
	.game-swiper-container {
		border-radius: 1rem;
		box-shadow: 0 0.1rem 0.75rem rgba(0, 0, 0, 0.05);
	}

	.header-inner {
		padding: 0.2rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.text_Img_Hottest_Category {
		width: 8rem;
	}

	.bi-chevron {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.bi-chevron-Highlight {
		font-size: 1rem;
		color: #ecd370;
	}

	.bi-chevron-lowDark {
		font-size: 1rem;
		color: #9b9b9b;
	}

	.game-swiper {
		height: 18rem;
	}

	.game-swiper /deep/ .uni-swiper-slides {
		inset: 0 1rem !important;
	}

	.game-swiper ::v-deep .uni-swiper-slides {
		inset: 0 1rem !important;
	}

	.swiper-item {
		display: flex !important;
		justify-content: center;
		align-items: center;
	}

	.game-item-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: 0.5rem 0;
	}

	.game-item {
		width: 90%;
		background: #fff;
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		opacity: 0.7;
		cursor: pointer;
		overflow: hidden;
		max-width: 20rem;
		border-radius: 1rem;
	}

	.game-item.active {
		transform: scale(1.03);
		opacity: 1;
	}

	.category-container {
		padding: 1rem;
		display: flex;
		gap: 0.5rem;
		height: 15rem;
		box-sizing: border-box;
		background-color: #382912;
	}

	.left-container,
	.right-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		min-height: 0;
		/* ⭐ 非常关键，防止 flex 子项撑爆 */
	}

	.left-top-card {
		flex: 2;
		background-color: #895c07;
		color: #fff;
		padding: 0.8rem;
		border-radius: 0.8rem;
		display: flex;
		flex-direction: column;
		cursor: pointer;
		transition: transform 0.2s ease;
		min-height: 0;
	}

	.left-top-card:hover {
		transform: scale(1.02);
	}

	.left-bottom-cards, 
	.right-top-cards{
		flex: 1;
		display: flex;
		gap: 0.8rem;
		min-height: 0;
		justify-content: space-evenly;
	}

	.right-bottom-card {
		overflow: hidden;
		flex: 2;
		background-color: #895c07;
		color: #fff;
		border-radius: 0.8rem;
		display: flex;
		flex-direction: column;
		cursor: pointer;
		transition: transform 0.2s ease;
		min-height: 0;
	}

	.right-bottom-card:hover {
		transform: scale(1.02);
	}

	.small-card,
	.right-bottom-card {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		min-width: 0;
		min-height: 0;
	}

	.small-card:hover {
		transform: scale(1.02);
	}

	.small-card-img,
	.big-card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		border-radius: 0.8rem;
	}

	.large-card-icon {
		width: 1rem;
		margin-bottom: 0.5rem;
	}

	.large-card-title {
		font-size: 0.8rem;
		font-weight: 700;
		margin-bottom: 0.3rem;
	}

	.large-card-desc {
		font-size: 0.6rem;
		opacity: 0.9;
		line-height: 1.4;
	}
</style>