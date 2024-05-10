<script setup lang="ts">
import type { PostWithUser } from "~/types";

const auth = useAuthStore();
const postsStore = usePostsStore();
const route = useRoute();

const { data: postWithUser } = useFetch<PostWithUser>(`/api/posts/post/${route.params.id}`, {
	transform: ({ data }) => data,
});

const post = reactive({
	id: "",
	text: "",
	date: new Date(),
	image: "",
});

watchEffect(() => {
	if (postWithUser.value) {
		post.text = postWithUser.value.text;
		post.id = route.params.id;
	}
});

const textError = ref("");
function validateText() {
	if (post.text !== "") {
		if (post.text.length > 200) {
			textError.value = "Za długa treść! Maksymalnie 200 znaków";
			return false;
		} else {
			textError.value = "";
			return true;
		}
	} else {
		textError.value = "";
		return false;
	}
}

watch(post, () => {
	validateText();
});

const editPost = async () => {
	if (!auth.token) {
		return;
	}

	post.text = post.text.trim();

	if (!post.text) {
		console.error("Dodaj tresc posta");
		return;
	}
	if (!validateText()) {
		console.error("Post jest za długi! Maksymalna długość postu to 200 znaków.");
		return;
	}

	post.date = new Date();
	await postsStore.editPost(post);
	post.text = "";
};
</script>

<template>
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
		<form class="space-y-6" action="" method="POST" @submit.prevent="editPost">
			<div>
				<div class="mt-2">
					<textarea
						id="text"
						v-model="post.text"
						name="text"
						autocomplete="text"
						required
						placeholder="Co się dzieje?"
						class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white p-0.5rem overflow-y-auto"
					></textarea>
				</div>
			</div>
			<div>
				<div v-if="textError" class="font-semibold text-rose-600 m-1rem">
					{{ textError }}
				</div>
				<button
					type="submit"
					class="flex w-full justify-center rounded-md bg-cyan-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Edytuj wpis
				</button>
			</div>
		</form>
	</div>
</template>
