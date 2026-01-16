<template>
	<div class="game-swiper-container">
		<div class="header-inner">
			<img :src="headerImgSrc" class="text_Img_Hottest_Category"
				@error="handleHeaderImageError('headerImgSrc', 'default')" />
			<view v-if="FeaturedGameList.length > 1" class="bi-chevron">
				<i class="bi bi-chevron-left"
					:class="currentIndex !== 0 ? 'bi-chevron-Highlight' : 'bi-chevron-lowDark'"></i>
				<i class="bi bi-chevron-right"
					:class="currentIndex !== FeaturedGameList.length - 1 ? 'bi-chevron-Highlight' : 'bi-chevron-lowDark'"></i>
			</view>
		</div>
		<div class="card-container">
			<div class="card-item" v-for="(item, index) in FeaturedGameList" :key="index">
				<div class="card-img-wrapper">
					<img :src="item.image" class="card-img"
						@error="handleImageError(FeaturedGameList, index, 'image', 'small')" loading="lazy">
				</div>
				<p class="card-title">{{ item.title }}</p>
			</div>
		</div>
		<button class="load-more-btn" @click="loadMore" :disabled="isLoading || !hasMoreData">
			<!-- 文字 + 箭头图标 -->
			<span>{{ isLoading ? 'Loading...' : hasMoreData ? 'Load More' : 'No More Data' }}</span>
			<!-- 仅在“Load More”状态显示箭头（修正i标签语法） -->
			<i class="arrow-icon" v-if="!isLoading && hasMoreData"></i>
		</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				headerImgSrc: '/static/textImg_Hottest_Category.png',
				FeaturedGameList: [{
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
		mounted() {
			this.initInvalidImages(this.FeaturedGameList, {
				image: 'big'
			});
		},
		methods: {
			loadMore() {
				if (this.isLoading || !this.hasMoreData) return;
				this.isLoading = true;
				setTimeout(() => {
					const start = (this.page - 1) * this.pageSize;
					const end = start + this.pageSize;
					const newData = this.moreData.slice(start, end);
					if (newData.length > 0) {
						this.FeaturedGameList = [...this.FeaturedGameList, ...newData];
						// 对新加载的数据也做无效图片检查
						this.initInvalidImages(newData, {
							image: 'small'
						});
						this.page += 1;
					} else {
						this.hasMoreData = false;
					}
					this.isLoading = false;
				}, 800);
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

	/* 卡片容器 - grid布局 */
	.card-container {
		display: grid;
		/* 自动适配列数，固定列宽，间距1.5rem */
		grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
		gap: 1.5rem;
		justify-items: center;
		/* 卡片水平居中 */
		padding: 0.5rem 0;
	}

	/* 卡片样式 - 完全固定尺寸，移除弹性拉伸 */
	.card-item {
		width: 8rem;
		/* 固定宽度，彻底解决拉伸问题 */
		text-align: center;
		border-radius: 1rem;
		overflow: hidden;
		background-color: #000;
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
		height: 10rem;
		/* 补充固定高度，避免图片容器高度塌陷 */
		overflow: hidden;
		background-color: #000;
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
		color: #fff;
		background-color: #000;
		padding: 0.3rem 0.25rem;
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin: 0;
		white-space: nowrap;
		/* 强制文字单行显示 */
		overflow: hidden;
		/* 隐藏超出部分 */
		text-overflow: ellipsis;
		/* 超出显示省略号 */
		/* 优化居中+确保截断生效 */
		display: block;
		/* 改为block，避免flex影响截断（关键！） */
		text-align: center;
		/* 文字水平居中（替代flex居中） */
		line-height: 1.2;
		/* 行高适配，避免文字垂直偏移 */
		max-width: 100%;
		/* 限制最大宽度为父容器 */
	}
	
	

	/* 加载更多按钮 - 调整为弹性布局，让文字和箭头对齐 */
	.load-more-btn {
		display: flex;
		align-items: center;
		/* gap: 0.5rem; */
		/* 文字和箭头的间距 */
		/* 保留原按钮样式（背景、圆角等） */
		/* margin: 2rem auto 0.5rem; */
		padding: 0.25rem 1rem;
		background: linear-gradient(to right, #42b983, #359469);
		color: white;
		border: none;
		border-radius: 2rem;
		cursor: pointer;
		font-size: 0.8rem;
		font-weight: 500;
		transition: all 0.3s ease;
		box-shadow: 0 0.25rem 0.75rem rgba(66, 185, 131, 0.2);
		position: relative;
		overflow: hidden;
		flex-direction: column;
		line-height: 2;
	}

	/* 向下箭头样式（用CSS伪元素实现）*/
	.arrow-icon {
		width: 0;
		height: 0;
		border-left: 0.5rem solid transparent;
		border-right: 0.5rem solid transparent;
		border-top: 0.5rem solid white;
		/* 倒三角实现向下箭头 */
		transition: transform 0.2s ease;
	}

	/* 鼠标悬浮时箭头轻微下移，增强交互感 */
	.load-more-btn:not(:disabled):hover .arrow-icon {
		transform: translateY(1px);
	}

	/* 禁用状态下的按钮样式（保留）*/
	.load-more-btn:disabled {
		background: linear-gradient(to right, #cccccc, #b3b3b3);
		cursor: not-allowed;
		opacity: 0.8;
		transform: none;
		box-shadow: none;
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
		}

		.card-img-wrapper {
			height: 9rem;
		}

		.card-title {
			font-size: 0.7rem;
		}
	}

	@media (max-width: 480px) {
		.card-container {
			grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
		}

		.card-item {
			width: 6rem;
		}

		.card-img-wrapper {
			height: 8.5rem;
		}

		.card-title {
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
</style>