<script setup lang="ts">
const auth = useAuthStore();
const postsStore = usePostsStore();

const fileInput = ref(null);

const newPost = reactive({
	user_id: auth.user.id,
	text: "",
	date: new Date(),
	image: new File([], ""),
});

const textError = ref("");
function validateText() {
	if (newPost.text !== "") {
		if (newPost.text.length > 200) {
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

watch(newPost, () => {
	validateText();
});

const addPost = async () => {
	if (!auth.token) {
		return;
	}

	newPost.text = newPost.text.trim();

	if (!newPost.text) {
		console.error("Dodaj tresc posta");
		return;
	}
	if (!validateText()) {
		console.error("Post jest za długi! Maksymalna długość postu to 200 znaków.");
		return;
	}

	const file = fileInput?.value?.files[0];

	if (file) {
		newPost.image = file;
	}

	const formData = new FormData();
	formData.append("user_id", newPost.user_id.toString());
	formData.append("text", newPost.text);
	formData.append("date", new Date().toString());
	formData.append("image", newPost.image);

	await postsStore.addPost(formData);
	newPost.text = "";
};
</script>

<template>
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-2xl">
		<form class="space-y-6" action="" method="POST" @submit.prevent="addPost">
			<div>
				<div class="mt-2">
					<textarea
						id="text"
						v-model="newPost.text"
						name="text"
						autocomplete="text"
						required
						placeholder="Co się dzieje?"
						class="mb-1rem block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white p-0.5rem overflow-y-auto"
					></textarea>
					<label>Możesz wgrać zdjęcie: </label>
					<input name="file" ref="fileInput" type="file" accept="image/png" />
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
					Opublikuj wpis
				</button>
			</div>
		</form>
	</div>
</template>
