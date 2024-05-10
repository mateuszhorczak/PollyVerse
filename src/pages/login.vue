<script setup lang="ts">
const router = useRouter();
const auth = useAuthStore();
if (auth.token) {
	await router.push("/");
}
</script>

<template>
	<div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 min-w-[524px]">
		<div class="sm:mx-auto sm:w-full sm:max-w-sm">
			<h1 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Zaloguj się</h1>
		</div>

		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
			<login-form />
		</div>
	</div>
</template>
