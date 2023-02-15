<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div :class="[$style.header]">
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
					<div :class="$style.search">
						<div :class="$style.input">
							<input @keydown="keydownHandler" type="text" placeholder="영화 제목을 입력하세요." v-model="searchQuery">
							<img :src="require('@/assets/img/search.png')" @click="search()">
						</div>
					</div>
					<div :class="$style.member">
						<span v-if="isLoggedIn()" v-on:click="logout()">로그아웃</span>
						<span v-else v-on:click="goLoginPage()">로그인</span>
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
		height: 100vh;

		background-image: url("@/assets/img/search_background2.jpg");
		background-size: 100%;

		> .header {

			border-bottom: 1px solid #141414;

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

				> .search {

					margin-right: 50px;

					> .input {
						display: flex;

						margin: 0 auto;
						
						> input {
							width: 300px;

							padding: 10px;

							font-size: 15px;

							border: none;
							border-radius: 7px;

							outline: none;
						}

						> img {
							width: 25px;
							height: 25px;

							margin-top: 7px;
							margin-left: 10px;

							cursor: pointer;
						}
					}
				}

				> .member {
					width: 150px;

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
	searchQuery: string = ""

	goHomepage() {
		if (this.$route.path != "/")
			this.$router.push("/")
	}

	goLoginPage() {
		if (this.$route.path != "/login")
			this.$router.push("/login")
	}

	isLoggedIn() {
		return this.$store.state.token != null
	}

	logout() {
		this.$store.state.token = null

		if (this.$route.path != "/") {
			this.$router.push("/")
		}
	}

	getRandomMovie(): string {
		return "/"
	}

	search() {
		this.$router.push("/search?query=" + this.searchQuery)
	}

	keydownHandler(e: KeyboardEvent) {
		if (e.key == "Enter") {
			this.search()
		}
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
