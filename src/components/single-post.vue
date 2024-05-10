<script setup lang="ts">
import type { PostWithUser } from "~/types";

const props = defineProps<PostWithUser>();
const auth = useAuthStore();

function isPostsRoute(): boolean {
	const route = useRoute();
	const postsRouteRegex = /^\/posts\/\d+$/;

	return postsRouteRegex.test(route.path);
}

const reactivePostParams = reactive({
	isLiked: props.is_liked,
	isBookmarked: props.is_bookmarked,
	likesCount: props.likes_count,
	commentsCount: props.comments_count,
	bookmarksCount: props.bookmarks_count,
});

watch(props, () => {
	reactivePostParams.isLiked = props.is_liked;
	reactivePostParams.isBookmarked = props.is_bookmarked;
});

function isAuthor(): boolean {
	return props.user_id === auth.user.id;
}

const likeIsClickedBefore = ref(false);
const bookmarkIsClickedBefore = ref(false);

// check if like was clicked now or before the page was loaded
function likeFirstClick() {
	if (!likeIsClickedBefore.value && !reactivePostParams.isLiked) {
		likeIsClickedBefore.value = true;
	}
}

// check if bookmark was clicked now or before the page was loaded
function bookmarkFirstClick() {
	if (!bookmarkIsClickedBefore.value && !reactivePostParams.isBookmarked) {
		bookmarkIsClickedBefore.value = true;
	}
}

const likePost = async () => {
	if (!auth.token) {
		return;
	}
	likeFirstClick();
	if (reactivePostParams.isLiked) {
		reactivePostParams.likesCount -= 1;
		await $fetch("/api/posts/likes", {
			method: "DELETE",
			body: {
				post_id: props.id,
				user_id: auth.user.id,
			},
		}).catch((err) => console.error(err));
	} else {
		reactivePostParams.likesCount += 1;
		await $fetch("/api/posts/likes", {
			method: "POST",
			body: {
				post_id: props.id,
				user_id: auth.user.id,
			},
		}).catch((err) => console.error(err));
	}
	reactivePostParams.isLiked = !reactivePostParams.isLiked;
};

const bookmarkPost = async () => {
	if (!auth.token) {
		return;
	}
	bookmarkFirstClick();
	if (reactivePostParams.isBookmarked) {
		reactivePostParams.bookmarksCount -= 1;
		await $fetch("/api/posts/bookmarks", {
			method: "DELETE",
			body: {
				post_id: props.id,
				user_id: auth.user.id,
			},
		}).catch((err) => console.error(err));
	} else {
		reactivePostParams.bookmarksCount += 1;
		await $fetch("/api/posts/bookmarks", {
			method: "POST",
			body: {
				post_id: props.id,
				user_id: auth.user.id,
			},
		}).catch((err) => console.error(err));
	}
	reactivePostParams.isBookmarked = !reactivePostParams.isBookmarked;
};

const deletePost = async () => {
	if (!auth.token) {
		return;
	}
	if (auth.user.id !== props.user_id) {
		return;
	}

	await $fetch("/api/posts", {
		method: "DELETE",
		body: {
			post_id: props.id,
		},
	}).catch((err) => console.error(err));

	const router = useRouter();
	await router.push("/");
};
</script>
<template>
	<div>
		<div class="flex justify-between">
			<NuxtLink :to="`/profile/${props.username}`">
				<p class="text-2rem text-stone-200">{{ props.username }}</p>
			</NuxtLink>
			<div v-if="isAuthor() && isPostsRoute()" class="flex">
				<NuxtLink :to="`/posts/edit/${props.id}`" class="flex items-center">
					<Icon name="mdi:lead-pencil" class="mr-2rem text-2rem" />
				</NuxtLink>
				<div class="flex items-center" @click="deletePost">
					<Icon name="mdi:delete" class="mr-2rem text-2rem" />
				</div>
			</div>
		</div>
		<NuxtLink v-if="!isPostsRoute()" :to="`/posts/${id}`">
			<post-container
				:id="props.id"
				:username="props.username"
				:date="props.date"
				:user_id="props.user_id"
				:text="props.text"
				:comments_count="props.comments_count"
				:likes_count="props.likes_count"
				:bookmarks_count="props.bookmarks_count"
				:is_bookmarked="props.is_bookmarked"
				:is_liked="props.is_liked"
				:image="props.image"
			/>
		</NuxtLink>
		<post-container
			v-else
			:id="props.id"
			:username="props.username"
			:date="props.date"
			:user_id="props.user_id"
			:text="props.text"
			:comments_count="props.comments_count"
			:likes_count="props.likes_count"
			:bookmarks_count="props.bookmarks_count"
			:is_bookmarked="props.is_bookmarked"
			:is_liked="props.is_liked"
			:image="props.image"
		/>
		<div class="flex">
			<div @click="likePost">
				<icon v-if="reactivePostParams.isLiked && likeIsClickedBefore" name="mdi:cards-heart" class="text-1.5rem text-red animate-heart-beat" />
				<icon v-else-if="reactivePostParams.isLiked" name="mdi:cards-heart" class="text-1.5rem text-red" />
				<icon v-else name="mdi:cards-heart-outline" class="text-1.5rem" />
			</div>
			<p class="text-1.2rem ml-0.5rem">{{ reactivePostParams.likesCount }}</p>
			<icon name="mdi:comment" class="text-1.5rem ml-2rem" />
			<p class="text-1.2rem ml-0.5rem">{{ reactivePostParams.commentsCount }}</p>
			<div @click="bookmarkPost">
				<icon v-if="reactivePostParams.isBookmarked && bookmarkIsClickedBefore" name="mdi:bookmark" class="text-1.5rem ml-2rem text-cyan animate-flip" />
				<icon v-else-if="reactivePostParams.isBookmarked" name="mdi:bookmark" class="text-1.5rem ml-2rem text-cyan" />
				<icon v-else name="mdi:bookmark" class="text-1.5rem ml-2rem" />
			</div>
			<p class="text-1.2rem ml-0.5rem">{{ reactivePostParams.bookmarksCount }}</p>
		</div>
	</div>
</template>
