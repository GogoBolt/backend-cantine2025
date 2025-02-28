<template>
  <div class="max-w-md mx-auto">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Inscription</h1>
        <p class="mt-2 text-gray-600">Rejoignez GogoSoft Cantine</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-colors"
            placeholder="vous@exemple.com"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-colors"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label for="role" class="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
          <select
            id="role"
            v-model="selectedRole"
            required
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-colors"
          >
            <option v-for="role in availableRoles" :key="role.name" :value="role.name">
              {{ role.name }}
            </option>
          </select>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition-colors"
        >
          {{ loading ? 'Inscription en cours...' : 'S\'inscrire' }}
        </button>
      </form>

      <div class="mt-8 text-center">
        <p class="text-sm text-gray-600">
          Déjà un compte ?
          <NuxtLink to="/login" class="font-medium text-primary-600 hover:text-primary-700 transition-colors">
            Se connecter
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoles } from '~/composables/useRoles';
import { useAuth } from '~/composables/auth';
import { useRouter } from '#imports';

const email = ref('');
const password = ref('');
const selectedRole = ref('parent');
const loading = ref(false);

const { roles, fetchRoles } = useRoles();
const { register } = useAuth(); 
const router = useRouter();   

const availableRoles = computed(() => 
  roles.value.filter(role => ['parent', 'staff', 'teacher'].includes(role.name))
);

onMounted(async () => {
  await fetchRoles();
});

const handleRegister = async () => {
  loading.value = true;
  try {
    const success = await register(email.value, password.value, {
      defaultRole: selectedRole.value,
      metadata: {
        role: selectedRole.value
      }
    });
    
    if (success) {
      router.push('/dashboard');
    }
  } catch (error) {
    console.error('Registration error:', error);
  } finally {
    loading.value = false;
  }
};
</script>
