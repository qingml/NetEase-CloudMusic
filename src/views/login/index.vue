<template>
  <div class="login__container">
    <el-form
      ref="formRef"
      :model="ruleForm"
      :rule="rules"
      status-icon
      label-width="120px"
    >
      <el-form-item label="账号：" prop="phone" required>
        <el-input
          v-model="ruleForm.phone"
          placeholder="请输入网易云音乐手机号"
        />
      </el-form-item>
      <el-form-item label="密码：" prop="password" required>
        <el-input
          v-model="ruleForm.password"
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
import { onMounted, reactive, ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { getUserInfo, loginCellphone } from "@/api/login";
import { useLoginStore } from "@/stores/login";

const formRef = ref<FormInstance>();

const ruleForm = reactive({
  phone: "",
  password: "",
});

const loginStore = useLoginStore();

onMounted(async () => {
  const accountInfo = await getUserInfo();
  console.log("accountInfo", accountInfo);
});

const rules = reactive({
  phone: [{ required: true, message: "手机号都没有！", trigger: "blur" }],
  password: [{ required: true, message: "密码呢！", trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      const res = await loginCellphone({
        phone: ruleForm.phone,
        password: ruleForm.password,
      });
      console.log("res", res);
      if (res.code !== 200) {
        ElMessage({
          type: "error",
          message: res.message,
        });
      } else {
        loginStore.setLoginStatus(true);
        loginStore.setLoginToken(res.token);
      }
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
