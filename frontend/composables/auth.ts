import { useNuxtApp } from '#imports';
import { ref, computed } from 'vue';
import { toast } from 'vue3-toastify';
import type { NhostUser, SignUpParams } from '@nhost/nhost-js';

interface UserMetadata {
  [key: string]: unknown;
  role?: string;
  avatarUrl?: string;
  location?: {
    city: string;
    district: string;
  };
}

interface UpdateProfileData {
  displayName?: string;
  phoneNumber?: string;
  metadata?: Record<string, any>;
}

const isAuthenticated = ref(false);
const user = ref<NhostUser | null>(null);
const loading = ref(false);

export const useAuth = () => {
  const { $nhost } = useNuxtApp();

  const login = async (email: string, password: string) => {
    loading.value = true;
    try {
      const { session, error } = await $nhost.auth.signIn({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (session) {
        isAuthenticated.value = true;
        user.value = session.user;
        toast.success('Connexion réussie');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error('Erreur lors de la connexion');
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const register = async (email: string, password: string, options?: SignUpParams['options']): Promise<boolean> => {
    loading.value = true;
    try {
      const { session, error } = await $nhost.auth.signUp({
        email,
        password,
        options
      });

      if (error) {
        throw error;
      }

      if (session) {
        isAuthenticated.value = true;
        user.value = session.user;
        toast.success('Inscription réussie');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      toast.error('Erreur lors de l\'inscription');
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    try {
      const { error } = await $nhost.auth.signOut();

      if (error) {
        throw error;
      }

      isAuthenticated.value = false;
      user.value = null;
      toast.success('Déconnexion réussie');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      toast.error('Erreur lors de la déconnexion');
      throw error;
    } finally {
      loading.value = false;
    }
  };

  const updateProfile = async (data: UpdateProfileData): Promise<boolean> => {
    try {
      const mutation = `
        mutation updateUser($id: uuid!, $metadata: jsonb) {
          update_auth_users_by_pk(pk_columns: {id: $id}, _set: {metadata: $metadata}) {
            id
          }
        }
      `;

      const variables = {
        id: user.value?.id,
        metadata: data.metadata || {}
      };

      const { error } = await $nhost.graphql.request(mutation, variables);

      if (error) {
        toast.error(error);
        return false;
      }

      toast.success('Profil mis à jour avec succès');
      return true;
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la mise à jour du profil');
      return false;
    }
  };

  const currentUser = computed(() => user.value);

  const getUserRole = computed(() => {
    return (user.value?.metadata as UserMetadata)?.role || 'guest';
  });

  return {
    isAuthenticated,
    user: currentUser,
    loading: computed(() => loading.value),
    login,
    register,
    logout,
    updateProfile,
    getUserRole
  };
};
