<template>
	<div :class="$style.index">
		<div :class="$style.container">
			
		</div>
	</div>
</template>

<style lang="scss" module>
.index {
	> .container {
		width: 100%;


		> .search {
			max-width: 1200px;

			display: flex;

			align-items: center;

			margin: 0 auto;
			padding: 100px 0px 100px;

			> .input {
				display: flex;

				margin: 0 auto;
				
				> input {
					width: 400px;
					height: 40px;

					padding: 10px;

					font-size: 20px;

					border: none;
					border-radius: 7px;

					outline: none;
				}

				> img {
					width: 25px;
					height: 25px;

					margin-top: 7px;
					margin-left: 10px;

					cursor: pointer;
				}
			}
		}
	}
}

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';


@Component
export default class InputSearch extends Vue {
	searchQuery: string = ""

	search() {
		this.$router.push("/search?query=" + this.searchQuery)
	}

	keydownHandler(e: KeyboardEvent) {
		if (e.key == "Enter") {
			this.search()
		}
	}
}
</script>
