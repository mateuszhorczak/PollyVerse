<script setup lang="ts">
import type { PostWithUser } from "~/types";

const props = defineProps<PostWithUser>();
const postsStore = usePostsStore();

function formatDate(dateString: Date | string | undefined): string {
	if (!dateString) {
		return "brak daty";
	}
	const date = new Date(dateString);
	const now = new Date();

	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const seconds = date.getSeconds().toString().padStart(2, "0");

	// Check if the date is today
	if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
		return `dzisiaj ${hours}:${minutes}:${seconds}`;
	}

	// Check if the date is yesterday
	const yesterday = new Date(now);
	yesterday.setDate(now.getDate() - 1);
	if (date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear()) {
		return `wczoraj ${hours}:${minutes}:${seconds}`;
	}

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function isPostsRoute(): boolean {
	const route = useRoute();
	const postsRouteRegex = /^\/posts\/\d+$/;

	return postsRouteRegex.test(route.path);
}

const handleHashtagClick = (event: MouseEvent) => {
	if (!isPostsRoute()) {
		return;
	}
	const target = event.target as HTMLElement;
	const hashtag = target.getAttribute("data-hashtag");

	if (hashtag) {
		postsStore.query = hashtag.toString();
		const router = useRouter();
		router.push("/explore");
	}
};

function highlightHashtags(text: string | undefined): string {
	if (!text) {
		return "";
	}
	const hashtagRegex = /#(\w+)/g;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const highlightedText = text.replace(hashtagRegex, (match, hashtag) => `<span class="text-blue-500" data-hashtag="${hashtag}">#${hashtag}</span>`);

	return highlightedText;
}

function getImagePath(fileName: string) {
	return "upload/" + fileName;
}

</script>
<template>
	<p class="text-1.5rem text-stone-200 whitespace-pre-line" @click="handleHashtagClick" v-html="highlightHashtags(props?.text)"></p>
	<NuxtPicture v-if="props.image" format="png" :src="getImagePath(props.image)" sizes="500" alt="post-image" class="flex justify-center" />
	<div class="mt-2rem">
		<p class="text-lg">{{ formatDate(props?.date) }}</p>
	</div>
</template>
