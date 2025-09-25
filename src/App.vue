<template>
  <div id="app" class="min-h-screen bg-gradient-primary">
    <!-- Honda Logo -->
    <div class="flex justify-center pt-8 pb-6 animate-fade-in">
      <img 
        src="@/assets/hondaicon.svg" 
        alt="Honda Logo" 
        class="w-20 h-20 opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110 drop-shadow-lg"
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