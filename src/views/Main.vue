<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div :class="$style.reviews">
				<div :class="$style.title">
					<div :class="$style.contents">리뷰가 많은 순</div>
					<div @click="goMoreMoviesInfoPage('reviews')" :class="$style.more">더보기</div>
				</div>
				<div :class="$style.contents">
					<MovieItem v-for="(item, index) in moviesReviews" :key="'movie' + index" :movie="item" :class="$style.list" />
				</div>
			</div>
			
			<div :class="$style.newest">
				<div :class="$style.title">
					<div :class="$style.contents">최근 나온 순</div>
					<div @click="goMoreMoviesInfoPage('newest')" :class="$style.more">더보기</div>
				</div>
				<div :class="$style.contents">
					<MovieItem v-for="(item, index) in moviesNewest" :key="'movie' + index" :movie="item" :class="$style.list" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" module>
.index {
	> .container {
		width: 100%;
		
		padding-top: 50px;

		> div {
			width: 700px;

			margin: 0 auto;

			> .title {
				display: flex;

				margin-bottom: 30px;

				> .contents {
					width: 100%;

					font-weight: bold;
					font-size: 18px;
				}

				> .more {
					width: 50px;

					padding-top: 10px;

					font-size: 12px;

					cursor: pointer;
				}

				> .more:hover {
					text-decoration: underline;
				}
			}

			> .contents {
				width: 100%;

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
		}
	}
}

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MovieItem from '@/components/MovieItem.vue';
import { Movie } from '@/structure/movieTypes';
import axios from 'axios';


@Component({
	components: {
		MovieItem
	}
})
export default class Main extends Vue {
	moviesReviews: Movie[] = []
	moviesNewest: Movie[] = []

	mounted() {
		this.init()
	}

	init() {
		axios.get(process.env.VUE_APP_SERVER_ADDR + "/main", {
			headers: {
				"authorization": this.$store.state.token
			}
		})
		.catch(this.errorHandler).then(this.getMainSuccess)
	}

	isLoaded(): boolean {
		return this.moviesReviews.length > 0 && this.moviesNewest.length > 0
	}

	errorHandler(error: any) {
		alert(error.response.data)
	}

	getMainSuccess(res: any) {
		if (res == null) return

		this.moviesReviews = res.data.moviesReviews
		this.moviesNewest = res.data.moviesNewest
	}

	goMoreMoviesInfoPage(type: string) {
		this.$router.push({name: 'list', query: {type: type}})
	}
}
</script>
