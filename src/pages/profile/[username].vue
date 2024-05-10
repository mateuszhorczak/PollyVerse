<script setup lang="ts">
import type { PostWithUser } from "~/types";

const route = useRoute();
const postsStore = usePostsStore();
await postsStore.refresh();

const userPosts = computed(() => {
	return postsStore.posts.toReversed().filter((post: PostWithUser) => post.username === route.params.username);
});
</script>

<template>
	<profile-card />
	<div class="border border-gray-200 divide-y divide-gray-200">
		<single-post
			v-for="post in userPosts"
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
