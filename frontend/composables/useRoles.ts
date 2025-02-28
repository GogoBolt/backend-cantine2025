import { useNuxtApp } from '#imports';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

interface Role {
  id: string;
  name: string;
  description: string;
}

interface RolesResponse {
  roles: Role[];
}

export const useRoles = () => {
  const { $nhost } = useNuxtApp();
  const roles = ref<Role[]>([]);
  const loading = ref(false);

  const fetchRoles = async () => {
    loading.value = true;
    try {
      const query = `
        query GetRoles {
          roles {
            id
            name
            description
          }
        }
      `;

      const response = await $nhost.graphql.request<RolesResponse>(query);

      if (response.error) {
        throw new Error(response.error.message);
      }

      roles.value = response.data.roles;
    } catch (error) {
      console.error('Erreur lors de la récupération des rôles:', error);
      toast.error('Erreur lors de la récupération des rôles');
      throw error;
    } finally {
      loading.value = false;
    }
  };

  return {
    roles,
    loading,
    fetchRoles
  };
};
