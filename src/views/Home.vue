<template>
  <v-container fill-height fluid> 
    <v-row v-if="!nameChk"  class="text-center" >
      <v-col cols="12">
        <v-img :src="require('../../server/upload/logo.png')" contain height="80" />
        <h3>S-Tank Engineering</h3>
      </v-col>
      <v-col cols="4"/><v-col cols="4"> <v-text-field label="성명" v-model="form.n_name" placeholder="홍길동" /></v-col><v-col cols="4"/>
      <v-col cols="4"/><v-col cols="4"> <input-password label="비밀번호" v-model="form.i_resno" placeholder="851202-1842247" :rules="rules.password2({len:0,required: false})" /> </v-col><v-col cols="4"/>
      <v-col cols="4"/><v-col cols="4"> <v-btn block color="primary" @click="login" :loading="isLoading">로그인</v-btn></v-col><v-col cols="4"/>
    </v-row>

    <v-row v-else class="text-center">
      
      <v-col cols="4"/><v-col cols="4"> <v-text-field label="성명" v-model="stock.n_name" readonly hide-details /></v-col><v-col cols="4"/>
      <v-col cols="4"/><v-col cols="4"> <v-text-field label="주민번호" v-model="stock.i_resno" readonly hide-details /></v-col><v-col cols="4"/>
      <v-col cols="4"/><v-col cols="4"> <v-text-field label="보유주식 수" v-model="stock.m_su1" readonly hide-details /></v-col><v-col cols="4"/>
      <v-col cols="4"/><v-col cols="4"> <v-text-field label="신청가능 주식수" v-model="stock.m_su2" readonly hide-details /></v-col><v-col cols="4"/>
      <v-col cols="4"/><v-col cols="4"> <v-text-field label="1주 취득가액 " v-model="stock.m_su3" readonly hide-details /></v-col><v-col cols="4"/>
      <v-col cols="4"/><v-col cols="4"> <v-text-field label="양도계약 성립주식수" v-model="sval" readonly hide-details /></v-col><v-col cols="4"/> 
      
      <v-col cols="4"/><v-col><v-btn block color="primary" @click="doc('doc1')" :loading="isLoading">자기주식취득에 관한 통지서</v-btn> </v-col><v-col cols="4"/>
      <v-col cols="4"/><v-col><v-btn block color="primary" @click="doc('doc2')" :loading="isLoading">주식양도신청서</v-btn> </v-col><v-col cols="4"/>
      <v-col cols="4"/><v-col><v-btn block color="primary" @click="doc('doc3')" :loading="isLoading">자기주식취득에 관한 부연 설명서</v-btn> </v-col><v-col cols="4"/>


    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { deepCopy } from "../../util/lib";
import { save } from 'save-file';
import validateRules from "../../util/validateRules";
import InputPassword from '../components/InputForms/InputPassword.vue';
export default {
  components: { InputPassword },
  
  name: "Home",
	data() {
		return {
			title : "S-Tank Engineering",
      isLoading: false,   
      valid: true,
      nameChk: false,
      form: {n_name:"", i_resno: ""},
      stock: {i_resno:"", n_name:"", a_un:0, m_su1:0, m_su2:0, m_su3:0, m_su4:0, a_amt:0,},     
      sval: "2023년 8월 7일 이후 확인 가능",
    }
	},
	title() {
		return this.title;
	},
	computed: {
    rules: () => validateRules,
  },
  methods: {
    ...mapActions("user", ["signInName"]),
    async login() {      
      this.isLoading = true;
      const data = await this.signInName(this.form);
      if (data.length) {
        this.stock = deepCopy(data[0]);
        this.nameChk = true;        
      }
      this.isLoading = false;      
    },
    async doc(item) {
      let url = "";
      let filenm = ""
      if(item == 'doc1') {
        url = "/upload/DOC1.pdf";
        filenm = "자기주식취득에 관한 통지서.pdf"
      } else if (item == 'doc2') {
        url = "/upload/DOC2.pdf";
        filenm = "주식양도신청서.pdf"
      } else {
        url = "/upload/DOC3.pdf";
        filenm = "자기주식취득에관한 부연 설명서.pdf"
      }
    
      const fileBuffer = await this.$axios.get(`/api/member/getFileDown?path=${ url }`);            
      if (fileBuffer) {
          save (fileBuffer, filenm);    
          alert('File Donw load Click !!'); 
      }
    }
    
  },
};
</script>


<style>

</style>