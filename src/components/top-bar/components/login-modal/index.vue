<template>
  <ElDialog
    custom-class="login-modal"
    width="30%"
    v-model="visible"
    @close="handleClose"
  >
    <template v-slot:title>
      <div class="login-modal__top">
        <div class="login-modal__logo" />
        <div class="login-modal__name">momoMusic</div>
      </div>
    </template>
    <div class="login-modal__content">
      <div class="login-modal__content--left">
        <img
          src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png"
        />
      </div>
      <div class="login-modal__content--right">
        <p>扫码登录</p>
        <div class="qr-code__block">
          <ElImage
            width="150"
            height="150"
            class="login-modal__content--qr-code-img"
            :src="qrcodeImg"
            lazy
          />
          <div
            class="qr-code__block-reload"
            v-if="qrCodeStatus === ScanQRCodeStatusEnum.EXPIRED"
          >
            <div>二维码已失效</div>
            <div class="btn" @click="handleResetQRCode">点击刷新</div>
          </div>
        </div>
        <p>使用网易云音乐扫码登录</p>
      </div>
    </div>
  </ElDialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, toRefs } from "vue";
import { ElDialog, ElMessage, ElImage } from "element-plus";

import {
  checkScanQRCodeStatus,
  createQRCodeImg,
  getQRCodeKey,
} from "@/api/login";
import { useLoginStore } from "@/stores/login";
import { ScanQRCodeStatusEnum } from "@/type/login";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const qrcodeImg = ref("");
const qrCodekey = ref("");
const qrCodeStatus = ref<ScanQRCodeStatusEnum>();

const emit = defineEmits(["update:visible"]);

const intervalScanTimer = ref<ReturnType<typeof setInterval>>();

const { visible } = toRefs(props);

const loginStore = useLoginStore();

const queryQRCodeKey = async () => {
  try {
    const res = await getQRCodeKey();
    qrCodekey.value = res.data.unikey;
  } catch (error) {}
};

const queryQRCodeImg = async () => {
  try {
    const qrCodeImgRes = await createQRCodeImg(qrCodekey.value);
    qrcodeImg.value = qrCodeImgRes.data.qrimg;

    intervalScanTimer.value = setInterval(async () => {
      const res = await checkScanQRCodeStatus(qrCodekey.value);
      qrCodeStatus.value = res.code;
      if (res.code === 803) {
        ElMessage({
          message: "扫码登录成功",
          type: "success",
        });

        await loginStore.queryUserInfo();

        const timeout = setTimeout(() => {
          emit("update:visible", false);
          clearTimeout(timeout);
        }, 500);

        clearInterval(intervalScanTimer.value);
      }
    }, 3000);
  } catch (error) {}
};

onMounted(queryQRCodeKey);

watch([qrCodekey, visible], async () => {
  if (qrCodekey.value && visible.value) {
    queryQRCodeImg();
  }
});

const handleResetQRCode = async () => {
  clearInterval(intervalScanTimer.value);
  await queryQRCodeKey();
  await queryQRCodeImg();
};

const handleClose = () => {
  emit("update:visible", false);
  clearInterval(intervalScanTimer.value);
};
</script>

<style lang="less" scoped>
:deep(.el-dialog) {
  border-radius: 12px;
}

.login-modal {
  border-radius: 12px;

  :deep(.el-dialog__header) {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  &__top {
    display: flex;
    align-items: center;
  }

  &__logo {
    width: 28px;
    height: 28px;
    border-radius: 10px;
    background: url(@/assets/img/logo.png) no-repeat 0 9999px;
    background-position: center;
    background-size: 90% 90%;
    margin-right: 4px;
  }

  &__name {
    font-family: fantasy;
    font-size: 16px;
    margin-right: 20px;
    position: relative;
    top: 2px;
  }

  &__content {
    display: flex;
    justify-content: space-around;

    &--left {
      img {
        width: 125px;
        height: 220px;
      }
    }

    &--right {
      display: flex;
      flex-direction: column;
      align-items: center;

      .qr-code__block {
        position: relative;

        .el-image {
          border-radius: 8px;
          height: 148px;
        }

        &-reload {
          position: absolute;
          top: 0;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.9);
          width: 100%;
          height: 100%;

          .btn {
            margin-top: 8px;
            background-color: #fa2800;
            color: #fff;
            padding: 2px 4px;
            font-size: 12px;
            cursor: pointer;
            border-radius: 6px;
          }
        }
      }
    }
  }
}
</style>
