export default defineNuxtRouteMiddleware(async (to, from) => {
  const { fetchUser, setUser } = useDirectusAuth();
  const user = useDirectusUser();
  if (!user.value) {
    const user = await fetchUser();
    setUser(user.value);
  }
  if (!user.value) {
    return navigateTo('/login');
  }
});
