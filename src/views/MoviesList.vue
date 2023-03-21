<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div :class="$style.title">
				<span>'{{ getType() }}'</span>
			</div>
			<div v-if="isLoaded()" :class="$style.contents">
				
				<MovieItem v-for="(item, index) in movies" :key="'movie' + index" :movie="item" :class="$style.list" />

				<div :class="$style.more">
					<span v-if="isMoreMoviesExist()" @click="getMoreMovies()">더보기</span>
				</div>
			</div>
			
			<div v-else :class="$style.loading" >
				영화 정보를 불러오는 중입니다.
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

		> .title {
			font-size: 20px;
			font-weight: bold;

			text-align: left;

			margin-bottom: 30px;

			color: #4646C7;
		}

		> .contents {
			width: 700px;

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

			> .more {
				margin: 0 auto;

				> span {
					font-size: 18px;

					cursor: pointer;
				}

				> span:hover {
					font-weight: bold;

					text-decoration: underline;
				}
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
export default class MoviesList extends Vue {
	type: string = ""
	movies: Movie[] = []
	page: number = 0
	count: number = 0

	mounted() {
		this.init()
	}

	init() {
		this.type = unwrapQuery(this.$route.query.type)

		axios.get(process.env.VUE_APP_SERVER_ADDR + "/mainitems/" + this.type + "/" + this.page, {
			headers: {
				"authorization": this.$store.state.token
			}
		})
		.catch(this.errorHandler).then(this.getMainItemsSuccess)

	}

	isLoaded(): boolean {
		return this.movies.length > 0
	}

	errorHandler(error: any) {
		alert(error.response.data)
	}

	getMainItemsSuccess(res: any) {
		if (res == null) return

		if (this.type == "reviews") {
			this.movies = res.data.moviesReviews

			this.count = res.data.count

			return
		}

		this.movies = res.data.moviesNewest
		this.count = res.data.count
	}

	getType(): string {
		if (this.type == "reviews") {
			return "리뷰 많은 순"
		}

		return "최근 나온 순"
	}

	isMoreMoviesExist(): boolean {
		return this.getItemsPerPage() < this.count
	}

	getMoreMovies() {
		this.page += 1

		if (this.getItemsPerPage() > this.count) {
			return alert("더 불러올 영화가 없습니다.")
		}

		axios.get(process.env.VUE_APP_SERVER_ADDR + "/mainitems/" + this.type + "/" + this.page, {
			headers: {
				"authorization": this.$store.state.token
			}
		})
		.catch(this.errorHandler).then(this.getMoreMoviesSuccess)
	}

	getMoreMoviesSuccess(res: any) {
		if (res == null) return

		let rows: Movie[] = []

		if (this.type == "reviews") {
			rows = res.data.moviesReviews
		}

		rows = res.data.moviesNewest

		this.movies = this.movies.concat(rows)
	}

	getItemsPerPage(): number {
		return (this.page + 1) * 8
	}

	@Watch('$route.query')
	updateUrlQuery() {
		this.init()
	}
}
</script>
