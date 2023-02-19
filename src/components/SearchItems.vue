<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div v-if="isMoviesExists()" :class="$style.contents">
				<div v-for="(item, index) in movies" :key="'movies' + index" :class="$style.list">
					<router-link :to="getMovieID(item)">
						<div :class="$style.poster">
							<img :src="'https://www.themoviedb.org/t/p/w200' + item.poster_path">
						</div>
						<div :class="$style.info">
							<div :class="$style.title">
								{{ getTitle(item.title) }}
							</div>
							<div :class="$style.tagline">
								{{ getTagline(item) }}
							</div>
						</div>
					</router-link>
				</div>
			</div>
			<div v-else :class="$style.fail" >
				<span>검색 결과가 없습니다.</span>
			</div>
		</div>

	</div>
</template>

<style lang="scss" module>
.index {
	> .container {
		width: 100%;
		padding: 50px 0px 50px;

		> .contents {
			width: 100%;

			display: flex;
			flex-wrap: wrap;

			text-align: center;

			> .list {
				width: calc(25% - 25px);

				margin-right: 33px;
				margin-bottom: 30px;

				border: 1px solid #ccc;
				border-radius: 12px;

				cursor: pointer;

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

						text-align: left;

						> .title {
							font-size: 13px;
							font-weight: bold;

							margin-bottom: 5px;
						}

						> .tagline {
							font-size: 10px;
							font-weight: normal;
						}

						margin-bottom: 5px;
					}
				}
			}

			> .list:nth-child(4n) {
				margin-right: 0px;
			}
		}
	}
  
}

</style>

<script lang="ts">
import { Movie } from '@/structure/types';
import { cutString } from '@/utils/formats';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { RawLocation } from 'vue-router';


@Component
export default class SearchItems extends Vue {
	@Prop() movies?: Movie[]


	isMoviesExists(): boolean {
		return this.movies != null
	}

	getTitle(title: string): string {
		return cutString(title, 10)
	}

	getTagline(item: Movie): string {
		if (item.tagline == null) return ""

		return cutString(item.tagline, 29)
	}

	getMovieID(item: Movie): RawLocation {
		var movieID = (item.id).toString()

		return {name: 'movies', query: {id : movieID}}
	}

}
</script>
