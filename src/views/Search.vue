<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div v-if="isLoaded()" :class="$style.contents">
				<div :class="$style.title">
					<span>'{{ getSearchQuery() }}'</span>
				</div>
				<div :class="$style.list">
					<MovieItems :movies="movies" />
				</div>
			</div>
			
			<div v-else :class="$style.loading" >
				영화 정보를 불러오는 중입니다.
			</div>
			<div :class="$style.reSearch">
				<span :class="$style.title">찾으시는 영화가 없으신가요?</span>
				<span @click="reSearchMovies()" :class="$style.search">재검색</span>
			</div>
		</div>
	</div>
</template>

<style lang="scss" module>
.index {
	> .container {
		width: 100%;

		padding: 50px 0px 50px;


		> div {
			width: 700px;

			margin: 0 auto;

			font-size: 25px;
			font-weight: bold;

			text-align: center;
		}

		> .contents {

			> .title {
				width: 100%;

				font-size: 20px;

				text-align: left;

				color: #4646C7;
			}
		}

		> .reSearch {
			> span {
				display: inline-block;

				font-size: 13px;
				font-weight: normal;
			}

			> .title {
				width: 100%;
			}

			> .search {
				cursor: pointer;
			}

			> .search:hover {
				font-weight: bold;

				text-decoration: underline;
			}
		}
	}
}
</style>

<script lang="ts">
import MovieItems from '@/components/MovieItems.vue';
import { Movie } from '@/structure/types';
import { unwrapQuery } from '@/utils/formats';
import axios from 'axios';
import { Component, Vue, Watch } from 'vue-property-decorator';


@Component({
	components: {
		MovieItems
	}
})
export default class Search extends Vue {
	searchQuery: string = ""
	movies: Movie[] = []

	mounted() {
		this.init()
	}

	init() {
		this.searchQuery = unwrapQuery(this.$route.query.query)

		axios.get(process.env.VUE_APP_SERVER_ADDR + "/search/" + this.searchQuery, {
			headers: {
				"authorization": this.$store.state.token
			}
		})
		.catch(this.errorHandler).then(this.searchSuccess)
	}

	isLoaded(): boolean {
		if (this.movies.length > 0) {
			return true
		}

		return false
	}

	errorHandler(error: any) {
		alert(error.response.data)
	}

	searchSuccess(res: any) {
		if (res == null) return

		if (res.search == "none") return

		this.movies = res.data.movies

		this.$forceUpdate()
	}

	getSearchQuery(): string {
		return this.searchQuery
	}

	reSearchMovies() {
		alert("추가 검색에는 시간이 다소 소요될 수 있습니다.")
		
		axios.get(process.env.VUE_APP_SERVER_ADDR + "/search/re/" + this.searchQuery, {
			headers: {
				"authorization": this.$store.state.token
			}
		})
		.catch(this.errorHandler).then(this.reSearchSuccess)
	}

	reSearchSuccess(res: any) {
		if (res == null) return

		if (res.search == "none") return

		this.movies = res.data.movies

		this.$forceUpdate()
	}

	@Watch('$route.query')
	updateUrlQuery() {
		this.init()
	}
}
</script>
