<template>
	<div class="game-swiper-container">
		<!-- <div class="game-swiper-title">HOT GAME</div> -->


		<div class="header-inner">
			<img src="/static/textImg_hot_game.png" class="text_Img_hot_game" />
			<view v-if="gameList.length > 1" class="bi-chevron">
				<i class="bi bi-chevron-left"
					:class="currentIndex !== 0 ? 'bi-chevron-Highlight' : 'bi-chevron-lowDark'"></i>
				<i class="bi bi-chevron-right"
					:class="currentIndex !== gameList.length - 1 ? 'bi-chevron-Highlight' : 'bi-chevron-lowDark'"></i>
			</view>
		</div>

		<swiper :indicator-dots="false" :autoplay="false" :circular="false" :current="currentIndex"
			:previous-margin="'1.25rem'" :next-margin="'1.25rem'" class="game-swiper" @change="onSwiperChange">
			<swiper-item v-for="(item, index) in gameList" :key="index">
				<div class="game-item-wrapper">
					<div class="game-item" :class="{ active: currentIndex === index }" @click="handleItemClick(item)">
						<!-- 图片区域：调整为完整居中显示 -->
						<div class="game-item-img-wrapper">
							<img :src="item.image" class="game-item-img" />
							<div class="img-mask"></div>
						</div>
						<div class="game-item-info">
							<img :src="item.icon" class="game-item-icon" />
							<div class="game-item-text">
								<div class="game-item-name">{{ item.name }}</div>
								<div class="game-item-desc">{{ item.desc }}</div>
							</div>
							<button class="game-item-btn">View</button>
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
			gameList: {
				type: Array,
				required: true,
				validator: (val) => val.every(item =>
					item.image && item.icon && item.name
				)
			},
		},
		data() {
			return {
				currentIndex: 0,
			};
		},
		methods: {
			onSwiperChange(e) {
				this.currentIndex = e.detail.current;
			},
			handleItemClick(item) {
				console.log("点击游戏：", item.name);
			},
		},
	};
</script>

<style scoped>
	.game-swiper-container {
		/* padding: 0.5rem; */
		border-radius: 1rem;
		box-shadow: 0 0.1rem 0.75rem rgba(0, 0, 0, 0.05);
	}

	.header-inner {
		padding: 0.2rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.text_Img_hot_game {
		width: 5rem;
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

	.game-swiper-title {
		font-size: 1rem;
		font-weight: 700;
		margin-bottom: 1rem;
		color: #fff;
		padding-left: 0.25rem;
	}

	.game-swiper {
		height: 14.5rem;
	}

	/* 核心修改：调整uni-swiper-slides的inset值 */
	.game-swiper /deep/ .uni-swiper-slides {
		/* 自定义inset值，默认是0，可根据需求调整 */
		inset: 0 2rem !important;
		/* 上下0，左右0.5rem，可按需修改数值 */
	}

	/* 兼容不同版本的swiper样式名 */
	.game-swiper ::v-deep .uni-swiper-slides {
		inset: 0 2rem !important;
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
	}

	.game-item {
		width: 90%;
		background: #000;
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
		opacity: 0.7;
		cursor: pointer;
		overflow: hidden;
		max-width: 22rem;
	}

	.game-item.active {
		transform: scale(1.03);
		opacity: 1;
		box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.12);
	}

	.game-item:hover {
		transform: scale(1.03);
		opacity: 1;
		box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.12);
	}

	/* 核心调整：图片区域完整居中显示 */
	.game-item-img-wrapper {
		width: 100%;
		overflow: hidden;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		/* 补充图片容器高度，避免塌陷 */
		/* height: 10rem; */
		padding: 0.5rem 0;
	}

	.game-item-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		transition: none;
	}

	.game-item.active .game-item-img,
	.game-item:hover .game-item-img {
		transform: none;
	}

	/* 渐变遮罩：调整透明度，适配完整图片 */
	.img-mask {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 60%;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent);
		z-index: 1;
	}

	/* 信息区域优化 */
	.game-item-info {
		background-color: #000;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		/* 补充内边距，避免内容拥挤 */
		padding: 0.5rem;
	}

	.game-item-icon {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.5rem;
		flex-shrink: 0;
	}

	.game-item-text {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.game-item-name {
		font-size: 0.5rem;
		font-weight: 600;
		color: #edc15c;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.game-item-desc {
		font-size: 0.4rem;
		color: #666;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 0.25rem;
	}

	/* 按钮优化 */
	.game-item-btn {
		padding: 0.2rem 0.8rem;
		border: none;
		border-radius: 0.5rem;
		background: #edd16d;
		color: #000;
		font-size: 0.5rem;
		font-weight: 500;
		cursor: pointer;
		flex-shrink: 0;
		transition: all 0.3s ease;
	}

	.game-item-btn:hover {
		background: #005ecb;
		transform: translateY(-0.06rem);
	}
</style>