<template>
  <div class="form-field">
    <label class="field-label">
      {{ label }}
      <span v-if="required" class="field-required">*</span>
    </label>
    <slot />
    <span v-if="hint" class="field-hint">{{ hint }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  required?: boolean
  hint?: string
}>()
</script>

<style scoped>
.form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--vscode-text);
}

.field-required {
  color: var(--vscode-accent);
  margin-left: 2px;
}

.field-hint {
  font-size: 12px;
  color: var(--vscode-text-secondary);
}
</style>
