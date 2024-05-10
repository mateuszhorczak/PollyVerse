<script setup lang="ts">
interface PostParams {
	post_id: number;
	refreshComments: any;
}
const props = defineProps<PostParams>();
const auth = useAuthStore();

const newComment = reactive({
	user_id: auth.user.id,
	post_id: 0,
	text: "",
	date: new Date(),
});

const postsStore = usePostsStore();

const addComment = async () => {
	if (!auth.token) {
		return;
	}
	if (!newComment.text) {
		console.error("Dodaj tresc komentarza");
		return;
	}
	newComment.date = new Date();
	newComment.post_id = props.post_id;
	await postsStore.addComment(newComment);
	newComment.text = "";
	await props.refreshComments();
};
</script>

<template>
	<div class="mt-10 sm:mr-auto sm:w-full sm:max-w-full">
		<form class="space-y-6" action="" method="POST" @submit.prevent="addComment">
			<div>
				<div class="mt-2">
					<input
						id="text"
						v-model="newComment.text"
						name="text"
						type="text"
						autocomplete="text"
						required
						placeholder="Dobrze gadasz gomez"
						class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white p-0.5rem"
					/>
				</div>
			</div>
			<div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-cyan-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Opublikuj komentarz
				</button>
			</div>
		</form>
	</div>
</template>
