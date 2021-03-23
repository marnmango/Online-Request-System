<template>
	<nav>
		<div
			class="side-navbar active-nav d-flex justify-content-between flex-wrap flex-column"
			id="sidebar"
		>
			<ul class="nav flex-column text-white w-100">
				<a href="#" class="nav-link h3 text-white my-2">
					<img class="logosize d-block mb-2" src="@/assets/logomfu.png" />
					<div style="text-align:center;">
						<p class="fontlogo mb-0">MAE FAH LUANG UNIVERSITY</p>
						<p class="fontlogo mt-0">มหาวิทยาลัยแม่ฟ้าหลวง</p>
					</div>
				</a>
				<li href="#" class="nav-link">
					<span class="mx-2">New Requests</span>
				</li>
				<li href="#" class="nav-link">
					<span class="mx-2">On Process</span>
				</li>
				<li href="#" class="nav-link">
					<span class="mx-2">Approve</span>
				</li>
				<li href="#" class="nav-link">
					<span class="mx-2">Disapprove</span>
				</li>
				<li href="#" class="nav-link">
					<span class="mx-2">Payment</span>
				</li>
			</ul>
		</div>
	</nav>
</template>

<script>
export default {};
</script>

<style>
.side-navbar {
	width: 180px;
	height: 100%;
	position: fixed;
	margin-left: -300px;
	background-color: #732f27;
	transition: 0.5s;
}

.nav-link:active,
.nav-link:focus,
.nav-link:hover {
	background-color: #b6906490;
}

.active-nav {
	margin-left: 0;
}

.logosize {
	width: auto;
	height: 110px;
	margin-left: auto;
	margin-right: auto;
	text-align: center;
}

.fontlogo {
	font-size: 10px;
}
</style>
