<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div :class="$style.title">
				<span>'{{ getSearchQuery() }}'</span>
			</div>
			<div v-if="isLoaded()" :class="$style.contents">
				<MovieItem v-for="(item, index) in movies" :key="'movie' + index" :movie="item" :class="$style.list" />
			</div>

			<div v-else-if="isSearchFailed()" :class="$style.fail">
				<span>검색 결과가 없습니다.</span>
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

		> .fail {
			margin-bottom: 100px;
		}

		> .title {
			font-size: 20px;
			font-weight: bold;

			text-align: left;

			margin-bottom: 30px;

			color: #4646C7;
		}

		> .contents {
			display: flex;
			flex-wrap: wrap;

			> .list {
				width: calc(25% - 25px);

				margin-right: 33px;
				margin-bottom: 30px;

				border: 1px solid #ccc;
				border-radius: 12px;

				cursor: pointer;
			}

			> .list:nth-child(4n) {
				margin-right: 0px;
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
import MovieItem from '@/components/MovieItem.vue';
import { Movie } from '@/structure/movieTypes';
import { unwrapQuery } from '@/utils/formats';
import axios from 'axios';
import { Component, Vue, Watch } from 'vue-property-decorator';


@Component({
	components: {
		MovieItem
	}
})
export default class Search extends Vue {
	searchQuery: string = ""
	movies: Movie[] = []
	searchFailed: boolean = false

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

		this.movies = []

		if (res.data.search == "none") {
			this.searchFailed = true

			return
		} 

		this.movies = res.data.movies
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
		.catch(this.errorHandler).then(this.searchSuccess)
	}

	isSearchFailed(): boolean {
		return this.searchFailed
	}

	@Watch('$route.query')
	updateUrlQuery() {
		this.movies = []
		this.searchFailed = false
		this.init()
	}
}
</script>
