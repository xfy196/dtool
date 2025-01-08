<script setup lang="ts">
  import { Copy } from '@vicons/tabler';
  import { pki } from 'node-forge';
  import workerScript from 'node-forge/dist/prime.worker.min?url';
  import { useCopy } from '@/composable/copy';
  import { ref, watch } from 'vue';
  import { computedRefreshableAsync } from '@/composable/computedRefreshable';
  const bits = ref(2048);

  const generateKeyPair = async ({ bits = 2048 }) => {
    return new Promise<pki.rsa.KeyPair>((resolve, reject) => {
      pki.rsa.generateKeyPair(
        { bits, workerScript },
        (err: any, keypair: pki.rsa.KeyPair) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(keypair);
        }
      );
    });
  };
  const emptyCerts = ref({ publicKeyPem: '', privateKeyPem: '' });
  const [certs, handeleRefreshKeyPair] = computedRefreshableAsync(async () => {
    try {
      const { publicKey, privateKey } = await generateKeyPair({
        bits: bits.value
      });

      const privateKeyPem = pki.privateKeyToPem(privateKey);
      const publicKeyPem = pki.publicKeyToPem(publicKey);
      return { publicKeyPem, privateKeyPem };
    } catch (error) {
      return { publicKeyPem: '', privateKeyPem: '' };
    }
  }, emptyCerts.value);

  const {
    copy: handleCopyPublicKey,
    isSupported,
    copied: publicKeyCopied
  } = useCopy({
    source: certs.value.publicKeyPem,
    isToast: false
  });
  const { copy: handleCopyPrivateKey, copied: privateKeyCopied } = useCopy({
    source: certs.value.privateKeyPem,
    isToast: false
  });
</script>

<template>
  <div style="flex: 0 0 100%">
    <div class="flex gap-3 mx-auto max-w-[600px]">
      <n-form-item label-placement="left" label="Bits:">
        <n-space>
          <n-input-number
            :min="512"
            :max="16384"
            :step="8"
            v-model:value="bits"
          />
          <n-button tertiary @click.stop="handeleRefreshKeyPair"
            >Refresh key-pair</n-button
          >
        </n-space>
      </n-form-item>
    </div>
  </div>
  <n-card title="Private key">
    <template v-if="certs.publicKeyPem" #header-extra>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            v-if="isSupported"
            @click.stop="handleCopyPublicKey(certs.publicKeyPem)"
            circle
            tertiary
          >
            <template #icon>
              <n-icon><Copy /></n-icon>
            </template>
          </n-button>
        </template>
        {{ publicKeyCopied ? 'Copied!' : 'Copy to clipboard' }}
      </n-tooltip>
    </template>
    {{ certs.publicKeyPem }}
  </n-card>
  <n-card title="Public key">
    <template v-if="certs.privateKeyPem" #header-extra>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            v-if="isSupported"
            @click.stop="handleCopyPrivateKey(certs.privateKeyPem)"
            circle
            tertiary
          >
            <template #icon>
              <n-icon><Copy /></n-icon>
            </template>
          </n-button>
        </template>
        {{ privateKeyCopied ? 'Copied!' : 'Copy to clipboard' }}
      </n-tooltip>
    </template>
    {{ certs.privateKeyPem }}
  </n-card>
</template>

<style lang="scss" scoped></style>
