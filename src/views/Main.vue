<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div :class="$style.byReviews">
				<div :class="$style.title">
					<div :class="$style.contents">리뷰가 많은 순</div>
					<div @click="goMoreMoviesInfoPage('byReviews')" :class="$style.more">더보기</div>
				</div>
				<div :class="$style.contents">
					<MovieItems :movies="byReviews" />
				</div>
			</div>
			<div :class="$style.byNewest">
				<div :class="$style.title">
					<div :class="$style.contents">최근 나온 순</div>
					<div @click="goMoreMoviesInfoPage('byNewest')" :class="$style.more">더보기</div>
				</div>
				<div :class="$style.contents">
					<MovieItems :movies="byNewest" />
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

				> .contents {
					width: 100%;

					font-size: 20px;
					font-weight: bold;
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
		}
	}
}

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MovieItems from '@/components/MovieItems.vue';
import { Movie } from '@/structure/types';
import axios from 'axios';


@Component({
	components: {
		MovieItems
	}
})
export default class Main extends Vue {
	byReviews: Movie[] = []
	byNewest: Movie[] = []

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
		if (this.byReviews.length > 0 && this.byNewest.length > 0) {
			return true
		}

		return false
	}

	errorHandler(error: any) {
		alert(error.response.data)
	}

	getMainSuccess(res: any) {
		if (res == null) return

		this.byReviews = res.data.byReviews
		this.byNewest = res.data.byNewest

		this.$forceUpdate()
	}

	goMoreMoviesInfoPage(type: string) {
		this.$router.push({name: 'mainitems', query: {type: type}})
	}
}
</script>
