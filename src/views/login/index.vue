<template>
  <div class="login__wrapper">
    <div class="login__container">
      <div class="logo-wrapper">
        <div class="logo-icon"></div>
        <div class="logo-name">MOMOMUSIC</div>
      </div>
      <div class="login-area">
        <el-form
          ref="formRef"
          :model="loginForm"
          :rule="rules"
          status-icon
          label-width="120px"
        >
          <el-form-item label="" prop="phone" required>
            <el-input
              v-model="loginForm.phone"
              placeholder="请输入网易云音乐手机号"
            />
          </el-form-item>
          <el-form-item label="" prop="password" required>
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(formRef)">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { FormInstance } from "element-plus";
import { useLoginStore } from "@/stores/login";
import { useRoute, useRouter } from "vue-router";

const formRef = ref<FormInstance>();

const loginForm = reactive({
  phone: "",
  password: "",
});

const loginStore = useLoginStore();
const { query } = useRoute();
const router = useRouter();

const rules = reactive({
  phone: [{ required: true, message: "手机号都没有！", trigger: "blur" }],
  password: [{ required: true, message: "密码呢！", trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const { redirect = "/" } = query;
      loginStore.setLogin(loginForm.phone, loginForm.password, () => {
        router.push({ path: redirect as string });
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style lang="less">
.login {
  &__wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__container {
    box-shadow: 5px 0 12px -6px #141414;
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;


    .logo-wrapper {
      position: absolute;
      top: 0;
      width: 100%;
      height: 30px;
      text-align: center;
      
      .logo-icon {
        width: 54px;
        height: 54px;
        border-radius: 30px;
        background: url(@/assets/logo5.png) no-repeat 0 9999px;
        background-position: 0;
        background-size: contain;
        
        background-color: var(--color-text-red);
      }

      .logo-name {
      }
    }

    .el-button--primary {
      width: 300px;
    }
  }
}
</style>
