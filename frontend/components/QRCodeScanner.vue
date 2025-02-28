<template>
  <div class="qr-scanner">
    <qrcode-stream @decode="onDecode" @init="onInit">
      <div class="overlay" v-if="error">
        {{ error }}
      </div>
    </qrcode-stream>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

interface QRCodeError extends Error {
  name: 'NotAllowedError' | 'NotFoundError' | 'NotReadableError' | 'OverconstrainedError';
  message: string;
}

const error = ref('');

const emit = defineEmits<{
  (e: 'scanned', value: string): void
}>();

const onDecode = (decodedString: string) => {
  emit('scanned', decodedString);
};

const onInit = async (promise: Promise<MediaStream>) => {
  try {
    await promise;
  } catch (e) {
    const qrError = e as QRCodeError;
    if (qrError.name === 'NotAllowedError') {
      error.value = "L'accès à la caméra a été refusé";
      toast.error("L'accès à la caméra a été refusé");
    } else if (qrError.name === 'NotFoundError') {
      error.value = 'Aucune caméra n\'a été trouvée';
      toast.error('Aucune caméra n\'a été trouvée');
    } else {
      error.value = 'Erreur lors de l\'initialisation de la caméra';
      toast.error('Erreur lors de l\'initialisation de la caméra');
      console.error('QR Code error:', qrError);
    }
  }
};
</script>

<style scoped>
.qr-scanner {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  padding: 1rem;
}
</style>