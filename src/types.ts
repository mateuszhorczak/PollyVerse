export interface PostWithUser {
	id: number;
	text: string;
	user_id: number;
	date: Date | string;
	username: string;
	comments_count: number;
	likes_count: number;
	bookmarks_count: number;
	is_bookmarked: boolean;
	is_liked: boolean;
	image: string,
}

export interface Comment {
	comment_id: number;
	post_id: number;
	comment_date: Date | string;
	comment_text: string;
	user_id: number;
	user_username: string;
}

export interface Like {
	like_id: number;
	post_id: number;
	user_id: number;
	user_username: string;
}

export interface Bookmark {
	bookmark_id: number;
	post_id: number;
	user_id: number;
}

export interface PostDetails {
	post: PostWithUser | null;
	comments: Comment[] | null;
	likes: Like[] | null;
}

export interface Post {
	id: number | string;
	text: string;
	date: Date | string;
}

export interface NewComment {
	post_id: number;
	user_id: number;
	text: string;
	date: Date | string;
}

export interface User {
	id: number;
	username: string;
	password: string;
	email: string;
	about: string;
}
