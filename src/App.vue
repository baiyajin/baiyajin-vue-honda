<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Honda Logo -->
    <div class="flex justify-center pt-8 pb-4">
      <img 
        src="@/assets/hondaicon.svg" 
        alt="Honda Logo" 
        class="w-16 h-16 opacity-80 hover:opacity-100 transition-opacity duration-300"
      />
    </div>
    
    <!-- 路由视图 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>