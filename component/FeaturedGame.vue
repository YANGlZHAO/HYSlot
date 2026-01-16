<template>
	<div class="game-swiper-container">
		<div class="header-inner">
			<img :src="headerImgSrc" class="text_Img_Hottest_Category" @error="handleHeaderImgError" />
			<view v-if="FeaturedGameList.length > 1" class="bi-chevron">
				<i class="bi bi-chevron-left"
					:class="currentIndex !== 0 ? 'bi-chevron-Highlight' : 'bi-chevron-lowDark'"></i>
				<i class="bi bi-chevron-right"
					:class="currentIndex !== FeaturedGameList.length - 1 ? 'bi-chevron-Highlight' : 'bi-chevron-lowDark'"></i>
			</view>
		</div>
		<div class="card-container">
			<!-- 卡片列表：移除弹性拉伸，固定宽度 -->
			<div class="card-item" v-for="(item, index) in cardList" :key="index">
				<div class="card-img-wrapper">
					<img :src="item.image" class="card-img" @error="() => item.image = defaultImages.small" loading="lazy">
				</div>
				<p class="card-title">{{ item.title }}</p>
			</div>
		</div>
		<!-- 加载更多按钮 -->
		<button class="load-more-btn" @click="loadMore" :disabled="isLoading || !hasMoreData">
			{{ isLoading ? 'Loading...' : hasMoreData ? 'Load More' : 'No More Data' }}
		</button>
	</div>
</template>

<script>
	export default {
		props: {
			FeaturedGameList: {
				type: Array,
				required: true,
			},
		},
		data() {
			return {
				currentIndex: 0,
				defaultImages: {
					default: 'https://www.pgsoft.com/_nuxt/img/error_icon.2a67ef6.png',
					small: 'https://www.pgsoft.com/_nuxt/img/error_icon.2a67ef6.png',
					big: 'https://www.pgsoft.com/_nuxt/img/error_icon.2a67ef6.png'
				},
				headerImgSrc: '/static/textImg_Hottest_Category.png',
				errorImgMap: {},
				imgStatusMap: {},
				cardList: [{
						image: "./static/icons/1.png",
						title: "FOUTURE MOUSE"
					},
					{
						image: "./static/icons/2.png",
						title: "DROGON KING FISHING"
					},
					{
						image: "./static/icons/3.png",
						title: "ANIMAL PARTY"
					}
				],
				moreData: [{
						image: "./static/icons/4.png",
						title: "CARD 4"
					},
					{
						image: "./static/icons/5.png",
						title: "CARD 5"
					},
					{
						image: "./static/icons/6.png",
						title: "CARD 6"
					},
					{
						image: "./static/icons/7.png",
						title: "CARD 7"
					},
					{
						image: "./static/icons/8.png",
						title: "CARD 8"
					},
					{
						image: "./static/icons/9.png",
						title: "CARD 9"
					},
					{
						image: "./static/icons/10.png",
						title: "CARD 10"
					},
					{
						image: "./static/icons/11.png",
						title: "CARD 11"
					},
					{
						image: "./static/icons/12.png",
						title: "CARD 12"
					},
					{
						image: "./static/icons/13.png",
						title: "CARD 13"
					}, {
						image: "./static/icons/14.png",
						title: "CARD 14"
					},
					{
						image: "./static/icons/15.png",
						title: "CARD 15"
					},
					{
						image: "./static/icons/16.png",
						title: "CARD 16"
					},
					{
						image: "./static/icons/17.png",
						title: "CARD 17"
					},
					{
						image: "./static/icons/18.png",
						title: "CARD 18"
					},
					{
						image: "./static/icons/19.png",
						title: "CARD 19"
					}
				],
				isLoading: false,
				hasMoreData: true,
				page: 1,
				pageSize: 3
			};
		},
		methods: {
			onSwiperChange(e) {
				this.currentIndex = e.detail.current;
			},
			handleItemClick(item) {
				this.$emit('item-click', item);
			},
			handleCardClick(cardType) {
				this.$emit("card-click", cardType);
			},
			loadMore() {
				if (this.isLoading || !this.hasMoreData) return;
				this.isLoading = true;
				setTimeout(() => {
					const start = (this.page - 1) * this.pageSize;
					const end = start + this.pageSize;
					const newData = this.moreData.slice(start, end);
					if (newData.length > 0) {
						this.cardList = [...this.cardList, ...newData];
						this.page += 1;
					} else {
						this.hasMoreData = false;
					}
					this.isLoading = false;
				}, 800);
			},
			getImgUrl(index, key) {
				if (this.errorImgMap[`${index}-${key}`]) {
					return this.defaultImages.small;
				}
				const item = this.FeaturedGameList[index] || {};
				const rawUrl = item[key] || '';
				if (!rawUrl || rawUrl.trim() === '' || rawUrl.includes('undefined') || rawUrl.includes('null')) {
					return this.defaultImages.small;
				}
				return rawUrl;
			},
			setErrorImg(index, key) {
				this.errorImgMap[`${index}-${key}`] = true;
				this.$forceUpdate();
				console.warn(`图片加载失败，已替换为默认图: 索引${index}-${key} -> ${this.defaultImages.small}`);
			},
			handleHeaderImgError() {
				this.headerImgSrc = this.defaultImages.default;
				console.warn('头部标题图片加载失败，已替换为默认图');
			}
		},
	};
