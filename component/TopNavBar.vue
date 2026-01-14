<template>
	<div class="top-nav">
		<div class="nav-list" ref="navList">
			<div class="nav-item" v-for="(item, index) in list" :key="index" :class="{ active: index === currentIndex }"
				@click="handleClick(index, item)" ref="navItem">
				<!-- 图标 -->
				<div class="nav-icon" v-if="item.icon">
					<img :src="currentIndex === index ? item.activeIcon : item.icon" alt="icon" />
				</div>

				<!-- 文本 -->
				<div class="nav-label">{{ item.label }}</div>
			</div>

			<!-- 底部横条 -->
			<div class="nav-indicator" :style="indicatorStyle"></div>
		</div>
	</div>
</template>



<script>
	export default {
		name: "TopNavBar",
		props: {
			value: {
				type: Number,
				default: 0
			},
			list: {
				type: Array,
				default: () => []
			},
			indicatorHeight: {
				type: Number,
				default: 0.1 // rem 单位
			}
		},
		data() {
			return {
				currentIndex: this.value,
				indicatorLeft: 0,
				indicatorWidth: 0
			};
		},
		computed: {
			indicatorStyle() {
				// 把 px 转为 rem
				const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
				return {
					width: (this.indicatorWidth / rootFontSize) + "rem",
					height: this.indicatorHeight + "rem",
					transform: `translateX(${this.indicatorLeft / rootFontSize}rem)`
				};
			}
		},
		watch: {
			value(val) {
				this.currentIndex = val;
				this.$nextTick(this.updateIndicator);
			}
		},
		mounted() {
			this.$nextTick(this.updateIndicator);
			window.addEventListener("resize", this.updateIndicator);
		},
		beforeDestroy() {
			window.removeEventListener("resize", this.updateIndicator);
		},
		methods: {
			handleClick(index, item) {
				if (index === this.currentIndex) return;
				this.currentIndex = index;
				this.$emit("input", index);
				this.$emit("change", item, index);
				this.$nextTick(this.updateIndicator);
			},
			updateIndicator() {
				const items = this.$refs.navItem;
				if (!items || !items[this.currentIndex]) return;

				const el = items[this.currentIndex];
				const parent = this.$refs.navList;
				const parentRect = parent.getBoundingClientRect();
				const rect = el.getBoundingClientRect();

				this.indicatorWidth = rect.width;
				this.indicatorLeft = rect.left - parentRect.left;

				// 自动滚动到中心
				const scrollLeft = parent.scrollLeft;
				const centerOffset = rect.left - parentRect.left + rect.width / 2 - parentRect.width / 2;
				parent.scrollTo({
					left: scrollLeft + centerOffset,
					behavior: 'smooth'
				});
			}
		}
	};
</script>

<style scoped>
	.top-nav {
		width: 100%;
		border-bottom: 0.06rem solid #eee;
	}

	.nav-list {
		display: flex;
		justify-content: center;
		overflow-x: auto;
		white-space: nowrap;
		position: relative;
	}

	.nav-list::-webkit-scrollbar {
		display: none;
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		/* 图标在上，文字在下 */
		align-items: center;
		padding: 0.5rem 1rem;
		cursor: pointer;
		color: #666;
		transition: color 0.3s;
		font-size: 0.6rem;
	}

	.nav-item.active {
		color: #f1d467;
		font-weight: 600;
	}

	/* 图标 */
	.nav-icon img {
		width: 1.2rem;
		/* 图标大小 */
		height: 1.2rem;
		margin-bottom: 0.2rem;
		/* 图标与文字间距 */
	}

	.nav-label {
		line-height: 1;
		/* 防止文字高度撑大 */
	}

	/* 图标 */
	.nav-icon img {
		width: 1.2rem;
		/* 图标大小 */
		height: 1.2rem;
		margin-bottom: 0.2rem;
		/* 图标与文字间距 */
	}

	.nav-label {
		line-height: 1;
		/* 防止文字高度撑大 */
	}

	/* 横条 */
	.nav-indicator {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 0.1rem;
		/* rem 单位 */
		background-color: #f1d467;
		transition: transform 0.3s ease, width 0.3s ease;
	}
</style>