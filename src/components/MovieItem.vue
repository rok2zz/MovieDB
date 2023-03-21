<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div v-if="isMoviesExists()" :class="$style.contents">
				<router-link :to="getMovieID()">
					<div :class="$style.poster">
						<img v-if="isPosterExist()" :src="'https://www.themoviedb.org/t/p/w200' + getPosterPath()">
						<img v-else :src="require('@/assets/img/no_image.jpg')">
					</div>
					<div :class="$style.info">
						<div :class="$style.title">
							<span>{{ getTitle() }}</span>
							<span :class="$style.year">{{ getReleaseYear() }}</span>
						</div>
						<div :class="$style.tagline">
							{{ getTagline() }}
						</div>
					</div>
				</router-link>
			</div>
			
			<div v-else :class="$style.fail" >
				<span>검색 결과가 없습니다.</span>
			</div>
		</div>

	</div>
</template>

<style lang="scss" module>
.index {
	width: 100%;
	
	> .container {

		> .contents {

			> a {
				text-decoration: none;

				color: #14141A;

				> .poster {
					width: 100%;

					> img {
						width: 100%;
						height: 213px;

						border-top-left-radius: 12px;
						border-top-right-radius: 12px;
					}
				}

				> .info {
					padding: 10px;
					margin-bottom: 5px;

					text-align: left;

					> .title {
						font-size: 13px;
						font-weight: bold;

						margin-bottom: 5px;

						> .year {
							font-size: 11px;
							font-weight: normal;
						}
					}

					> .tagline {
						font-size: 10px;
						font-weight: normal;
					}
				}
			}
		}
	}
}

</style>

<script lang="ts">
import { Movie } from '@/structure/movieTypes';
import { cutString } from '@/utils/formats';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { RawLocation } from 'vue-router';


@Component
export default class MovieItem extends Vue {
	@Prop() movie?: Movie

	isMoviesExists(): boolean {
		return this.movie != null
	}

	getTitle(): string {
		return cutString(this.movie?.title ?? "", 7)
	}

	getTagline(): string {
		return cutString(this.movie?.tagline ?? "", 29)
	}

	getMovieID(): RawLocation {
		var movieID = (this.movie?.id ?? 0).toString()

		return {name: 'movies', query: {id : movieID}}
	}

	getReleaseYear(): string {
        let d = new Date(this.movie?.releaseDate ?? "")

		return " (" + d.getFullYear().toString() + ")"
	}

	isPosterExist(): boolean {
		return this.movie?.posterPath != null
	}

	getPosterPath(): string {
		return this.movie?.posterPath ?? ""
	}

}
</script>
