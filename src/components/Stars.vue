<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<span v-for="index in 5" :key="index" :class="$style.star">
				<img :style="getStarWidth()" v-if="getRating() >= index" :src="require('@/assets/img/star.png')">
				<img :style="getStarWidth()" v-else-if="getRating() >= (index - 0.5)" :src="require('@/assets/img/half_star.png')">
				<img :style="getStarWidth()" v-else :src="require('@/assets/img/empty_star.png')">
			</span>
			<span :class="$style.getRating" :style="getCommentStyle()">{{ getRatingToString() }}점</span>
		</div>
	</div>
</template>

<style lang="scss" module>
.index {
	> .container {
		display: flex;
		
		> .getRating {
			margin-left: 10px;

			transform: translateY(-2px)
		}
	}
}

</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Stars extends Vue {
	@Prop() type?: string
	@Prop() rating?: number

	getRating(): number {
		return this.rating ?? 0
	}
	
	getRatingToString(): string {
		return this.getRating().toFixed(1)
	}
	
	getStarWidth(): string {
		if (this.type == "avarage") {
			return "width: 20px;"
		}

		return "width: 15px;"
	}

	getCommentStyle(): string {
		if (this.type == "avarage") {
			return ""
		}

		return "font-size: 8px; transform: translateY(2px);"
	}
}
</script>
