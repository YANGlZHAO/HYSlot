<template>
	<div class="expanding-menu-wrapper">
		<!-- 触发按钮 -->
		<div @click="toggleMenu" class="trigger-btn">
			<slot name="trigger">
				<div class="mob-toggle">
					<div class="toggle-cover"><span></span><span></span><span></span><span></span><span></span></div>
				</div>
			</slot>
		</div>

		<!-- 扩散菜单 -->
		<transition name="expand">
			<div v-if="show" class="menu-overlay">
				<div class="menu-content">
					<div class="slide-banner">
						<div class="pg-logo"><img
								src="https://www.pgsoft.com/_nuxt/img/nav_common_logo_black@2x.b4708a2.png"></div>
						<div class="close-btn" @click="hideMenu()">
							<div class="btn-bg"></div>
							<div class="btn-cover"><span></span><span></span></div>
						</div>
					</div>
					<slot>
						<!-- 默认菜单内容 -->
						<div class="menu-item" v-for="item in items" :key="item.value" @click="onSelect(item)">
							{{ item.label }}
						</div>
					</slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: "ExpandingMenu",
		props: {
			items: {
				type: Array,
				default: () => []
			},
			value: [String, Number, Object],
			buttonLabel: {
				type: String,
				default: "打开菜单"
			}
		},
		data() {
			return {
				show: false
			};
		},
		methods: {
			toggleMenu() {
				this.show = !this.show;

				if (this.show) {
					// 禁用底层页面的滚动
					document.body.style.overflow = 'hidden';
				} else {
					// 恢复底层页面的滚动
					document.body.style.overflow = '';
				}
			},
			hideMenu() {
				this.show = false;
				document.body.style.overflow = ''; // 恢复底层页面的滚动
			},
			onSelect(item) {
				this.$emit("input", item.value);
				this.$emit("select", item);
			}
		}


	};
</script>

<style scoped>
	.expanding-menu-wrapper {
		position: relative;
		display: inline-block;
		z-index: 50;
	}

	/* 触发按钮 */
	.trigger-btn {
		cursor: pointer;
	}

	.mob-toggle {
		display: block;
		width: 40px;
		height: 40px;
		cursor: pointer;
		box-sizing: border-box;
		padding: 12px 10px;
	}

	.toggle-cover {
		display: block;
		position: relative;
		width: 20px;
		height: 16px;
	}

	.toggle-cover span {
		display: block;
		position: absolute;
		background: #000;
		transition: all .4s ease;
		opacity: 1;
	}

	.toggle-cover span {
		background: #fff !important;
	}

	.toggle-cover span:first-child {
		display: none;
		width: 2px;
		height: 2px;
		top: 0;
		left: 0;
	}

	.default-btn {
		border-radius: 4px;
		border: 1px solid #ccc;
		background: #fff;
	}

	/* 扩散背景遮罩 */
	.menu-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(255, 255, 255, 0.8);
		/* 半透明遮罩 */
		z-index: 100;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		overflow: hidden;
		/* 禁止遮罩层本身滚动 */
	}

	/* 菜单内容 */
	.menu-content {
		background: blue;
		border-radius: 12px;
		transform-origin: top right;
		width: 100%;
		max-height: 100%;
		/* 确保菜单不会超出屏幕 */
		overflow-y: auto;
		/* 使菜单内容可以滚动 */
		position: relative;
		/* 使内容滚动生效 */
	}

	/* 滚动条样式 (可选) */
	.menu-content::-webkit-scrollbar {
		width: 6px;
	}

	.menu-content::-webkit-scrollbar-thumb {
		background: #aaa;
		border-radius: 10px;
	}

	/* 默认菜单项 */
	.menu-item {
		padding: 10px;
		border-bottom: 1px solid #eee;
		cursor: pointer;
	}

	.menu-item:last-child {
		border-bottom: none;
	}

	/* 扩散动画 */
	.expand-enter-active {
		animation: expand-in 1s ease forwards;
	}

	.expand-leave-active {
		animation: expand-out 1s ease forwards;
	}

	@keyframes expand-in {
		0% {
			transform: scale(0) translate(100%, -100%);
			opacity: 0;
		}

		60% {
			transform: scale(1.05) translate(0, 0);
			opacity: 1;
		}

		100% {
			transform: scale(1) translate(0, 0);
			opacity: 1;
		}
	}

	@keyframes expand-out {
		0% {
			transform: scale(1) translate(0, 0);
			opacity: 1;
		}

		100% {
			transform: scale(1) translate(100%, -100%);
			opacity: 0;
		}
	}


	.slide-banner {
		display: block;
		position: relative;
		width: 100%;
		height: 80px;
		padding: 25px 40px;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		overflow: hidden;
		z-index: 1;
	}

	.pg-logo {
		display: block;
		float: left;
		width: 120px;
		height: 31px;
		transition: all .5s ease;
		transition-delay: 0s;
	}

	.pg-logo img {
		display: block;
		width: 100%;
	}

	.close-btn {
		display: block;
		position: relative;
		float: right;
		width: 30px;
		height: 30px;
		cursor: pointer;
	}

	.close-btn .btn-bg {
		display: block;
		position: absolute;
		width: 0;
		height: 0;
		top: 50%;
		left: 50%;
		border-radius: 50%;
		background: #ff2d55;
		transition: all .5s ease;
		transition-delay: 0s;
	}

	.btn-bg {
		transition-delay: .5s !important;
		width: 30px !important;
		height: 30px !important;
		top: calc(50% - 15px) !important;
		left: calc(50% - 15px) !important;
	}

	.btn-cover {
		display: block;
		position: absolute;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: all .5s ease;
		transition-delay: 0s;
	}

	.btn-cover {
		transition-delay: .5s !important;
		opacity: 1 !important;
	}

	.btn-cover span:first-child {
		transform: rotate(42deg);
		top: 14px;
		left: 6px;
	}

	.btn-cover span {
		display: block;
		position: absolute;
		width: 18px;
		height: 2px;
		background: #fff;
	}

	.btn-cover span:nth-child(2) {
		transform: rotate(-42deg);
		top: 14px;
		left: 6px;
	}

	.toggle-cover span:first-child {
		display: none;
		width: 2px;
		height: 2px;
		top: 0;
		left: 0;
	}

	.toggle-cover span:nth-child(2) {
		width: 20px;
		height: 2px;
		top: 0;
		right: 0;
	}

	.toggle-cover span:nth-child(3) {
		width: 20px;
		height: 2px;
		top: 7px;
		left: 0;
	}

	.toggle-cover span:nth-child(4) {
		display: none;
		width: 2px;
		height: 2px;
		top: 7px;
		right: 0;
	}

	.toggle-cover span:nth-child(5) {
		width: 20px;
		height: 2px;
		bottom: 0;
		right: 0;
	}
</style>