<script setup lang="ts">
const auth = useAuthStore();
const user = ref(auth.user);
const token = ref(auth.token);

watchEffect(() => {
	user.value = auth.user;
});
</script>
<template>
	<body class="bg-neutral-900 min-h-screen">
		<div class="flex justify-around">
			<div class="mt-2rem">
				<ul class="text-left">
					<li class="text-white text-lg">
						<NuxtLink to="/">
							<img src="../public/images/polly.png" alt="logo" class="color-fuchsia w-4rem" />
						</NuxtLink>
					</li>
					<li class="text-white text-lg leading-10 mt-0.5em">
						<div class="items-center">{{ user.username }}</div>
					</li>
					<li class="text-white text-lg leading-10 mt-0.5em">
						<NuxtLink to="/" class="flex items-center">
							<Icon name="mdi:home" class="mr-1rem text-1.5rem" />
							Główna
						</NuxtLink>
					</li>
					<li class="text-white text-lg leading-10 mt-0.5em">
						<NuxtLink to="/explore" class="flex items-center">
							<Icon name="mdi:magnify" class="mr-1rem text-1.5rem" />
							Przeglądaj
						</NuxtLink>
					</li>
					<div v-if="auth.isLoggedIn">
						<li class="text-white text-lg leading-10 mt-0.5em">
							<NuxtLink to="/bookmarks" class="flex items-center">
								<Icon name="mdi:bookmark" class="mr-1rem text-1.5rem" />
								Zakładki
							</NuxtLink>
						</li>
						<li class="text-white text-lg leading-10 mt-0.5em">
							<NuxtLink :to="`/profile/${user.username}`" class="flex items-center">
								<Icon name="mdi:account-circle" class="mr-1rem text-1.5rem" />
								Profil
							</NuxtLink>
						</li>
						<li class="text-white text-lg leading-10 mt-0.5em">
							<NuxtLink to="/logout" class="flex items-center"> Wyloguj </NuxtLink>
						</li>
					</div>
					<div v-else>
						<li class="text-white text-lg leading-10 mt-0.5em">
							<NuxtLink to="/login" class="flex items-center"> Zaloguj </NuxtLink>
						</li>
						<li class="text-white text-lg leading-10 mt-0.5em">
							<NuxtLink to="/register" class="flex items-center"> Załóż konto </NuxtLink>
						</li>
					</div>
				</ul>
			</div>
			<div class="max-w-2/3 w-2/3 pt-10">
				<NuxtPage/>
			</div>
		</div>
	</body>
</template>
