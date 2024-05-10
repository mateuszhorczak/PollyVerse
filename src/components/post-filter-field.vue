<script setup lang="ts">
const postsStore = usePostsStore();
const query = ref("");

onBeforeRouteLeave(() => {
	postsStore.query = "";
});

const submit = () => {
	postsStore.query = query.value;
};
</script>

<template>
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
		<form class="space-y-6" action="" method="POST" @submit.prevent="submit">
			<div>
				<div class="mt-2">
					<input
						id="text"
						v-model="query"
						name="text"
						type="text"
						autocomplete="text"
						placeholder="Linux"
						class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white p-0.5rem"
					/>
				</div>
			</div>
			<div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-cyan-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Szukaj
				</button>
			</div>
		</form>
	</div>
</template>
