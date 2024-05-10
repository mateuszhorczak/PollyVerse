<script setup lang="ts">
const user = reactive({
	username: "",
	email: "",
	password: "",
	password2: "",
});

const passwordError = ref("");
const passwordMatchError = ref("");
const emailError = ref("");
const usernameError = ref("");

function validatePasswordMatch() {
	if (user.password !== "" || user.password2 !== "") {
		if (user.password !== user.password2) {
			passwordMatchError.value = "Hasła nie są takie same";
			return false;
		} else {
			passwordMatchError.value = "";
			return true;
		}
	} else {
		passwordMatchError.value = "";
	}
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateEmail() {
	if (user.email !== "") {
		if (!emailRegex.test(user.email)) {
			emailError.value = "Nieprawidłowy adres e-mail";
			return false;
		} else {
			emailError.value = "";
			return true;
		}
	} else {
		emailError.value = "";
	}
}

function validatePassword() {
	if (user.password !== "") {
		if (user.password.length < 8) {
			passwordError.value = "Hasło musi mieć co najmniej 8 znaków.";
			return false;
		} else if (!/[A-Z]/.test(user.password)) {
			passwordError.value = "Hasło musi zawierać co najmniej jedną dużą literę.";
			return false;
		} else if (!/\d/.test(user.password)) {
			passwordError.value = "Hasło musi zawierać co najmniej jedną cyfrę.";
			return false;
		} else {
			passwordError.value = "";
			return true;
		}
	} else {
		passwordError.value = "";
	}
}

function validateUsername() {
	if (user.username !== "") {
		if (user.username.length < 5) {
			usernameError.value = "Nazwa musi składać się przynajmniej z 5 znaków";
			return false;
		} else {
			usernameError.value = "";
			return true;
		}
	} else {
		usernameError.value = "";
	}
}

watch(user, () => {
	validatePassword();
	validatePasswordMatch();
	validateEmail();
	validateUsername();
});

const register = async () => {
	if (!user.username || !user.email || !user.password || !user.password2) {
		console.error("Wszystkie pola są wymagane");
		return;
	}

	if (!validatePasswordMatch()) {
		console.error(passwordMatchError);
		return;
	}

	if (!validatePassword()) {
		console.error(passwordError);
		return;
	}

	if (!validateEmail()) {
		console.error(emailError);
		return;
	}

	if (!validateUsername()) {
		console.error(usernameError);
		return;
	}

	const router = useRouter();
	const auth = useAuthStore();

	await auth.register(user.username, user.password, user.email).catch((err) => console.error(err.data));

	await router.push("/login");
};
</script>

<template>
	<form method="POST" class="space-y-6" @submit.prevent="register">
		<div>
			<label for="username" class="block text-sm font-medium leading-6 text-white">Nazwa użytkownika</label>
			<div class="mt-2">
				<div v-if="usernameError" class="font-semibold text-rose-600">
					{{ usernameError }}
				</div>
				<input
					v-model="user.username"
					id="username"
					name="username"
					type="text"
					autocomplete=""
					required
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white p-0.5rem"
				/>
			</div>
		</div>

		<div>
			<label for="email" class="block text-sm font-medium leading-6 text-white">Adres email</label>
			<div class="mt-2">
				<div v-if="emailError" class="font-semibold text-rose-600">
					{{ emailError }}
				</div>
				<input
					v-model="user.email"
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					required
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white p-0.5rem"
				/>
			</div>
		</div>

		<div>
			<div class="flex items-center justify-between">
				<label for="password" class="block text-sm font-medium leading-6 text-white">Hasło</label>
			</div>
			<div class="mt-2">
				<div v-if="passwordError" class="font-semibold text-rose-600">
					{{ passwordError }}
				</div>
				<input
					v-model="user.password"
					id="password"
					name="password"
					type="password"
					autocomplete="new-password"
					required
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white p-0.5rem"
				/>
			</div>
		</div>

		<div>
			<div class="flex items-center justify-between">
				<label for="password2" class="block text-sm font-medium leading-6 text-white">Powtórz Hasło</label>
			</div>
			<div class="mt-2">
				<div v-if="passwordMatchError" class="font-semibold text-rose-600">
					{{ passwordMatchError }}
				</div>
				<input
					v-model="user.password2"
					id="password2"
					name="password2"
					type="password"
					autocomplete="new-password"
					required
					class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white p-0.5rem"
				/>
			</div>
		</div>

		<div>
			<button
				type="submit"
				class="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
			>
				Zarejestruj się
			</button>
		</div>
	</form>

	<p class="mt-10 text-center text-sm text-gray-500">
		Posiadasz konto?
		{{ " " }}
		<NuxtLink to="/login" class="font-semibold leading-6 text-cyan-500 hover:text-cyan-600">Zaloguj się </NuxtLink>
	</p>
</template>
