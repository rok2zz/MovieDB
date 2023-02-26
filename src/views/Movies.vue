<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div v-if="isLoaded()" :class="$style.contents">
				<!-- 영화 정보 -->
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

				<!-- 평점 및 리뷰 -->
				<div :class="$style.reviews">
					<div :class="$style.title">
						평점 및 리뷰 <span>{{ getReviewersNumber() }}</span>
					</div>
					<div v-if="isReviewsExist()" :class="$style.rating">
						<span v-for="index in 5" :key="index" :class="$style.star">
							<img v-if="getAverageRating() >= index" :src="require('@/assets/img/star.png')">
							<img v-else-if="getAverageRating() >= (index - 0.5)" :src="require('@/assets/img/half_star.png')">
							<img v-else :src="require('@/assets/img/empty_star.png')">
						</span>
						<span :class="$style.getRating">{{ getAvarageRatingToString() }}점</span>
					</div>
					<div v-else :class="$style.notExist">
						작성된 평점 및 리뷰가 없습니다. <br>
						첫 번째 리뷰를 작성해보세요!
					</div>

					<!-- 나의 리뷰 -->
					<div v-if="isMyReviewExist()" :class="$style.myReview">
						<div :class="$style.contents">
							<div :class="$style.rating">
								<span v-for="index in 5" :key="index" :class="$style.star">
									<img v-if="getMyRating() >= index" :src="require('@/assets/img/star.png')">
									<img v-else-if="getMyRating() >= (index - 0.5)" :src="require('@/assets/img/half_star.png')">
									<img v-else :src="require('@/assets/img/empty_star.png')">
								</span>
								<span :class="$style.getRating">{{ getMyRating() }}점</span>
							</div>
							<div :class="$style.info">
								<div :class="$style.reviewer">{{ getMyReviewID() }}</div>
								<div :class="$style.date">{{ getWritedDate(getMyReviewDate()) }}</div>
							</div>
						</div>
						<div :class="$style.review">
							{{ getMyReview() }}
						</div>
						<div :class="$style.delete">
							<div :class="$style.empty"></div>
							<span @click="deleteMyReview()">삭제</span>
						</div>
					</div>

					<!-- 리뷰 작성 -->
					<div v-else :class="$style.write">
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

					<!-- 리뷰 목록 -->
					<div v-for="(item, index) in getReviewsList()" :key="'reviews' + index" :class="$style.list">
						<div :class="$style.contents">
							<div :class="$style.rating">
								<span v-for="index in 5" :key="index" :class="$style.star">
									<img v-if="item.rating >= index" :src="require('@/assets/img/star.png')">
									<img v-else-if="item.rating >= (index - 0.5)" :src="require('@/assets/img/half_star.png')">
									<img v-else :src="require('@/assets/img/empty_star.png')">
								</span>
								<span :class="$style.getRating">{{ item.rating }}점</span>
							</div>
							<div :class="$style.info">
								<div :class="$style.reviewer">{{ item.reviewer }}</div>
								<div :class="$style.date">{{ getWritedDate(item.writedDate) }}</div>
							</div>
						</div>
						<div :class="$style.review">
							{{ item.review }}
						</div>
					</div>
					<div :class="$style.more">
						<span v-if="isMoreReviewsExist()" @click="getMoreReviews()">더보기</span>
					</div>
				</div>
			</div>

			<!-- DB에 영화 정보가 없음 -->
			<div v-else :class="$style.fail">
				영화 정보를 불러올 수 없습니다.
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
					> span {
						font-size: 13px;
					}
				}

				> .rating {
					display: flex;

					> .star {

						> img {
							width: 20px;
						}
					}

					> .getRating {
						margin-left: 10px;

						transform: translateY(-2px)
					}
				}

				> .myReview {
					margin-top: 20px;
					padding: 10px;

					display: flex;

					box-shadow: 0px 0px 5px 1px #ccc;
					border-radius: 8px;

					> .contents {

						> .rating {
							display: flex;

							> .star {

								> img {
									width: 15px;
								}
							}

							> .getRating {
								font-size: 8px;

								margin-left: 10px;

								transform: translateY(2px)
							}
						}

						
						> .info {
							font-size: 10px;

							> .reviewer {
								font-weight: bold;
							}
						}
					}

					> .review {
						width: 490px;

						font-size: 12px;

						margin-left: 50px;
					}

					> .delete {
						margin-left: 10px;

						> span {
							height: 20px;
							
							display: inline-block;

							font-size: 12px;

							color: rgb(49, 49, 199);

							transform: translateY(-20px);

							cursor: pointer;
						}

						> span:hover {
							font-weight: bold;

							text-decoration: underline;
						}

						> .empty {
							height: 100%;
						}
					}
				}

				> .list {
					margin-top: 20px;
					padding: 10px;

					display: flex;

					box-shadow: 0px 0px 5px 1px #ccc;
					border-radius: 8px;

					> .contents {

						> .rating {
							display: flex;


							> .star {

								> img {
									width: 15px;
								}
							}

							> .getRating {
								font-size: 8px;

								margin-left: 10px;

								transform: translateY(2px)
							}
						}

						> .info {
							font-size: 10px;

							> .reviewer {
								font-weight: bold;
							}
						}
					}

					> .review {
						width: 490px;

						font-size: 12px;

						margin-left: 50px;
					}
				}

				> .more {
					margin-top: 50px;

					text-align: center;

					> span {
						font-size: 13px;

						cursor: pointer;
					}

					> span:hover {
						font-weight: bold;

						text-decoration: underline;
					}
				}

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

	review: string = ""
	rating: number = 0

	reviewsExist: boolean = false
	myReview?: Review
	reviews: Review[] = []
	count: number = 0
	page: number = 0
	
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
		.catch(this.errorHandler).then(this.getMovieSuccess)

		this.getReviews()
	}

	getReviews() {
		axios.get(process.env.VUE_APP_SERVER_ADDR + "/review/" + this.movieID + "/" + this.page, {
			headers: {
				"authorization": this.$store.state.token
			}
		})
		.catch(this.errorHandler).then(this.getReviewsSuccess)
	}

	getReviewsList(): Review[] {
		return this.reviews ?? []
	}

	isLoaded(): boolean {
		return this.movie != null
	}

	errorHandler(error: any) {
		alert(error.response.data)
	}

	getMovieSuccess(res: any) {
		if (res == null) return

		this.movie = res.data.movie

		this.$forceUpdate()
	}

	getReviewsSuccess(res: any) {
		if (res == null) return

		this.reviews = res.data.reviews
		this.count = res.data.count
		this.myReview = res.data.myReview

		this.$forceUpdate()
	}

	getMovie(): Movie {
		return this.movie!
	}

	getPosterPath(): string {
		return this.getMovie()?.posterPath ?? ""
	} 

	getTitle(): string {
		return this.getMovie().title ?? ""
	}

	getReleaseYear(): string {
        let d = new Date(this.getMovie().releaseDate ?? "")

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
        let d = new Date(this.getMovie().releaseDate ?? "")

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

	getReviewersNumber(): string {
		return "(" + this.count.toString() + "명)"
	}

	getAverageRating(): number {
		let sum = 0

		for (var i = 0; i < this.reviews.length; i++) {
			sum += this.reviews[i].rating
		}

		if (this.myReview != null) {
			sum += this.myReview?.rating
		}

		let avarage = sum / this.count

		return avarage
	}

	getAvarageRatingToString(): string {
		return this.getAverageRating().toFixed(1)
	}

	getMyRating(): number {
		return this.myReview?.rating ?? 0
	}

	getMyReview(): string {
		return this.myReview?.review ?? ""
	}

	getMyReviewID(): string {
		return this.myReview?.reviewer ?? ""
	}

	getMyReviewDate(): string {
		return this.myReview?.writedDate ?? ""
	}

	getWritedDate(date: string): string {
		let d = new Date(date)

		return d.getFullYear().toString() + "." + d.getMonth().toString() + "." + d.getDate().toString()	
	}

	isPosterExist(): boolean {
		return this.getMovie().posterPath != null
	}

	isReviewsExist(): boolean {
		if (this.reviews.length > 0) {
			return true
		}

		return false
	}

	isMyReviewExist(): boolean {
		return this.myReview != null
	}

	deleteMyReview() {
		if (this.$store.state.token == null) {
			return alert("로그인이 필요합니다.")
		}

		if (!confirm("삭제하시겠습니까?")) return

		axios.post(process.env.VUE_APP_SERVER_ADDR + "/review/delete", {
			myReviewID: this.myReview?.id
		}, {
			headers: {
				"authorization": this.$store.state.token
			}
		}).catch(this.errorHandler).then(this.deleteReviewSuccess)
	}

	deleteReviewSuccess(res: any) {
		if (res == null) return

		alert("삭제되었습니다.")

		this.getReviews()
	}

	submitReview() {
		if (this.$store.state.token == null) {
			return alert("로그인이 필요합니다.")
		}

		if (this.review == null || this.review == "") {
			return alert("리뷰를 입력해주세요.")
		}

		if (!confirm("등록하시겠습니까?")) return

		axios.post(process.env.VUE_APP_SERVER_ADDR + "/review/write", {
			rating: this.rating,
			review: this.review,
			movie_id: this.movieID
		}, {
			headers: {
				"authorization": this.$store.state.token
			}
		}).catch(this.errorHandler).then(this.submitReviewSuccess)
 	}

	submitReviewSuccess(res: any) {
		if (res == null) return

		alert("등록되었습니다.")

		this.getReviews()
	}

	isMoreReviewsExist() {
		return ((this.page + 1) * 5) < this.count
	}

	getMoreReviews() {
		this.page += 1

		if (this.isMyReviewExist()) {
			this.count -= 1
		}

		if (((this.page * 5)) > this.count) {
			return
		}

		axios.get(process.env.VUE_APP_SERVER_ADDR + "/review/" + this.movieID + "/" + this.page, {
			headers: {
				"authorization": this.$store.state.token
			}
		})
		.catch(this.errorHandler).then(this.getMoreReviewsSuccess)
	}

	getMoreReviewsSuccess(res: any) {
		if (res == null) return

		let rows = res.data.reviews

		for (var i = 0; i < rows.length; i++) {
            this.reviews.push({
                id: rows[i].id,
                movieID: rows[i].movieID,
                reviewerID: rows[i].reviewerID,
                reviewer: rows[i].reviewer,
                rating: rows[i].rating,
                review: rows[i].review,
                writedDate: rows[i].writedDate,
            })
        }

		this.$forceUpdate()
	}

	@Watch("this.reviews")
	updateReviews() {
		this.getReviews()
	}
}
</script>
