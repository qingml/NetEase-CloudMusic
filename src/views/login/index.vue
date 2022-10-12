<template>
  <div class="login__container">
    <el-form
      ref="formRef"
      :model="loginForm"
      :rule="rules"
      status-icon
      label-width="120px"
    >
      <el-form-item label="账号：" prop="phone" required>
        <el-input
          v-model="loginForm.phone"
          placeholder="请输入网易云音乐手机号"
        />
      </el-form-item>
      <el-form-item label="密码：" prop="password" required>
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
  &__container {
    width: 800px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
