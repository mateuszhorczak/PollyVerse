import type { NewComment, PostWithUser, Post } from "~/types";
export const usePostsStore = defineStore("postsStore", () => {
	const query = ref("");

	const {
		data: posts,
		refresh,
		error,
	} = useFetch("/api/posts", {
		query: { q: query },
		transform: ({ data }) => data,
		default: () => [],
	});

	const fetchUserActivity = async () => {
		if (posts.value) {
			// @ts-ignore
			for (let post: PostWithUser of posts.value) {
				const { data: isBookmarked } = await useFetch("/api/posts/bookmarks", {
					query: { post_id: post?.id, user_id: auth.user.id },
					transform: ({ data }) => data,
				});
				post.is_bookmarked = isBookmarked.value?.bookmarkExists;

				const { data: isLiked } = await useFetch("/api/posts/likes", {
					query: { post_id: post?.id, user_id: auth.user.id },
					transform: ({ data }) => data,
				});
				post.is_liked = isLiked.value?.likeExists;
			}
		}
	};

	// eslint-disable-next-line camelcase
	const fetchSingleUserActivity = async (user_id: number, post_id: number) => {
		const postActivity = reactive({
			is_bookmarked: false,
			is_liked: false,
		});
		if (posts.value) {
			const { data: isBookmarked } = await useFetch("/api/posts/bookmarks", {
				// eslint-disable-next-line camelcase
				query: { post_id, user_id },
				transform: ({ data }) => data,
			});
			// @ts-ignore
			postActivity.is_bookmarked = isBookmarked.value?.bookmarkExists;

			const { data: isLiked } = await useFetch("/api/posts/likes", {
				// eslint-disable-next-line camelcase
				query: { post_id, user_id },
				transform: ({ data }) => data,
			});
			// @ts-ignore
			postActivity.is_liked = isLiked.value?.likeExists;
			return postActivity;
		}
	};

	const auth = useAuthStore();
	watchEffect(async () => {
		if (auth.isLoggedIn) {
			await fetchUserActivity();
		} else {
			for (let post of posts.value) {
				post.is_bookmarked = false;
				post.is_liked = false;
			}
		}
	});

	watchEffect(() => {
		if (!error.value) return;
		console.error("Error fetching posts", error.value);
	});

	const getPostById = async (id: string | string[]): Promise<PostWithUser | null> => {
		await refresh();

		// @ts-ignore
		if (!posts.value || posts.value?.length === 0) {
			console.error("Brak postów lub posts niezainicjowane.");
			return null;
		}

		// @ts-ignore
		for (let post of posts.value) {
			if (Array.isArray(id) ? id.includes(post.id) : post.id == id) {
				// TODO tu trzeba coś sparsować bo na === nie działa, jakis problem typow pewnie
				return post;
			}
		}
		return null;
	};

	const addPost = async (newPost: FormData) => {
		await $fetch("/api/posts", {
			method: "POST",
			body: newPost,
		}).catch((err) => console.error(err));

		await refresh();
	};

	const editPost = async (post: Post) => {
		await $fetch("/api/posts", {
			method: "PATCH",
			body: post,
		})
			.then(() => {
				const router = useRouter();
				router.push(`/posts/${post.id}`);
			})
			.catch((err) => console.error(err));

		await refresh();
	};

	const addComment = async (newComment: NewComment) => {
		await $fetch("/api/posts/comments", {
			method: "POST",
			body: newComment,
		}).catch((err) => console.error(err));

		await refresh();
	};

	return {
		posts,
		query,
		addPost,
		editPost,
		addComment,
		getPostById,
		fetchSingleUserActivity,
		refresh,
	};
});
