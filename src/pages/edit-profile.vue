<script setup lang="ts">
import type { User } from "~/types";

const auth = useAuthStore();
const router = useRouter();
if (!auth.token) {
	await router.push("/");
}

const { data: user } = useFetch<User>(`/api/user/${auth.user.username}`, {
	transform: ({ data }) => data,
});
const editedUser = reactive({
	id: 0,
	username: "",
	email: "",
	about: "",
});

watch(user, () => {
	if (user.value) {
		editedUser.id = user.value?.id;
		editedUser.username = user.value?.username;
		editedUser.email = user.value?.email;
		editedUser.about = user.value?.about;
	}
});
const password = ref("");
const password2 = ref("");

const editProfile = async () => {
	await $fetch("/api/user", {
		method: "PATCH",
		body: {
			id: editedUser.id,
			username: editedUser.username,
			email: editedUser.email,
			about: editedUser.about,
		},
	})
		.then(() => {
			auth.user.username = editedUser.username;
			auth.user.email = editedUser.email;
			const router = useRouter();
			router.push(`/profile/${editedUser.username}`);
		})
		.catch((err) => console.error(err));
};

const changePassword = async () => {
	if (password.value !== password2.value) {
		return;
	}

	await $fetch("/api/auth/change-password", {
		method: "PATCH",
		body: {
			id: editedUser.id,
			password: password.value,
		},
	})
		.then(() => {
			const router = useRouter();
			auth.logout();
			router.push("/login");
		})
		.catch((err) => console.error(err));
};
</script>

<template>
	<div class="bg-black overflow-hidden border">
		<div class="px-4 py-5 sm:px-6">
			<h3 class="text-lg leading-6 font-medium text-white">Profil użytkownika</h3>
			<p class="mt-1 max-w-2xl text-sm text-gray-300">To podstawowe informacje o użytkowniku</p>
		</div>
		<div class="border-t border-gray-200 px-4 py-5 sm:p-0">
			<form @submit.prevent="editProfile">
				<dl class="">
					<div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt class="text-sm font-medium text-gray-300">Nazwa użytkownika</dt>
						<dd class="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
							<input v-model="editedUser.username" class="px-1rem py-0.5rem" />
						</dd>
					</div>
					<div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt class="text-sm font-medium text-gray-300">Adres email</dt>
						<dd class="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
							<input v-model="editedUser.email" class="px-1rem py-0.5rem" />
						</dd>
					</div>
					<div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt class="text-sm font-medium text-gray-300">O mnie</dt>
						<dd class="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
							<input v-model="editedUser.about" class="px-1rem py-0.5rem" />
						</dd>
					</div>
					<div class="py-3 sm:py-5 sm:px-6 flex">
						<button
							type="submit"
							class="mx-auto w-1/2 justify-center rounded-md bg-cyan-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Potwierdź
						</button>
					</div>
				</dl>
			</form>
			<form @submit.prevent="changePassword">
				<dl>
					<div class="border-gray-200 border-t-1 py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt class="text-sm font-medium text-gray-300">Hasło</dt>
						<dd class="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
							<input v-model="password" type="password" class="px-1rem py-0.5rem" />
						</dd>
					</div>
					<div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt class="text-sm font-medium text-gray-300">Powtórz hasło</dt>
						<dd class="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
							<input v-model="password2" type="password" class="px-1rem py-0.5rem" />
						</dd>
					</div>
					<div class="py-3 sm:py-5 sm:px-6 flex">
						<button
							type="submit"
							class="mx-auto w-1/2 justify-center rounded-md bg-cyan-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Potwierdź
						</button>
					</div>
				</dl>
			</form>
		</div>
	</div>
</template>
