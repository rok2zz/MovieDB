<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div :class="$style.contents">
				<div :class="$style.title">
					<span>'{{ getSearchQuery() }}''</span> 검색결과
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

		> .contents {
			width: 900px;

			margin: 0 auto;
			margin-bottom: 50px;

			> .title {
				width: 100%;

				font-size: 20px;

				text-align: center;

				> span {
					font-size: 25px;
					font-weight: bold;
				}
			}
		}
	}
}
</style>

<script lang="ts">
import { Movie } from '@/structure/types';
import { unwrapQuery } from '@/utils/formats';
import axios from 'axios';
import { Component, Vue, Watch } from 'vue-property-decorator';


@Component
export default class Search extends Vue {
	searchQuery: string = ""
	searchResult: boolean = true
	movies?: Movie

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

	searchError(error: any) {
		alert(error.response.data)
	}

	searchSuccess(res: any) {
		if (res == null) return

		if (res.search == "none") {
			this.searchResult = false
		}

		

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
