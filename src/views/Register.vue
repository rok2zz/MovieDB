<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div :class="$style.title">
				<img :src="require('@/assets/img/logo_black.png')">
			</div>
			<div :class="$style.contents">
				<div>아이디</div>
				<input type="text" placeholder="아이디를 입력하세요." v-model="id">
			</div>
			<div :class="$style.contents">
				<div>비밀번호</div>
				<input type="password" placeholder="비밀번호를 입력하세요." v-model="pw">
			</div>
			<div :class="$style.contents">
				<div>이름</div>
				<input type="text" placeholder="이름을 입력하세요." v-model="name">
			</div>
			<div :class="$style.contents">
				<div>성별</div>
				<select v-model="gender">
					<option	v-for="(item, index) in genders" :key="index" :value="item">
						{{ item }}
					</option>
				</select>
			</div>
			<div :class="$style.contents">
				<div>이메일<span>(선택)</span></div>
				<input v-on:keydown="keydownHandler" type="text" placeholder="이메일을 입력하세요." v-model="email">
			</div>
			<div :class="$style.register">
				<button class="general-background-color" v-on:click="register()">회원가입</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" module>
.index {
	> .container {
		width: 430px;
		padding: 30px 0px 30px 0px;

		font-size: 15px;
		font-weight: bold;

		margin: 0 auto;
		margin-top: 50px;
		margin-bottom: 50px;

		box-shadow: 0px 0px 3px 3px #ccc;
		border-radius: 12px;

		> .title {
			margin-bottom: 40px;

			text-align: center;
		}

		> .contents {
			width: 340px;

			margin: 0 auto;
			padding-bottom: 20px;

			> div {
				padding-bottom: 5px;

				> span {
					font-size: 12px;
					font-weight: normal;
				}
			}

			> select {
				width: 340px;

				font-size: 15px;

				padding: 10px;

				border: 0px;
				border-bottom: 1px solid #cccc;
			
				outline: none;
			}

			> input {
				width: 340px;

				font-size: 15px;

				padding: 10px;

				border: 0px;
				border-bottom: 1px solid #ccc;

				outline: none;
			}
		}

		> .register {
			text-align: center;

			padding-bottom: 20px;
			
			> button {
				width: 340px;

				font-size: 15px;
				font-weight: bold;

				padding: 10px;
				margin-top: 30px;

				border-radius: 7px;
				border: 0px;

				cursor: pointer;
			}
		}
	}
}

</style>

<script lang="ts">
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Register extends Vue {
	id: string = ""
	pw: string = ""
	name: string = ""
	email: string = ""
	gender: string = "선택 안함"
	genders: string[] = ["남자", "여자", "선택 안함"]

	mounted() {
		if (this.$store.state.token != null) {
            this.$router.push("/main")
            return
        } 
	}

	keydownHandler(e: KeyboardEvent) {
		if (e.key == "Enter") {
			this.register()
		}
	}

	register() {
		if (this.id == "" || this.pw == "" || this.name == "") {
			return alert("필수 항목을 입력해주세요.")
		}

		if (!confirm("가입하시겠습니까?")) return

		let genderInit = 0
		let userEmail
		
		switch (this.gender) {
			case "남자": 
				genderInit = 2
				break
			case "여자":
				genderInit = 1
				break
            case "선택 안함":
				genderInit = 0
				break
		}

		userEmail == "" ? null : this.email
		
		axios.post(process.env.VUE_APP_SERVER_ADDR + "/register", {
			id: this.id,
			pw: this.pw,
			name: this.name,
			gender: genderInit,
			email: userEmail
		}).catch(this.registerError).then(this.registerSuccess)
 	}

	registerError(error: any) {
		alert(error.response.data)
	}

	registerSuccess(res: any) {
		if (res == null) return

		alert("가입되었습니다.")

		this.$router.push("/")
	}
}
</script>
