<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { SignatureInfo } from '../pdf-signature-checker.types';
  import { Copy } from '@vicons/tabler';
  import { h } from 'vue';
  import { NButton, NTooltip, useThemeVars } from 'naive-ui';
  import { useCopy } from '@/composable/copy';
  const themeVars = useThemeVars();
  const props = defineProps<{ signature: SignatureInfo }>();
  const showModal = ref<boolean>(false);
  const showPemcert = ref<string>('');
  const { copied, copy } = useCopy({ isToast: false });
  const handleShowPemcert = (cert: string) => {
    showModal.value = true;
    showPemcert.value = cert;
  };
  const handleModalLeave = () => {
    showPemcert.value = '';
  };
  const handleCopyPemcert = async (cert: string) => {
    try {
      await copy(cert);
    } catch (error) {
      console.log('🚀 ~ handleCopyPemcert ~ error:', error);
    }
  };
  const columns = ref([
    {
      title: 'VALIDITY PERIOD',
      key: 'validityPeriod',
      render(row: { validityPeriod: { notBefore: string; notAfter: string } }) {
        return h('div', [
          h('div', { class: 'text-gray-500 text-sm' }, ['Not Before']),
          h('div', { class: ' font-bold flex items-center' }, [
            row.validityPeriod.notBefore ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.validityPeriod.notBefore
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, { color: themeVars.value.textColor1 })
                        }
                      ),
                    default: () => 'dasda'
                  }
                )
              : ''
          ]),
          h('div', { class: 'text-gray-500 text-sm' }, ['Not After']),
          h('div', { class: ' font-bold flex items-center' }, [
            row.validityPeriod.notAfter ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.validityPeriod.notAfter
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, { color: themeVars.value.textColor1 })
                        }
                      ),
                    default: () => 'dasda'
                  }
                )
              : ''
          ])
        ]);
      }
    },
    {
      title: 'ISSUED BY',
      key: 'issuedBy',
      render(row: {
        issuedBy: {
          commonName: string;
          organizationName: string;
          countryName: string;
          localityName: string;
          organizationalUnitName: string;
          stateOrProvinceName: string;
        };
      }) {
        return h('div', [
          h('div', { class: 'text-gray-500 text-sm' }, ['Common name']),
          h('div', { class: ' font-bold flex items-center' }, [
            row.issuedBy.commonName ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.issuedBy.commonName
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, {
                              onClick: async () => {
                                try {
                                  await copy(row.issuedBy.commonName);
                                } catch (error) {
                                  console.log('🚀 ~ returnh ~ error:', error);
                                }
                              },
                              color: themeVars.value.textColor1
                            })
                        }
                      ),
                    default: () => (copied.value ? 'copied' : 'copy')
                  }
                )
              : ''
          ]),
          h('div', { class: 'text-gray-500 text-sm' }, ['Organization name']),
          h('div', { class: ' font-bold flex items-center' }, [
            row.issuedBy.organizationName ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.issuedBy.organizationName
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, {
                              onClick: async () => {
                                try {
                                  await copy(row.issuedBy.organizationName);
                                } catch (error) {
                                  console.log('🚀 ~ returnh ~ error:', error);
                                }
                              },
                              color: themeVars.value.textColor1
                            })
                        }
                      ),
                    default: () => (copied.value ? 'copied' : 'copy')
                  }
                )
              : ''
          ]),
          h('div', { class: 'text-gray-500 text-sm' }, ['Country name']),
          h('div', { class: ' font-bold flex items-center' }, [
            row.issuedBy.countryName ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.issuedBy.countryName
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, {
                              onClick: async () => {
                                try {
                                  await copy(row.issuedBy.countryName);
                                } catch (error) {
                                  console.log('🚀 ~ returnh ~ error:', error);
                                }
                              },
                              color: themeVars.value.textColor1
                            })
                        }
                      ),
                    default: () => (copied.value ? 'copied' : 'copy')
                  }
                )
              : ''
          ]),
          h('div', { class: 'text-gray-500 text-sm' }, ['Locality name']),
          h('div', { class: ' font-bold flex items-center' }, [
            row.issuedBy.localityName ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.issuedBy.localityName
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, {
                              onClick: async () => {
                                try {
                                  await copy(row.issuedBy.localityName);
                                } catch (error) {
                                  console.log('🚀 ~ returnh ~ error:', error);
                                }
                              },
                              color: themeVars.value.textColor1
                            })
                        }
                      ),
                    default: () => (copied.value ? 'copied' : 'copy')
                  }
                )
              : ''
          ]),
          h('div', { class: 'text-gray-500 text-sm' }, [
            'Organizational unit name'
          ]),
          h('div', { class: ' font-bold flex items-center' }, [
            row.issuedBy.organizationalUnitName ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.issuedBy.organizationalUnitName
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, {
                              onClick: async () => {
                                try {
                                  await copy(
                                    row.issuedBy.organizationalUnitName
                                  );
                                } catch (error) {
                                  console.log('🚀 ~ returnh ~ error:', error);
                                }
                              },
                              color: themeVars.value.textColor1
                            })
                        }
                      ),
                    default: () => (copied.value ? 'copied' : 'copy')
                  }
                )
              : ''
          ]),
          h('div', { class: 'text-gray-500 text-sm' }, [
            'State or province name'
          ]),
          h('div', { class: ' font-bold flex items-center' }, [
            row.issuedBy.stateOrProvinceName ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.issuedBy.stateOrProvinceName
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, {
                              onClick: async () => {
                                try {
                                  await copy(row.issuedBy.stateOrProvinceName);
                                } catch (error) {
                                  console.log('🚀 ~ returnh ~ error:', error);
                                }
                              },
                              color: themeVars.value.textColor1
                            })
                        }
                      ),
                    default: () => (copied.value ? 'copied' : 'copy')
                  }
                )
              : ''
          ])
        ]);
      }
    },
    {
      title: 'ISSUED TO',
      key: 'issuedTo',
      render(row: {
        issuedTo: {
          commonName: string;
          organizationName: string;
          countryName: string;
          localityName: string;
          organizationalUnitName: string;
          stateOrProvinceName: string;
        };
      }) {
        return h('div', [
          h('div', { class: 'text-gray-500 text-sm' }, ['Common name']),
          h('div', { class: ' font-bold flex items-center' }, [
            row.issuedTo.commonName ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.issuedTo.commonName
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, {
                              onClick: async () => {
                                try {
                                  await copy(row.issuedTo.commonName);
                                } catch (error) {
                                  console.log('🚀 ~ returnh ~ error:', error);
                                }
                              },
                              color: themeVars.value.textColor1
                            })
                        }
                      ),
                    default: () => (copied.value ? 'copied' : 'copy')
                  }
                )
              : ''
          ]),
          h('div', { class: 'text-gray-500 text-sm' }, ['Organization name']),
          h('div', { class: ' font-bold flex items-center' }, [
            row.issuedTo.organizationName ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.issuedTo.organizationName
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, {
                              onClick: async () => {
                                try {
                                  await copy(row.issuedTo.organizationName);
                                } catch (error) {
                                  console.log('🚀 ~ returnh ~ error:', error);
                                }
                              },
                              color: themeVars.value.textColor1
                            })
                        }
                      ),
                    default: () => (copied.value ? 'copied' : 'copy')
                  }
                )
              : ''
          ]),
          h('div', { class: 'text-gray-500 text-sm' }, ['Country name']),
          h('div', { class: ' font-bold flex items-center' }, [
            row.issuedTo.countryName ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.issuedTo.countryName
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, {
                              onClick: async () => {
                                try {
                                  await copy(row.issuedTo.countryName);
                                } catch (error) {
                                  console.log('🚀 ~ returnh ~ error:', error);
                                }
                              },
                              color: themeVars.value.textColor1
                            })
                        }
                      ),
                    default: () => (copied.value ? 'copied' : 'copy')
                  }
                )
              : ''
          ]),
          h('div', { class: 'text-gray-500 text-sm' }, ['Locality name']),
          h('div', { class: ' font-bold flex items-center' }, [
            row.issuedTo.localityName ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.issuedTo.localityName
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, {
                              onClick: async () => {
                                try {
                                  await copy(row.issuedTo.localityName);
                                } catch (error) {
                                  console.log('🚀 ~ returnh ~ error:', error);
                                }
                              },
                              color: themeVars.value.textColor1
                            })
                        }
                      ),
                    default: () => (copied.value ? 'copied' : 'copy')
                  }
                )
              : ''
          ]),
          h('div', { class: 'text-gray-500 text-sm' }, [
            'Organizational unit name'
          ]),
          h('div', { class: ' font-bold flex items-center' }, [
            row.issuedTo.organizationalUnitName ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.issuedTo.organizationalUnitName
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, {
                              onClick: async () => {
                                try {
                                  await copy(
                                    row.issuedTo.organizationalUnitName
                                  );
                                } catch (error) {
                                  console.log('🚀 ~ returnh ~ error:', error);
                                }
                              },
                              color: themeVars.value.textColor1
                            })
                        }
                      ),
                    default: () => (copied.value ? 'copied' : 'copy')
                  }
                )
              : ''
          ]),
          h('div', { class: 'text-gray-500 text-sm' }, [
            'State or province name'
          ]),
          h('div', { class: ' font-bold flex items-center' }, [
            row.issuedTo.stateOrProvinceName ||
              h('div', { class: 'font-bold text-gray-500' }, ['N/A']),
            row.issuedTo.stateOrProvinceName
              ? h(
                  NTooltip,
                  { trigger: 'hover' },
                  {
                    trigger: () =>
                      h(
                        NButton,
                        {
                          text: true,
                          class: 'ml-2'
                        },
                        {
                          icon: () =>
                            h(Copy, {
                              onClick: async () => {
                                try {
                                  await copy(row.issuedTo.stateOrProvinceName);
                                } catch (error) {
                                  console.log('🚀 ~ returnh ~ error:', error);
                                }
                              },
                              color: themeVars.value.textColor1
                            })
                        }
                      ),
                    default: () => (copied.value ? 'copied' : 'copy')
                  }
                )
              : ''
          ])
        ]);
      }
    },
    {
      title: 'PEM CERTIFICATE',
      key: 'pemCertificate',
      render(row: { pemCertificate: string }) {
        return h(
          NButton,
          {
            onClick: () => {
              handleShowPemcert(row.pemCertificate);
            }
          },
          ['View PEM cert']
        );
      }
    }
  ]);
  const certs = computed(() =>
    props.signature.meta.certs.map((cert, index) => ({
      ...cert,
      validityPeriod: {
        notBefore: new Date(cert.validityPeriod.notBefore).toLocaleString(),
        notAfter: new Date(cert.validityPeriod.notAfter).toLocaleString()
      },
      certificateName: `Certificate ${index + 1}`
    }))
  );
</script>

<template>
  <div class="">
    <n-data-table :columns="columns" :data="certs"></n-data-table>
    <n-modal :on-after-leave="handleModalLeave" v-model:show="showModal">
      <n-card class="max-w-[600px]" :bordered="false">
        <div class="text-xs break-all">
          {{ showPemcert }}
        </div>
        <template #footer>
          <n-button class="w-full" @click="handleCopyPemcert(showPemcert)">{{
            copied ? 'Copied' : 'Copy'
          }}</n-button>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<style lang="scss" scoped></style>
