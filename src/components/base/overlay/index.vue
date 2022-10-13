<template>
  <div v-if="visible" class="music-overlay__wrapper">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:visible", "close"]);

const { visible } = toRefs(props);

onMounted(() => {
  document.addEventListener("keyup", (e) => {
    if (e.code === "Escape") {
      emit("update:visible", false);
    }
  });
});
</script>

<style lang="less" scoped>
.music-overlay {
  &__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    backdrop-filter: blur(20px);
  }
}
</style>
