<script setup lang="ts">
const auth = useAuthStore();
</script>

<template>
	<div class="min-w-[524px] border-1 border-gray-200 border-b-0 min-h-screen">
		<div>
			<post-creation-field v-if="auth.isLoggedIn" class="mb-4rem" />
			<board />
		</div>
	</div>
</template>
