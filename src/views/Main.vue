<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div :class="$style.byReviews">
				<div :class="$style.title">
					<div :class="$style.contents">리뷰가 많은 순</div>
					<div :class="$style.more">더보기</div>
				</div>
			</div>
			<div :class="$style.byRatings">
				<div :class="$style.title">
					<div :class="$style.contents">평점이 높은 순</div>
					<div :class="$style.more">더보기</div>
				</div>
			</div>
			<div :class="$style.byNewest">
				<div :class="$style.title">
					<div :class="$style.contents">최근 나온 순</div>
					<div :class="$style.more">더보기</div>
				</div>
			</div>
			<div :class="$style.byNowPlaying">
				<div :class="$style.title">
					<div :class="$style.contents">현재 상영 중</div>
					<div :class="$style.more">더보기</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" module>
.index {
	> .container {
		width: 100%;
		
		margin-top: 50px;

		> div {
			width: 900px;

			margin: 0 auto;
			margin-bottom: 50px;

			> .title {
				display: flex;

				> .contents {
					width: 100%;

					font-size: 30px;
					font-weight: bold;
				}

				> .more {
					width: 100px;

					padding-top: 17px;

					font-size: 15px;

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

@Component
export default class Main extends Vue {}
</script>
