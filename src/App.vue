<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div :class="[$style.header, 'general-background-color']">
				<div :class="$style.contents">
					<div :class="$style.logo" @click="goHomepage()">
						<img :src="require('@/assets/img/logo_black.png')">
					</div>
					<div :class="$style.menu">
						<router-link to="/">
							<span>영화</span>
						</router-link>
						<router-link :to="'/'">
							<span>게시판</span>
						</router-link>
						<span @click="goRandomMoviePage()">
							랜덤영화
						</span>
					</div>
					<div :class="$style.search">
						<div :class="$style.input">
							<input @keydown="keydownHandler" type="text" placeholder="영화 제목을 입력하세요." v-model="searchQuery">
							<img :src="require('@/assets/img/search.png')" @click="updateSearchQuery()">
						</div>
					</div>
					<div :class="$style.member">
						<span v-if="isLoggedIn()" v-on:click="logout()">로그아웃</span>
						<span v-else v-on:click="goLoginPage()">로그인</span>
					</div>
				</div>
			</div>
			
			<div :class="$style.main">
				<router-view/>
			</div>

			<div :class="[$style.footer, 'general-background-color']">
				<div :class="$style.contents">
					<div :class="$style.logo">
						<img :src="require('@/assets/img/logo_black.png')">
					</div>
					<div :class="$style.info">
						<div :class="$style.copyright">	
							Copyright© 영화디비 All rights reserved.
						</div>
						<div :class="$style.by">
							영화 제목을 검색하시면 정보가 추가됩니다. (정확한 제목)
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss">
@import '@/assets/scss/theme.scss';

body {
	margin: 0;
	padding: 0;

	height: 100%;
}

* {
	box-sizing: border-box;
}
</style>

<style lang="scss" module>
.index {
	height: 100%;

	> .container {
		width: 100%;
		min-width: 950px;
		min-height: 100%;
		

		position: relative;

		> .header {
			width: 100%;
			
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

					margin-left: 40px;

					> a {
						font-size: 18px;

						margin-right: 15px;

						text-decoration: none;

						color: #14141A;
					}

					> span {
						display: inline-block;

						font-size: 18px;
						font-weight: normal;

						padding-right: 30px;

						cursor: pointer;
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
					width: 200px;

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

		> .main {
			padding-bottom: 120px;
		}



		> .footer{ 
			width: 100%;
			height: 120px;

			position: absolute;
			bottom: 0;
			left: 0;

			> .contents {
				width: 600px;

				display: flex;
				align-items: center;

				margin: 0 auto;

				padding: 30px 0px 30px;

				> .logo {
					margin-left: 20px;
					margin-right: 50px;

					> img {
						height: 36px;
					}
				}

				> .info {
					font-size: 13px;

					> .copyright {
						margin-bottom: 20px;
					}
				}

			}
		}
	}
}
</style>

<script lang="ts">
import axios from 'axios';
import { Component, Vue, Watch } from 'vue-property-decorator';


@Component
export default class App extends Vue {
	searchQuery: string = ""
	movieID: string = ""

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

		confirm("로그아웃 하시겠습니까?")

		alert("로그아웃 되었습니다.")

		if (this.$route.path != "/") {
			this.$router.push("/")
		}
	}

	goRandomMoviePage() {
		axios.get(process.env.VUE_APP_SERVER_ADDR + "/random", {
			headers: {
				"authorization": this.$store.state.token
			}
		})
		.catch(this.errorHandler).then(this.getRandomMovieSuccess)

		this.$router.push({name: 'movies', query: {id: this.movieID}})
	}

	errorHandler(error: any) {
		alert(error.response.data)
	}

	getRandomMovieSuccess(res: any) {
		if (res == null) return

		this.movieID = res.data.movieID

		this.$forceUpdate()
	}


	updateSearchQuery() {
		if (this.searchQuery == "") {
			return alert('검색어를 입력하세요.')
		}

		if (this.searchQuery == this.$route.query.query) {
			return
		}

		this.$router.push({name: 'search', query: {query: this.searchQuery}})
	}

	keydownHandler(e: KeyboardEvent) {
		if (e.key == "Enter") {
			this.updateSearchQuery()
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

	@Watch('$route.path')
	updatePath() {
		this.scrollToTop()
	}

	@Watch('$route.path')
	resetSearchQuery() {
		this.searchQuery = ""
	}

	@Watch('$route.query')
	updateQuery() {
		this.scrollToTop()
	} 

	scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}
}
</script>
