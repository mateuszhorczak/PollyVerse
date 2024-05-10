<script setup lang="ts">
import type { User } from "~/types";

const route = useRoute();
const auth = useAuthStore();
const { data: user } = useFetch<User>(`/api/user/${route.params.username}`, {
	transform: ({ data }) => data,
});
</script>

<template>
	<div class="bg-black overflow-hidden border">
		<div class="px-4 py-5 sm:px-6 flex">
			<div>
				<h3 class="text-lg leading-6 font-medium text-white">Profil użytkownika</h3>
				<p class="mt-1 max-w-2xl text-sm text-gray-300">To podstawowe informacje o użytkowniku</p>
			</div>
			<div v-if="auth.user.username === user?.username" class="ml-auto text-2xl">
				<NuxtLink to="/edit-profile">
					<icon name="mdi:account-edit" class="text-3rem ml-2rem" />
				</NuxtLink>
			</div>
		</div>
		<div class="border-t border-gray-200 px-4 py-5 sm:p-0">
			<dl class="sm:divide-y sm:divide-gray-200">
				<div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-300">Nazwa użytkownika</dt>
					<dd class="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
						{{ user?.username }}
					</dd>
				</div>
				<div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-300">Adres email</dt>
					<dd class="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
						{{ user?.email }}
					</dd>
				</div>
				<div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
					<dt class="text-sm font-medium text-gray-300">O mnie</dt>
					<dd class="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
						{{ user?.about }}
					</dd>
				</div>
			</dl>
		</div>
	</div>
</template>
