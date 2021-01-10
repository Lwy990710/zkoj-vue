<template>
  <div>
    <h1 style="margin: 0 auto;font-size: 32px;text-align: center">ZHKU Online Judge</h1>
    <mavon-editor
        style="max-width: 1000px; margin: 0 auto"
        previewBackground="#fff"
        v-model="home_text"
        :subfield="false"
        defaultOpen="preview"
        :editable="false"
        :toolbarsFlag="false"
    ></mavon-editor>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      home_text: '### 判题相关\n' +
          '\n' +
          '#### C语言\n' +
          '\n' +
          '编译器： **MinGW gcc 6.3.0**\n' +
          '\n' +
          '编译选项：`gcc Main.c -o Main -fno-asm -Wall -lm --static`\n' +
          '\n' +
          '#### C+++\n' +
          '\n' +
          '编译器：**MinGW gcc 6.3.0**\n' +
          '\n' +
          '编译选项：`g++ Main.cc -o Main -fno-asm -Wall -lm --static`\n' +
          '\n' +
          '#### Java\n' +
          '\n' +
          '环境：**Java HotSpot 11.0.8**\n' +
          '\n' +
          '编译选项：`javac Main.java`\n' +
          '\n' +
          '#### Python\n' +
          '\n' +
          '环境：**Python 3.8.5**\n' +
          '\n' +
          '编译选项：`python Main.py`\n'
    }
  }
}
</script>

<style scoped>

</style>