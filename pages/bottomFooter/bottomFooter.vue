<template>
	<view class="container">
		<view class="header">
			<img :src="headerImgSrc" class="header-logo" @error="handleHeaderImageError('headerImgSrc', 'default')" />
		</view>

		<view class="main-content">
			<view class="nav-modules">
				<view class="nav-module" v-for="(module, index) in navModules" :key="index">
					<text class="module-title">{{ module.title }}</text>
					<view class="module-list">
						<view class="list-item" v-for="(item, itemIndex) in module.items" :key="itemIndex">
							<a :href="item.link" class="link-item">{{ item.label }}</a>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'PGFooterNav',
		data() {
			return {
				headerImgSrc: 'https://www.pgsoft.com/_nuxt/img/nav_common_logo_white@2x.0a1ef47.png',
				navModules: [{
						"title": "HY WEB MAP",
						"items": [{
								"label": "Home",
								"link": "#"
							},
							{
								"label": "Games",
								"link": "#"
							},
							{
								"label": "News",
								"link": "#"
							},
							{
								"label": "Math",
								"link": "#"
							},
							{
								"label": "Company",
								"link": "#"
							},
							{
								"label": "Events",
								"link": "#"
							},
							{
								"label": "Partners",
								"link": "#"
							}
						]
					},
					{
						"title": "ABOUT US",
						"items": [{
								"label": "Licensing",
								"link": "#"
							},
							{
								"label": "Certification",
								"link": "#"
							},
							{
								"label": "Responsible Gaming",
								"link": "#"
							},
							{
								"label": "Exhibitions",
								"link": "#"
							},
							{
								"label": "Copyright Protection",
								"link": "#"
							},
							{
								"label": "Privacy Policy",
								"link": "#"
							}
						]
					},
					{
						"title": "OUR PARTNERS",
						"items": [{
								"label": "Licensing",
								"link": "#"
							},
							{
								"label": "Certification",
								"link": "#"
							}
						]
					},
					{
						"title": "EVENTS",
						"items": [{
								"label": "Licensing",
								"link": "#"
							},
							{
								"label": "Certification",
								"link": "#"
							},
							{
								"label": "Responsible Gaming",
								"link": "#"
							},
							{
								"label": "Exhibitions",
								"link": "#"
							}
						]
					}
				]
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
	.container {
		padding: 1.5rem;
		font-family: Arial, sans-serif;
		color: #333;
		max-width: 1200px;
		margin: 0 auto;
	}

	.header {
		margin-bottom: 0.5rem;
	}

	.header-logo {
		width: 5rem;
		height: auto;
		object-fit: contain;
	}

	.nav-modules {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 1rem;
	}

	.nav-module {
		background-color: #000;
		border-radius: 6px;
	}

	.module-title {
		font-size: 0.6rem;
		text-transform: uppercase;
		color: #dbb355;
		margin: 0 0 0.5rem 0;
		font-weight: 600;
		border-bottom: 0.05rem solid #eee;
		padding-bottom: 0.2rem;
		display: block;
	}

	.module-list {
		padding: 0;
		margin: 0;
	}

	.list-item {
		font-size: 0.5rem;
	}

	.link-item {
		text-decoration: none;
		color: #666;
		display: block;
		padding: 0.2rem 0;
		transition: color 0.2s ease;
	}

	.link-item:hover {
		color: #fff;
	}

	.list-item:last-child {
		margin-bottom: 0;
	}

	/* 响应式适配 */
	@media (max-width: 360px) {
		.nav-modules {
			grid-template-columns: 1fr;
		}
	}
</style>