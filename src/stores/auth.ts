import { useLocalStorage } from "@vueuse/core";
import type { User } from "~/types";
const emptyUser: User = {
	id: 0,
	username: "",
	email: "",
	password: "",
};

export const useAuthStore = defineStore("auth", () => {
	const token = useLocalStorage("auth: token", "");
	const user = useLocalStorage("auth: [[user]]", emptyUser);

	const login = async (username: string, password: string) => {
		const data = await $fetch<{ token: string; user: User }>("/api/auth/login", {
			method: "POST",
			body: { username, password },
		});
		if (data.token) {
			token.value = data.token;
			user.value = data.user;
		}
	};

	const register = async (username: string, password: string, email: string) => {
		const data = await $fetch("/api/auth/register", {
			method: "POST",
			body: { username, password, email },
		});
	};

	const logout = () => {
		token.value = "";
		user.value = emptyUser;
	};

	const isLoggedIn = computed(() => token.value !== "");

	return {
		login,
		logout,
		register,
		isLoggedIn,
		user,
		token,
	};
});

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
