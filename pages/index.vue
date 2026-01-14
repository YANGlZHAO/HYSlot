<template>
	<div class="home">

		<!-- 1. 顶部 Banner -->
		<section class="banner">
			<MyCarousel :images="imageList" />
		</section>

		<!-- 顶部固定区域 -->
		<div class="top-fixed">
			<div class="top-header big" :class="{ hide: !showBigHeader }">
				<div class="header-inner">
					<img class="left-img" src="https://www.pgsoft.com/_nuxt/img/nav_common_logo_white@2x.0a1ef47.png" />
					<AnimatedDropdown v-model="selectedValue" :items="options" button-label="选择分类"
						@select="onSelectItem" />
				</div>
			</div>



			<div class="top-header small" :class="{ show: showSmallHeader }">
				<div class="header-inner">
					<img class="left-img" src="https://www.pgsoft.com/_nuxt/img/nav_common_logo_white@2x.0a1ef47.png" />
					<img class="right-img"
						src="https://www.pgsoft.com/_nuxt/img/nav_common_logo_white@2x.0a1ef47.png" />
				</div>
			</div>

		</div>



		<div class="page-content" :style="{ marginTop: bannerHeight + 'px' }">
			<!-- 2. 底部主导航 -->
			<TopNavBar v-model="activeIndex" :list="navList" @change="onNavChange" />

			<!-- 3. Hot Game（大卡轮播） -->
			<section class="hot-game">
				<div class="section-header">
					<span>HOT GAME</span>
					<div class="arrow">
						<i>&lt;</i>
						<i>&gt;</i>
					</div>
				</div>

				<div class="hot-banner">
					<img src="/static/logo.png" alt="hot" />
					<div class="hot-info">
						<h3>IRON MAN</h3>
						<p>HY SOFT has just launched their very first...</p>
						<button>View</button>
					</div>
				</div>


			</section>

			<!-- 4. Hot Game（卡片区） -->
			<section class="hot-cards">
				<div class="card music-card">
					<h4>Music</h4>
					<p>Music makes everything better</p>
				</div>

				<div class="card game-card" v-for="i in 5" :key="i">
					<img src="/static/logo.png" alt="game" />
				</div>
			</section>

			<!-- 5. Hottest Category -->
			<section class="category">
				<div class="section-header">
					<span>Hottest Category</span>
					<div class="arrow">
						<i>&lt;</i>
						<i>&gt;</i>
					</div>
				</div>

				<div class="category-list">
					<div class="category-item" v-for="i in 3" :key="i">
						<img src="/static/logo.png" />
					</div>
				</div>

				<div class="load-more">Load More</div>
			</section>

			<!-- 6. Footer -->
			<footer class="footer">
				<div class="footer-cols">
					<div class="col">
						<h5>HY WEB MAP</h5>
						<p>Home</p>
						<p>Games</p>
						<p>News</p>
					</div>

					<div class="col">
						<h5>ABOUT US</h5>
						<p>Licensing</p>
						<p>Certification</p>
						<p>Privacy Policy</p>
					</div>

					<div class="col">
						<h5>EVENTS</h5>
						<p>Exhibitions</p>
					</div>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
	import NavBarVue from '@/component/NavBar.vue'
	import MyCarousel from "@/component/MyCarousel.vue"
	import AnimatedDropdown from "@/component/AnimatedDropdown.vue"
	import TopNavBar from "@/component/TopNavBar.vue";
	import {
		getFcSwiperList,
		getFcPGList,
		applicationJumpLink
	} from '@/api/jsonbin.js';

	import {
		getClientGetThirdApp,
		getClientGetBanners,
		getClientGetPlatformList
	} from '@/api/home.js';
	export default {
		name: 'Home',
		components: {
			NavBarVue,
			MyCarousel,
			AnimatedDropdown,
			TopNavBar
		},
		data() {
			return {
				imageList: [],
				data: [],
				applicationJumpLinkList: [],
				bannerHeight: 0,
				lastScrollTop: 0,
				hideHeaderA: false,
				showHeaderB: false,
				showBigHeader: true,
				showSmallHeader: false,
				options: [{
						value: 1,
						label: "文章"
					},
					{
						value: 2,
						label: "图片"
					},
					{
						value: 3,
						label: "视频"
					}, {
						value: 4,
						label: "文章"
					},
					{
						value: 5,
						label: "图片"
					},
					{
						value: 6,
						label: "视频"
					}, {
						value: 7,
						label: "文章"
					},
					{
						value: 8,
						label: "图片"
					},
					{
						value: 9,
						label: "视频"
					}, {
						value: 10,
						label: "文章"
					},
					{
						value: 11,
						label: "图片"
					},
					{
						value: 12,
						label: "视频"
					}, {
						value: 13,
						label: "文章"
					},
					{
						value: 14,
						label: "图片"
					},
					{
						value: 15,
						label: "视频"
					}, {
						value: 16,
						label: "文章"
					},
					{
						value: 17,
						label: "图片"
					},
					{
						value: 18,
						label: "视频"
					}
				],
				selectedValue: null,
				activeIndex: 0,
				navList: [{
						label: 'GAMES HOME',
						icon: 'https://www.pgsoft.com/_nuxt/img/Icon20_HomePage.facb932.svg',
						activeIcon: 'https://www.pgsoft.com/_nuxt/img/Icon20_HomePage.facb932.svg'
					},
					{
						label: 'TIMELINE',
						icon: 'https://www.pgsoft.com/_nuxt/img/Icon20_TimeLinePage.5d075c0.svg',
						activeIcon: 'https://www.pgsoft.com/_nuxt/img/Icon20_TimeLinePage.5d075c0.svg'
					},
					{
						label: 'ALL GAMES',
						icon: 'https://www.pgsoft.com/_nuxt/img/Icon20_AllGame.a302cd6.svg',
						activeIcon: 'https://www.pgsoft.com/_nuxt/img/Icon20_AllGame.a302cd6.svg'
					},
					{
						label: 'SEARCH',
						icon: 'https://www.pgsoft.com/_nuxt/img/Icon20_Search.21bc271.svg',
						activeIcon: 'https://www.pgsoft.com/_nuxt/img/Icon20_Search.21bc271.svg'
					}
				]
			}
		},
		mounted() {
			this.updateBannerHeight();
			// 屏幕尺寸变化（旋转 / 拉伸）
			uni.onWindowResize(() => {
				this.updateBannerHeight();
			});

			if (typeof plus !== 'undefined') {
				plus.navigator.setFullscreen(true)
			} else {
				document.addEventListener('plusready', () => {
					plus.navigator.setFullscreen(true)
				})
			}

			try {
				getClientGetBanners().then(data => {
					if (data.code == this.$config.code) {
						this.imageList = data.data.list;

						this.imageList = [{
							"ID": 42,
							"title": "Carousel1",
							"imageUrl": "https://www.pgsoft.com/uploads/Games/Images/3dbcc281-5cb1-492c-b558-9d1055c342b1.png",
							"link": "",
							"position": "banner"
						}, {
							"ID": 43,
							"title": "Carousel2",
							"imageUrl": "https://www.pgsoft.com/uploads/Games/Images/11ec748d-606c-4a51-b254-8c3d271d18c5.png",
							"link": "",
							"position": "banner"
						}, {
							"ID": 44,
							"title": "Carousel3",
							"imageUrl": "https://www.pgsoft.com/uploads/Games/Images/fb4ae41a-c440-4ec9-9228-c678be3e737f.webp",
							"link": "",
							"position": "banner"
						}, {
							"ID": 44,
							"title": "Carousel3",
							"imageUrl": "https://www.pgsoft.com/uploads/Games/Images/29e82f3a-8359-4840-86b7-4fc31a6de12a.png",
							"link": "",
							"position": "banner"
						}, {
							"ID": 44,
							"title": "Carousel3",
							"imageUrl": "https://www.pgsoft.com/uploads/Games/Images/ad492a63-4887-4397-bfde-ad1f8e141b88.png",
							"link": "",
							"position": "banner"
						}, {
							"ID": 44,
							"title": "Carousel3",
							"imageUrl": "https://www.pgsoft.com/uploads/Games/Images/3dde7e1b-7507-459e-87d2-150960f69150.png",
							"link": "",
							"position": "banner"
						}]
					}
				})

				getClientGetThirdApp().then(data => {
					if (data.code == this.$config.code) {
						this.applicationJumpLinkList = data.data.list;
					}
				})

				const postData = {
					"page": 1,
					"pageSize": 1000
				}
				getClientGetPlatformList(postData).then(data => {
					if (data.code == this.$config.code) {
						this.data = this.transformData(data.data.list);
					}
				})

			} catch (err) {
				console.error("err：", err);
			}

		},

		methods: {
			onSelect(item) {
				console.log("选中了", item);
			},
			onSelectItem(item) {
				this.selectedValue = item.value; // 更新 v-model
				this.onSelect(item); // 调用 select 回调
			},
			updateBannerHeight() {
				this.$nextTick(() => {
					const query = uni.createSelectorQuery().in(this);
					query
						.select('.banner')
						.boundingClientRect(rect => {
							if (rect) {
								this.bannerHeight = rect.height;
							}
						})
						.exec();
				});
			},

			onPageScroll(e) {
				const scrollTop = e.scrollTop;

				// ✅ 回到顶部
				if (scrollTop <= 0) {
					this.showBigHeader = true;
					this.showSmallHeader = false;
					return;
				}

				// ✅ 只要离开顶部
				this.showBigHeader = false;
				this.showSmallHeader = true;
			},



			transformData(data) {
				return data.map(item => {
					const {
						imageUrl,
						...rest
					} = item;
					return {
						...rest,
						image: imageUrl,
						isStarred: false
					};
				});
			},

			onNavChange(item, index) {
				console.log(item, index);
			}

		}
	}
