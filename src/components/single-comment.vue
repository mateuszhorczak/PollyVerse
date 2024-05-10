<script setup lang="ts">
import type { Comment } from "~/types";

const props = defineProps<Comment>();

function formatDate(dateString: Date | undefined): string {
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
</script>
<template>
	<div>
		<div class="ml-4rem">
			<p class="text-2rem text-stone-200">{{ props.user_username }}</p>
			<p class="text-1.5rem text-stone-200">{{ props.comment_text }}</p>
			<div class="mt-2rem">
				<p class="text-lg">{{ formatDate(props?.comment_date) }}</p>
			</div>
		</div>
	</div>
</template>
