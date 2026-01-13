<template>
	<view class="my-carousel" :style="{ height: swiperHeight }">
		<u-swiper :list="formattedImages" keyName="imageUrl" :autoplay="true" :circular="true" :indicator="true"
			indicatorMode="dot" :height="swiperHeight" radius="1rem" bgColor="transparent" mode="none"
			@click="handleSwiperClick" />
	</view>
</template>

<script>
	export default {
		props: {
			images: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				swiperHeight: "0px"
			};
		},
		computed: {
			formattedImages() {
				return this.images.map(i => ({
					...i,
					imageUrl: i.imageUrl || ""
				}));
			}
		},
		mounted() {
			this.calcHeight();
			uni.onWindowResize(this.calcHeight);
		},
		methods: {
			calcHeight() {
				const screenWidth = uni.getSystemInfoSync().windowWidth;
				const ratio = 1200 / 480;

				const h = screenWidth / ratio;
				this.swiperHeight = Math.min(h, 480) + "px";
			},

			handleSwiperClick(index) {
				const url = this.formattedImages[index]?.link;
				if (url) {
					uni.navigateTo({
						url: "/pages/webview/webview?url=" + encodeURIComponent(url)
					});
				}
			}
		}
	};
</script>

<style scoped>
	.my-carousel {
		width: calc(100% - 6px);
		padding: 3px 0;
		margin: auto;
		overflow: hidden;
	}

	/* 关键裁剪样式 */
	::v-deep .u-swiper__item {
		height: 100%;
	}

	::v-deep .u-swiper__item__image {
		width: 100% !important;
		height: 100% !important;
		object-fit: cover !important;
	}
</style>