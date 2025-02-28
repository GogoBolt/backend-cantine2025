import { useAuth } from '~/composables/auth';
import { defineNuxtRouteMiddleware, navigateTo,  } from '#imports';

export default defineNuxtRouteMiddleware((to: { path: string; }) => {
  const { isAuthenticated } = useAuth();

  // Liste des routes publiques qui ne nécessitent pas d'authentification
  const publicRoutes = ['/login', '/register', '/'];

  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une route protégée
  if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login');
  }

  // Si l'utilisateur est authentifié et essaie d'accéder à login ou register
  if (isAuthenticated.value && ['/login', '/register'].includes(to.path)) {
    return navigateTo('/dashboard');
  }
});
