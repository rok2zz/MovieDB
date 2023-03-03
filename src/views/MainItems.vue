<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div v-if="isLoaded()" :class="$style.contents">
				<div :class="$style.title">
					<span>'{{ getType() }}'</span>
				</div>
				<div :class="$style.list">
					<MovieItems :movies="movies" />
				</div>
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

		> .contents {

			> .title {
				width: 100%;

				font-size: 20px;

				text-align: left;

				color: #4646C7;
			}

			> .more {

				text-align: center;

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
		if (this.movies?.length > 0) {
			return true
		}

		return false
	}

	errorHandler(error: any) {
		alert(error.response.data)
	}

	getMainItemsSuccess(res: any) {
		if (res == null) return

		if (this.type == "byReviews") {
			this.movies = res.data.byReviews

			this.count = res.data.count

			this.$forceUpdate()

			return
		}

		this.movies = res.data.byNewest
		this.count = res.data.count

		this.$forceUpdate()
	}

	getType(): string {
		if (this.type == "byReviews") {
			return "리뷰 많은 순"
		}

		return "최근 나온 순"
	}

	isMoreMoviesExist(): boolean {
		return ((this.page + 1) * 8) < this.count
	}

	getMoreMovies() {
		this.page += 1

		if (((this.page + 1) * 8) > this.count) {
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

		let rows = []

		if (this.type == "byReviews") {
			rows = res.data.byReviews
		}

		rows = res.data.byNewest

		for (var i = 0; i < rows?.length; i++) {
            this.movies.push({
                id: rows[i].id,
                title: rows[i].title,
                overview: rows[i].overview,
                posterPath: rows[i].posterPath,
                tagline: rows[i].tagline,
                releaseDate: rows[i].releaseDate,
                genres: rows[i].genres,
                country: rows[i].country,
                runtime: rows[i].runtime
            })
        }

		this.$forceUpdate()
	}

	@Watch('$route.query')
	updateUrlQuery() {
		this.init()
	}
}
</script>
