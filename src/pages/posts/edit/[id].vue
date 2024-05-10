<script setup lang="ts">
const auth = useAuthStore();
</script>

<template>
	<div class="min-w-[524px] border-1 border-gray-200">
		<div>
			<post-edit-field v-if="auth.isLoggedIn" class="mb-4rem" />
		</div>
	</div>
</template>
