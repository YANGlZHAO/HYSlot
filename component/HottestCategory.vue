<template>
	<div class="game-swiper-container">
		<div class="header-inner">
			<!-- 头部图片错误处理：调用mixin的方法 -->
			<img :src="headerImgSrc" class="text_Img_Hottest_Category"
				@error="handleHeaderImageError('headerImgSrc', 'default')" />
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
									<!-- 普通图片错误处理：传数组、索引、key、默认图类型 -->
									<img class="large-card-icon" :src="item.icon"
										@error="handleImageError(HottestCategoryList, index, 'icon', 'default')"></img>
									<div class="large-card-title">{{ item.title }}</div>
									<div class="large-card-desc">{{ item.desc }}</div>
								</div>
								<div class="left-bottom-cards">
									<div class="small-card" @click="handleCardClick('small3')">
										<img :src="item.image1" class="small-card-img"
											@error="handleImageError(HottestCategoryList, index, 'image1', 'small')" />
									</div>
									<div class="small-card" @click="handleCardClick('small4')">
										<img :src="item.image2" class="small-card-img"
											@error="handleImageError(HottestCategoryList, index, 'image2', 'small')" />
									</div>
								</div>
							</div>

							<div class="right-container">
								<div class="right-top-cards">
									<div class="small-card" @click="handleCardClick('small3')">
										<img :src="item.image3" class="small-card-img"
											@error="handleImageError(HottestCategoryList, index, 'image3', 'small')" />
									</div>
									<div class="small-card" @click="handleCardClick('small4')">
										<img :src="item.image4" class="small-card-img"
											@error="handleImageError(HottestCategoryList, index, 'image4', 'small')" />
									</div>
								</div>
								<div class="right-bottom-card" @click="handleCardClick('small4')">
									<img :src="item.bigImg" class="big-card-img"
										@error="handleImageError(HottestCategoryList, index, 'bigImg', 'big')" />
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
		data() {
			return {
				HottestCategoryList: [{
					icon: "https://www.pgsoft.com/_nuxt/img/Music_icon.87b8e70.svg",
					title: "Music",
					desc: "Music makes everything better, and these games will grove to it!",
					image1: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					image2: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					image3: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					image4: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					bigImg: "https://www.pgsoft.com/_nuxt/img/3D_Poker_en.07427ad.png"
				}, {
					icon: "https://www.pgsoft.com/_nuxt/img/Music_icon.87b8e70.svg",
					title: "Music",
					desc: "Music makes everything better, and these games will grove to it!",
					image1: "https://public.pg-demo.com/pages/static/image/n/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					image2: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					image3: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					image4: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					bigImg: "https://www.pgsoft.com/_nuxt/img/3D_Poker_en.07427ad.png"
				}, {
					icon: "https://www.pgsoft.com/_nuxt/img/Music_icon.87b8e70.svg",
					title: "Music",
					desc: "Music makes everything better, and these games will grove to it!",
					image1: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					image2: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					image3: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					image4: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					bigImg: "https://www.pgsoft.com/_nuxt/ig/3D_Poker_en.07427ad.png"
				}, {
					icon: "https://www.pgsoft.com/_nuxt/img/Music_icon.87b8e70.svg",
					title: "Music",
					desc: "Music makes everything better, and these games will grove to it!",
					image1: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					image2: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					image3: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					image4: "https://public.pg-demo.com/pages/static/image/en/Small_Icon/31/app_icon_small@3x-2100b24d.png",
					bigImg: "https://www.pgsoft.com/_nuxt/img/3D_Poker_en.07427ad.png"
				}],
				currentIndex: 0,
				// 头部图片初始地址
				headerImgSrc: '/static/textImg_Hottest_Category.png'
				// 默认图配置已在mixin中定义，如需自定义可在这里覆盖
				// defaultImages: { ... } 
			};
		},
		mounted() {
			// 可选：初始化检查无效图片地址（比如初始值为空/null的图片）
			this.initInvalidImages(this.HottestCategoryList, {
				icon: 'default',
				image1: 'small',
				image2: 'small',
				image3: 'small',
				image4: 'small',
				bigImg: 'big'
			});
		},
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
			}
		}
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