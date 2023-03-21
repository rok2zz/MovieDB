<template>
	<div :class="$style.index">
		<div :class="$style.container">
			<div :class="$style.title">
				<img :src="require('@/assets/img/logo_black.png')">
			</div>
			<div :class="$style.input">
				<input v-on:keydown="keydownHandler" type="text" placeholder="아이디를 입력하세요." v-model="userID">
			</div>
			<div :class="$style.input">
				<input v-on:keydown="keydownHandler" type="password" placeholder="비밀번호를 입력하세요." v-model="userPW">
			</div>
			<div :class="$style.login">
				<button class="general-background-color" v-on:click="login()">로그인</button>
			</div>
			<div :class="$style.register">
				<span>아직 회원이 아니신가요?</span>
				<router-link to="/register">
					<span>회원가입</span>
				</router-link>
			</div>
		</div>
	</div>
</template>

<style lang="scss" module>
.index {
	> .container {
		width: 440px;
		padding: 30px 30px 20px 30px;

		margin: 0 auto;
		margin-top: 50px;
		margin-bottom: 150px;

		border-radius: 12px;
		box-shadow: 0px 0px 5px 5px #ccc;

		background-color: #fff;

		> .title {
			margin-bottom: 20px;

			> img {
				width: 150px;
			}
		}

		> .input {
			padding-bottom: 10px;

			> input {
				width: 100%;
				height: 40px;

				font-size: 15px;

				padding: 10px;

				border: 0px;
				border-bottom: 1px solid #ccc;

				outline: none;
			}
		}

		> .login {
			text-align: center;

			margin-top: 20px;
			padding-bottom: 10px;
			
			> button {
				width: 100%;

				font-size: 15px;
				font-weight: bold;

				padding: 10px;

				border-radius: 7px;
				border: 0px;

				cursor: pointer;
			}
		}

		> .register {
			text-align: center;

			font-size: 15px;

			padding-bottom: 20px;

			> span {
				width: 100%;
				display: inline-block;

				font-size: 12px;

				margin-bottom: 10px;

				color: #ccc;
			}

			> a {
				text-decoration: none;

				color: black;
			}

			> a:hover {
				text-decoration: underline;
			}
		}
	}
}

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class Login extends Vue {
	userID: string = ""
	userPW: string = ""

	keydownHandler(e: KeyboardEvent) {
		if (e.key == "Enter") {
			this.login()
		}
	}

	login() {
		axios.post(process.env.VUE_APP_SERVER_ADDR + "/login", {
			id: this.userID,
			pw: this.userPW
		}).catch(this.errorHandler).then(this.successHandler)
	}

	errorHandler(error: any) {
		alert("아이디 또는 비밀번호가 일치하지 않습니다.")
	}

	successHandler(res: any) {
		if (res == null) return

		this.$store.commit("setToken", res.data.token)
		this.$router.push("/")
	}
}
</script>
