<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const user = reactive({
	username: "",
	password: "",
});

const router = useRouter();

const loginError = ref("");

const login = async () => {
	if (!user.username || !user.password) {
		console.error("Wszystkie pola są wymagane");
		return;
	}
	const auth = useAuthStore();
	await auth.login(user.username, user.password).catch(async (err) => {
		console.error(err.data);
		loginError.value = "Nie udana próba logowania! Spróbuj ponownie!";
		const errorTime = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
		await errorTime(3000);
		loginError.value = "";
	});
	if (auth.isLoggedIn) {
		await router.push("/");
	}
};
</script>

<template>
	<form method="POST" class="space-y-6" @submit.prevent="login">
		<div>
			<label for="username" class="block text-sm font-medium leading-6 text-white">Nazwa użytkownika</label>
			<div class="mt-2">
				<input
					id="username"
					v-model="user.username"
					name="username"
					type="text"
					autocomplete="username"
					required
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white p-0.5rem"
				/>
			</div>
		</div>

		<div>
			<div class="flex items-center justify-between">
				<label for="password" class="block text-sm font-medium leading-6 text-white">Hasło</label>
				<div class="text-sm">
<!--					<NuxtLink to="/resetPassword" class="font-semibold text-cyan-500 hover:text-cyan-600"> Zapomniałeś hasła? </NuxtLink>-->
				</div>
			</div>
			<div class="mt-2">
				<input
					id="password"
					v-model="user.password"
					name="password"
					type="password"
					autocomplete="current-password"
					required
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white p-0.5rem"
				/>
			</div>
		</div>

		<div class="mt-2">
			<div v-if="loginError" class="font-bold text-lg animate-rubber-band text-rose-500">
				{{ loginError }}
			</div>
			<button
				type="submit"
				class="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
			>
				Zaloguj się
			</button>
		</div>
	</form>

	<p class="mt-10 text-center text-sm text-gray-500">
		Nie masz konta?
		{{ " " }}
		<NuxtLink to="/register" class="font-semibold leading-6 text-cyan-500 hover:text-cyan-600">Zarejestruj się </NuxtLink>
	</p>
</template>