</script>


<style scoped>
	.home {
		position: relative;
		z-index: 10;
		background-color: #000;
		color: #fff;
		min-height: 100vh;
	}

	.banner {
		background-color: #000;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 1;
	}

	/* 顶部固定容器 */
	.top-fixed {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 20;
	}

	.top-header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 2.5rem;
		display: flex;
		align-items: center;
		transition:
			transform 0.55s cubic-bezier(0.4, 0, 0.2, 1),
			opacity 0.45s ease;
		will-change: transform, opacity;
		z-index: 20;
		background: linear-gradient(180deg, rgba(0, 0, 0, .5) 20%, transparent);
	}

	.header-inner {
		width: 100%;
		padding: 0.2rem 0.8rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.left-img,
	.right-img {
		height: 1rem;
		width: auto;
		object-fit: contain;
	}




	/* BIG */
	.big {
		transition-duration: 0.65s;
		transform: translateY(0);
		opacity: 1;
	}

	.big.hide {
		transition-duration: 0.45s;
		transform: translateY(-100%);
		opacity: 0;
	}


	/* SMALL */
	.small {
		transform: translateY(-100%);
		opacity: 0;
	}

	.small.show {
		transform: translateY(0);
		opacity: 1;
	}




	.page-content {
		position: relative;
		z-index: 10;
		background: #000;
		min-height: 100vh;
	}


	/* Banner */
	.banner-img {
		width: 100%;
		display: block;
	}

	/* 主导航 */
	.main-nav {
		display: flex;
		justify-content: space-around;
		background: #111;
		padding: 10px 0;
	}

	.nav-item {
		color: #888;
		font-size: 0.7rem;
	}

	.nav-item.active {
		color: #d6a54c;
	}

	/* 通用标题 */
	.section-header {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem;
		font-weight: bold;
		font-size: 1rem;
	}

	/* Hot Game */
	.hot-banner {
		margin: 0.5rem;
		background: #1a1a1a;
		border-radius: 0.2rem;
		overflow: hidden;
	}

	.hot-banner img {
		width: 100%;
	}

	.hot-info {
		padding: 0.3rem;
		font-size: 1rem;
	}

	.hot-info button {
		background: #d6a54c;
		border: none;
		padding: 6px 12px;
		border-radius: 4px;
	}

	/* 卡片区 */
	.hot-cards {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 10px;
		padding: 12px;
	}

	.card {
		background: #1a1a1a;
		border-radius: 8px;
		padding: 10px;
	}

	.card img {
		width: 100%;
	}

	/* 分类 */
	.category-list {
		display: flex;
		gap: 10px;
		padding: 12px;
	}

	.category-item img {
		width: 100%;
		border-radius: 8px;
	}

	.load-more {
		text-align: center;
		color: #999;
		padding: 10px;
	}

	/* Footer */
	.footer {
		background: #111;
		padding: 20px;
		margin-top: 20px;
	}

	.footer-cols {
		display: flex;
		justify-content: space-between;
	}

	.col h5 {
		color: #d6a54c;
		margin-bottom: 8px;
	}

	.col p {
		font-size: 12px;
		color: #888;
	}
</style>