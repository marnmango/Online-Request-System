<template>
	<div class="colorpage">
		<div>
			<div class="form-signin text-center">
				<img class="logosize d-block mb-2" src="@/assets/logomfu.png" />
				<div style="text-align:center;">
					<p class="fontlogo mb-0 fs-6">MAE FAH LUANG UNIVERSITY</p>
					<p class="fontlogo mt-0 fs-6">มหาวิทยาลัยแม่ฟ้าหลวง</p>
				</div>
				<form class="text-start">
					<label for="inputID" style="text-align:left">ID</label>
					<input
						type="text"
						id="inputID"
						class="form-control"
						placeholder="ID number"
						required
						autofocus
					/>
					<label for="inputPassword" class="text-left my-2">Password</label>
					<input
						type="password"
						id="inputPassword"
						class="form-control"
						placeholder="Password"
						required
					/>
					<button class="w-100 btn btn-lg btn-success mt-3" type="submit">
						Login
					</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style scoped>
.colorpage {
	color: white;
	background-color: #732f27;
	padding: 0;
	margin: 0;
	width: 100%;
	min-height: 100vh;
}
.logosize {
	width: auto;
	height: 200px;
	margin-left: auto;
	margin-right: auto;
	text-align: center;
}
.form-signin {
	width: 100%;
	max-width: 330px;
	padding: 15px;
	margin: auto;
}
.form-signin .checkbox {
	font-weight: 400;
}
.form-signin .form-control {
	position: relative;
	box-sizing: border-box;
	height: auto;
	padding: 10px;
	font-size: 16px;
}
.form-signin .form-control:focus {
	z-index: 2;
}
.form-signin input[type="email"] {
	margin-bottom: -1px;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
	margin-bottom: 10px;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}
</style>
