<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div :class="[$style.header, 'general-background-color']">
				<div :class="$style.contents">
					<div :class="$style.logo" @click="goHomepage()">
						<img :src="require('@/assets/img/logo_black.png')">
					</div>
					<div :class="$style.menu">
						<span>영화</span>
						<span>게시판</span>
						<router-link :to="getRandomMovie()">
							랜덤영화
						</router-link>
					</div>
					<div :class="$style.member">
						<span v-if="isLoggedIn()" @click="goLoginPage()">로그인</span>
						<span v-else>로그아웃</span>
						<!-- <span>테마변경</span> -->
					</div>
				</div>
			</div>
			<div :class="$style.main">
				<router-view/>
			</div>
			<div :class="$style.footer">
			
			</div>
		</div>
	</div>
</template>


<style lang="scss">
@import '@/assets/scss/theme.scss';

body {
	margin: 0;
	padding: 0;
}

* {
	box-sizing: border-box;
}
</style>

<style lang="scss" module>
.index {
	> .container {
		width: 100%;

		> .header {

			> .contents {
				max-width: 1200px;
				height: 100%;

				display: flex;
				align-items: center;

				padding: 10px 0px 10px 0px;
				margin: 0 auto;

				> .logo {
					margin-left: 20px;

					cursor: pointer;

					> img {
						height: 36px;
					}
				}

				> .menu {
					width: 100%;

					font-size: 20px;

					margin-left: 50px;

					> span {
						display: inline-block;

						padding-right: 30px;

						font-weight: bold;
					}
				}

				> .member {
					width: 100px;

					font-size: 15px;

					margin-right: 20px;

					> span {
						cursor: pointer;
					}

					> span:hover {
						font-weight: bold;

						text-decoration: underline;
					}

					> a {						
						text-decoration: none;
					}
				}
			}
		}
	}
}
</style>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';


@Component
export default class App extends Vue {

	goHomepage() {
		this.$router.push("/")
	}

	goLoginPage() {
		this.$router.push("/login")
	}

	isLoggedIn() {
		return true
	}

	getRandomMovie(): string {
		return "/"
	}

	@Watch("$route.path")
	routeUpdateHandler() {
		if (this.$store.state.token != null) {
			switch (this.$route.path) {
				case "/register":	
				case "/login":	
					alert("이미 로그인 했습니다.")
					this.$router.push("main")
					break;
			}
			return
		}

		switch (this.$route.path) {
			case "/write":
				alert("로그인이 필요합니다.")
				this.$router.push("/login")
		}
	}
}
</script>
