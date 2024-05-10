<script setup lang="ts">
import type { PostWithUser } from "~/types";

const auth = useAuthStore();
const router = useRouter();
if (!auth.token) {
	await router.push("/");
}

const postsStore = usePostsStore();
await postsStore.refresh();

const filteredPosts = computed(() => {
	return postsStore.posts.toReversed().filter((post: PostWithUser) => post.is_bookmarked);
});
</script>

<template>
	<div class="border border-gray-200 divide-y divide-gray-200">
		<single-post
			v-for="post in filteredPosts"
			:id="post.id"
			:key="post.id"
			:username="post.username"
			:date="post.date"
			:user_id="post.user_id"
			:text="post.text"
			:comments_count="post.comments_count"
			:likes_count="post.likes_count"
			:bookmarks_count="post.bookmarks_count"
			:is_bookmarked="post.is_bookmarked"
			:is_liked="post.is_liked"
			class="px-8 py-4"
			:image="post.image"
		/>
	</div>
</template>
