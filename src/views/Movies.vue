<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div v-if="isLoaded()" :class="$style.contents">
				<div :class="$style.movie">
					<div :class="$style.poster">
						<img v-if="isPosterExist()"  :src="'https://www.themoviedb.org/t/p/w200' + getPosterPath()">
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
						<div :class="$style.outline">
							<span>개봉 : {{ getReleaseDate() }}</span>
							<span>제작 : {{ getCountry() }}</span>
							<span>장르 : {{ getGenres() }}</span>
							<span>런타임 : {{ getRuntime() }}</span>
						</div>
						<div :class="$style.overview">
							<span>줄거리</span>
							{{ getOverview() }}
						</div>
					</div>
				</div>

				<div :class="$style.reviews">
					<div :class="$style.title">
						평점 및 리뷰
					</div>
					<div v-if="isRated()" :class="$style.rating">
						평점
					</div>
					<div v-else :class="$style.notExist">
						작성된 평점 및 리뷰가 없습니다. <br>
						첫 번째 리뷰를 작성해보세요!
					</div>

					<div :class="$style.write">
						<div :class="$style.rating">
							<span v-for="index in 5" :key="index" :class="$style.star">
								<img v-if="getRating() >= index" @click="setRating(index - 1)" :src="require('@/assets/img/star.png')">
								<img v-else @click="setRating(index)" :src="require('@/assets/img/empty_star.png')">
							</span>
							<span :class="$style.getRating">{{ getRating() }}점</span>
						</div>
						<textarea placeholder="리뷰는 최대 500자 까지 등록 가능합니다." v-model="review"></textarea>
						<button @click="submitReview()">등록하기</button>
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

			> .movie {
				width: 100%;

				display: flex;

				> .poster {
					margin-right: 50px;

					> img {
						width: 200px;
					}
				}

				> .info {
					> .title {
						font-size: 25px;
						font-weight: bold;

						> .year {
							font-size: 18px;
							font-weight: normal;
						}
					}

					> .tagline {
						font-size: 13px;

						margin-top: 5px;
					}

					> .outline {
						margin-top: 10px;

						font-size: 13px;

						padding-left: 5px;

						border-left: 3px solid #ccc;

						> span {
							width: 100%;
							
							display: inline-block;

						}
					}

					> .overview {
						margin-top: 20px;

						font-size: 12px;
						font-weight: normal;

						> span {
							width: 100%;

							display: inline-block;

							font-size: 13px;
							font-weight: bold;

							margin-bottom: 3px;
						}
					}
				}
			}

			> .reviews {
				margin-top: 30px;

				> .title {
					font-weight: bold;

					margin-bottom: 10px;
				}

				> .notExist {
					font-size: 12px;
				}

				> .write {
					margin-top: 10px;

					display: flex;

					align-items: center;

					> .rating {
						width: 200px;

						display: flex;

						padding-left: 10px;

						> span {
							display: inline-block;

							> img {
								width: 25px;
								height: 25px;

								cursor: pointer;
							}
						}

						> .getRating {

							font-size: 20px;
							font-weight: bold;

							padding-left: 15px;
						}
					}

					> textarea {
						width: 400px;

						padding: 5px;

						font-size: 12px;
						font-family: 'Noto Sans KR', sans-serif;

						border-radius: 3px;

						outline: none;
						resize: none;
					}

					> button {
						width: 70px;
						height: 30px;

						font-weight: bold;

						margin-left: 20px;
						padding: 5px;

						border-radius: 5px;

						border: none;

						background-color: #ccc;

						cursor: pointer;
					}
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
import { Movie, Review } from '@/structure/types';
import { Component, Vue, Watch } from 'vue-property-decorator';


@Component
export default class Movies extends Vue {
	movieID: string = ""
	movie?: Movie

	rated: boolean = false
	reviews?: Review[] = []
	count?: number
	review: string = ""
	rating: number = 0
	myReview?: string
	myRating?: number


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

	updateReviews() {
		
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

		// if (res.data.reviews == null)  return 

		// this.reviews = res.data.reviews
		// this.count = res.data.count

		// this.rated = true

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

	getReleaseYear(): string {
        let d = new Date(this.getMovie().release_date ?? "")

		return " (" + d.getFullYear().toString() + ")"
	}

	getTagline(): string {
		if (this.getMovie().tagline == "") return ""
		return "❝" + this.getMovie().tagline + "❞"
	}

	getRuntime(): string {
		if (this.getMovie().runtime == 0) return "미정"
		return this.getMovie().runtime.toString() + "분"
	}

	getReleaseDate(): string {
        let d = new Date(this.getMovie().release_date ?? "")

		return d.getFullYear().toString() + "." + d.getMonth().toString() + "." + d.getDate().toString()
	}

	getCountry(): string {
		return this.getMovie().country ?? "알 수 없음"
	}

	getGenres(): string {
		return this.getMovie().genres ?? "" 
	}

	getOverview(): string {
		return this.getMovie().overview ?? ""
	}

	getRating(): number {
		return this.rating
	}

	setRating(rate: number) {
		this.rating = rate
	}

	isPosterExist(): boolean {
		return this.getMovie().poster_path != null
	}

	isRated(): boolean {
		return this.rated
	}

	submitReview() {
		if (this.review == null || this.review == "") {
			return alert("리뷰를 입력해주세요.")
		}

		if (!confirm("등록하시겠습니까?")) return

		axios.post(process.env.VUE_APP_SERVER_ADDR + "/review", {
			rating: this.rating,
			review: this.review,
			movie_id: this.movieID
		}, {
			headers: {
				"authorization": this.$store.state.token
			}
		}).catch(this.reviewError).then(this.reviewSuccess)
 	}

	 reviewError(error: any) {
		alert(error.response.data)
	}

	reviewSuccess(res: any) {
		if (res == null) return

		alert("등록되었습니다.")
	}

	@Watch("this.reviews")
	update() {

	}
}
</script>
