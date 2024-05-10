<script setup lang="ts">
import type { PostWithUser, Like, Comment, Bookmark } from "~/types";

const route = useRoute();
const auth = useAuthStore();
const postsStore = usePostsStore();
await postsStore.refresh();

const { data: postWithUser, refresh: refreshPost } = useFetch<PostWithUser>(`/api/posts/post/${route.params.id}`, {
	transform: ({ data }) => data,
});

const { data: commentsList, refresh: refreshComments } = useFetch<Comment[]>(`/api/posts/comments/${route.params.id}`, {
	transform: ({ data }) => data,
});

const { data: likesList, refresh: refreshLikes } = useFetch<Like[]>(`/api/posts/likes/${route.params.id}`, {
	transform: ({ data }) => data,
});

const { data: bookmarksList, refresh: refreshBookmarks } = useFetch<Bookmark[]>(`/api/posts/bookmarks/${route.params.id}`, {
	transform: ({ data }) => data,
});

const postActivity = ref<any>("");

watchEffect(async () => {
	if (auth.isLoggedIn && postWithUser.value) {
		postActivity.value = await postsStore.fetchSingleUserActivity(auth.user.id, postWithUser.value?.id);
	}
});

const postDetail = reactive({
	post: postWithUser,
	comments: commentsList,
	likes: likesList,
	bookmarks: bookmarksList,
	activity: postActivity,
});
</script>

<template>
	<div class="mt-4rem border border-gray-200 divide-y divide-gray-200">
		<single-post
			:id="postDetail.post?.id"
			:key="postDetail.post?.id"
			:username="postDetail.post?.username"
			:text="postDetail.post?.text"
			:user_id="postDetail.post?.user_id"
			:date="postDetail.post?.date"
			:comments_count="postDetail.post?.comments_count"
			:likes_count="postDetail.post?.likes_count"
			:bookmarks_count="postDetail.post?.bookmarks_count"
			:is_bookmarked="postDetail.activity?.is_bookmarked"
			:is_liked="postDetail.activity?.is_liked"
			class="px-8 py-4"
			:image="postDetail.post?.image"
		/>
	</div>
	<div class="border border-gray-200 divide-y divide-gray-200">
		<single-comment
			v-for="comment in postDetail.comments"
			:key="comment.comment_id"
			:comment_id="comment.comment_id"
			:post_id="comment.post_id"
			:comment_date="comment.comment_date"
			:comment_text="comment.comment_text"
			:user_id="comment.user_id"
			:user_username="comment.user_username"
			class="px-7 py-4"
		/>
		<comment-creation-field v-if="auth.isLoggedIn" class="px-7 py-4" :post_id="postDetail.post?.id" :refresh-comments="refreshComments" />
	</div>
</template>
