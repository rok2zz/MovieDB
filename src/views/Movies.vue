<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div v-if="isLoaded()" :class="$style.contents">
				<div :class="$style.info">
					<div :class="$style.poster">
						<img :src="'https://www.themoviedb.org/t/p/w200' + getPosterPath()">
					</div>
					<div :class="$style.title">
						{{ getTitle() }}
					</div>
				</div>
			</div>
			<div v-else :class="$style.fail">
				검색 실패
			</div>
		</div>
	</div>
</template>

<style lang="scss" module>
.index {

	> .container {
		width: 100%;

		margin-top: 50px;

		> .contents {
			width: 700px;

			margin: 0 auto;

			margin-bottom: 50px;

			> .info {
				width: 100%;

				display: flex;

				> .poster {
					margin-right: 50px;
				}

				> .title {
					font-size: 25px;
					font-weight: bold;
				}
			}
		}

		> .fail {
			font-size: 20px;
			font-weight: bold;

			margin-bottom: 50px;

			text-align: center;
		}
	}
}
</style>

<script lang="ts">
import { unwrapQuery } from '@/utils/formats';
import axios from 'axios';
import { Movie } from '@/structure/types';
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class Movies extends Vue {
	movieID: string = ""
	movie?: Movie

	mounted() {
		this.init()
	}

	init() {
		this.movieID = unwrapQuery(this.$route.query.id)

		axios.get(process.env.VUE_APP_SERVER_ADDR + "/movie/" + this.movieID, {
			headers: {
				"authorization": this.$store.state.token
			}
		})
		.catch(this.getMovieError).then(this.getMovieSuccess)
	}

	isLoaded(): boolean {
		return this.movie != null
	}

	getMovieError(error: any) {
		alert(error.response.data)
	}

	getMovieSuccess(res: any) {
		if (res == null) return

		this.movie = res.data.movie

		this.$forceUpdate()
	}

	getMovie(): Movie {
		return this.movie!
	}

	getPosterPath(): string {
		return this.getMovie()?.poster_path ?? ""
	} 

	getTitle(): string {
		return this.getMovie().title ?? ""
	}
}
</script>
