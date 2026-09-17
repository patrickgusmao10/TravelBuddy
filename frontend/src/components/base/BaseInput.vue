<script setup>
defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  error: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  rows: { type: Number, default: 3 },
})

const model = defineModel({ type: [String, Number], default: '' })
const inputId = `field-${Math.random().toString(36).slice(2, 9)}`
</script>

<template>
  <div class="mb-3">
    <label :for="inputId" class="form-label">{{ label }}</label>

    <textarea
      v-if="type === 'textarea'"
      :id="inputId"
      class="form-control"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="model"
    ></textarea>

    <input
      v-else
      :id="inputId"
      :type="type"
      class="form-control"
      :placeholder="placeholder"
      :disabled="disabled"
      v-model="model"
    />

    <span v-if="error" class="text-danger small">{{ error }}</span>
    <slot name="hint" />
  </div>
</template>