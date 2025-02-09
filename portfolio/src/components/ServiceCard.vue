<template>
    <div class="service-card">
      <img :src="icon" :alt="title" class="service-icon" />
      <h3 class="service-title">{{ title }}</h3>
      <p class="service-description">{{ description }}</p>
    </div>
</template>
  
<script setup>
defineProps({
  title: String,
  description: String,
  icon: String,
});
</script>

<style scoped>
.service-card {
  width: 464px;
  height: 536px;
  padding: 1.5rem;
  background: linear-gradient(to bottom, #081A2B, #061423);
  border-radius: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.service-icon {
  width: 5rem;
  height: 5rem;
  margin: 0 auto;
}

.service-title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1rem;
}

.service-description {
  text-align: center;
  color: #ced6de;
  margin-top: 0.5rem;
}
</style> 