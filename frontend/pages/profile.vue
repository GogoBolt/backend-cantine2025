<template>
  <div class="max-w-md mx-auto">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Profil</h1>
        <p class="mt-2 text-gray-600">Gérez vos informations personnelles</p>
      </div>

      <form @submit.prevent="handleUpdateProfile" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            disabled
            class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label for="role" class="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
          <input
            id="role"
            v-model="selectedRole"
            disabled
            class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Nom</label>
          <input
            id="name"
            v-model="name"
            type="text"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-colors"
            placeholder="Votre nom"
          />
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
          <input
            id="phone"
            v-model="phone"
            type="tel"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-colors"
            placeholder="Votre numéro de téléphone"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition-colors"
        >
          {{ loading ? 'Mise à jour...' : 'Mettre à jour' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuth } from '~/composables/auth';
import { toast } from 'vue3-toastify';

const { user, updateProfile } = useAuth();
const email = ref('');
const name = ref('');
const phone = ref('');
const selectedRole = ref('');
const loading = ref(false);

onMounted(async () => {
  if (user.value) {
    email.value = user.value.email;
    name.value = user.value.displayName || '';
    phone.value = user.value.metadata?.phone || '';
    selectedRole.value = user.value.metadata?.role || '';
  }
});

const handleUpdateProfile = async () => {
  loading.value = true;
  try {
    const success = await updateProfile({
      displayName: name.value,
      metadata: {
        phone: phone.value,
        role: selectedRole.value
      }
    });

    if (success) {
      toast.success('Profil mis à jour avec succès');
    }
  } catch (error) {
    console.error('Profile update error:', error);
    toast.error('Erreur lors de la mise à jour du profil');
  } finally {
    loading.value = false;
  }
};
</script>