</script>

<style scoped>
	/* 全局基础重置 */
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	/* 容器样式 */
	.game-swiper-container {
		border-radius: 1.25rem;
		box-shadow: 0 0.25rem 1rem rgba(0, 0, 0, 0.08);
		max-width: 1400px;
		margin: 1rem auto;
		padding: 1rem 1.5rem 2.5rem;
		background-color: #ffffff;
		overflow: hidden;
	}

	/* 头部区域 */
	.header-inner {
		padding: 0.5rem 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f5f5f5;
		margin-bottom: 1.5rem;
	}

	.text_Img_Hottest_Category {
		width: 8rem;
		height: auto;
		transition: all 0.3s ease;
	}

	.text_Img_Hottest_Category:hover {
		transform: scale(1.02);
	}

	.bi-chevron {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.bi-chevron-Highlight {
		font-size: 1.1rem;
		color: #ecd370;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.bi-chevron-Highlight:hover {
		color: #d9b830;
		transform: scale(1.1);
	}

	.bi-chevron-lowDark {
		font-size: 1.1rem;
		color: #d0d0d0;
		cursor: not-allowed;
	}

	/* 核心修复：卡片容器 - 改用grid布局，彻底解决尺寸不一致 */
	.card-container {
		display: grid;
		/* 自动适配列数，固定列宽，间距1.5rem */
		grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
		gap: 1.5rem;
		justify-items: center; /* 卡片水平居中 */
		padding: 0.5rem 0;
	}

	/* 卡片样式 - 完全固定尺寸，移除弹性拉伸 */
	.card-item {
		width: 8rem; /* 固定宽度，彻底解决拉伸问题 */
		text-align: center;
		border-radius: 1rem;
		overflow: hidden;
		background-color: #fafafa;
		box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.05);
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		cursor: pointer;
		position: relative;
	}

	/* 卡片悬浮效果 */
	.card-item:hover {
		transform: translateY(-0.25rem);
		box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
	}

	/* 图片容器 - 固定尺寸 */
	.card-img-wrapper {
		width: 100%;
		height: 8rem; /* 图片区域固定高度 */
		overflow: hidden;
		background-color: #f0f0f0;
	}

	.card-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: all 0.4s ease;
	}

	.card-item:hover .card-img {
		transform: scale(1.05);
	}

	/* 卡片标题 */
	.card-title {
		color: #333333;
		background: linear-gradient(to bottom, #f8f8f8, #f0f0f0);
		padding: 0.6rem 0.5rem;
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 3rem; /* 标题区域固定高度，和图片区凑满卡片高度 */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 加载更多按钮 */
	.load-more-btn {
		display: block;
		margin: 2rem auto 0.5rem;
		padding: 0.75rem 2.5rem;
		background: linear-gradient(to right, #42b983, #359469);
		color: white;
		border: none;
		border-radius: 2rem;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 500;
		transition: all 0.3s ease;
		box-shadow: 0 0.25rem 0.75rem rgba(66, 185, 131, 0.2);
		position: relative;
		overflow: hidden;
	}

	.load-more-btn:not(:disabled):hover {
		background: linear-gradient(to right, #359469, #287d54);
		transform: translateY(-0.15rem);
		box-shadow: 0 0.4rem 1rem rgba(66, 185, 131, 0.3);
	}

	.load-more-btn:not(:disabled):active {
		transform: translateY(0.05rem);
		box-shadow: 0 0.15rem 0.5rem rgba(66, 185, 131, 0.2);
	}

	.load-more-btn:disabled {
		background: linear-gradient(to right, #cccccc, #b3b3b3);
		cursor: not-allowed;
		opacity: 0.8;
		transform: none;
		box-shadow: none;
	}

	/* 响应式适配 */
	@media (max-width: 768px) {
		.game-swiper-container {
			padding: 0.75rem 1rem 2rem;
			margin: 0.5rem;
		}

		.card-container {
			grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
			gap: 1rem;
		}

		.card-item {
			width: 7rem;
			height: 10rem;
		}

		.card-img-wrapper {
			height: 7rem;
		}

		.card-title {
			height: 3rem;
			font-size: 0.7rem;
		}

		.load-more-btn {
			padding: 0.65rem 2rem;
			font-size: 0.85rem;
		}
	}

	@media (max-width: 480px) {
		.card-container {
			grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
		}

		.card-item {
			width: 6rem;
			height: 9rem;
		}

		.card-img-wrapper {
			height: 6rem;
		}

		.card-title {
			height: 3rem;
			font-size: 0.65rem;
		}

		.bi-chevron {
			gap: 0.5rem;
		}

		.bi-chevron-Highlight,
		.bi-chevron-lowDark {
			font-size: 1rem;
		}
	}

	/* 保留原有未使用样式，避免功能异常 */
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
	.right-top-cards {
		flex: 1;
		display: flex;
		gap: 0.8rem;
		min-height: 0;
		justify-content: space-evenly;
	}

	.right-bottom-card {
		flex: 1;
		border-radius: 0.8rem;
		overflow: hidden;
		cursor: pointer;
		transition: transform 0.2s ease;
		position: relative;
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