<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div v-if="isLoaded()" :class="$style.contents">
				<div :class="$style.title">
					<span>'{{ getSearchQuery() }}'</span>
				</div>
				<div :class="$style.list">
					<SearchItems :movies="movies" />
				</div>
			</div>
			
			<div v-else :class="$style.loading" >
				loading
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
		}
	}
}
</style>

<script lang="ts">
import SearchItems from '@/components/SearchItems.vue';
import { Movie } from '@/structure/types';
import { unwrapQuery } from '@/utils/formats';
import axios from 'axios';
import { Component, Vue, Watch } from 'vue-property-decorator';


@Component({
	components: {
		SearchItems
	}
})
export default class Search extends Vue {
	searchQuery: string = ""
	movies: Movie[] = []

	mounted() {
		this.init()
	}

	init() {
		this.searchQuery = unwrapQuery(this.$route.query.query)

		axios.get(process.env.VUE_APP_SERVER_ADDR + "/search/" + this.searchQuery, {
			headers: {
				"authorization": this.$store.state.token
			}
		})
		.catch(this.searchError).then(this.searchSuccess)
	}

	isLoaded(): boolean {
		return this.movies != null
	}

	searchError(error: any) {
		alert(error.response.data)
	}

	searchSuccess(res: any) {
		if (res == null) return

		if (res.search == "none") return

		this.movies = res.data.movies

		this.$forceUpdate()
	}

	getSearchQuery(): string {
		return this.searchQuery
	}

	@Watch('$route.query')
	updateUrlQuery() {
		this.init()
	}
}
</script>
