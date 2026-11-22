<script setup>
import { ref, reactive } from 'vue'
import { getAdminReports, reviewAdminReport } from '../../services/adminService'
import { usePaginatedList } from '../../composables/usePaginatedList'
import { useToast } from '../../composables/useToast'
import { formatDateTime } from '../../utils/format'
import { getDestinationImageUrl } from '../../utils/media'
import { REPORT_REASONS, REPORT_FILTERS } from '../../config/constants'
import BaseButton from '../../components/base/BaseButton.vue'

const toast = useToast()

const reasonLabels = Object.fromEntries(
  REPORT_REASONS.map((option) => [option.value, option.label])
)

const statusFilter = ref('pending')

const {
  items: reports,
  hasMore,
  isLoading,
  isLoadingMore,
  error,
  loadMore,
  reload
} = usePaginatedList(
  (page, limit) => getAdminReports(statusFilter.value, page, limit),
  undefined,
  { watch: statusFilter }
)

const busyIds = reactive(new Set())

async function markAsReviewed(report) {
  if (busyIds.has(report.id)) {
    return
  }

  busyIds.add(report.id)

  try {
    const response = await reviewAdminReport(report.id)

    report.status = response.data.status
    report.reviewedAt = response.data.reviewedAt

    toast.success(response.message)
  } catch {
  } finally {
    busyIds.delete(report.id)
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
      <div class="btn-group" role="group" aria-label="Filtrar denúncias">
        <button
          v-for="filter in REPORT_FILTERS"
          :key="filter.value"
          type="button"
          class="btn btn-outline-primary"
          :class="{ active: statusFilter === filter.value }"
          :aria-pressed="statusFilter === filter.value"
          @click="statusFilter = filter.value"
        >
          {{ filter.label }}
        </button>
      </div>

      <button
        type="button"
        class="btn btn-outline-secondary btn-sm rounded-pill"
        :disabled="isLoading"
        @click="reload"
      >
        <i class="bi bi-arrow-clockwise"></i> Atualizar
      </button>
    </div>

    <p v-if="isLoading" class="text-center text-muted">Carregando...</p>

    <p v-else-if="error" class="text-danger text-center">{{ error }}</p>

    <template v-else>
      <div v-if="reports.length === 0" class="alert alert-info text-center">
        Nenhuma denúncia neste filtro.
      </div>

      <ul v-else class="list-group">
        <li
          v-for="report in reports"
          :key="report.id"
          class="list-group-item d-flex align-items-center gap-3"
          data-testid="report-row"
        >
          <router-link
            :to="{ name: 'destination-detail', params: { id: report.Destination.id } }"
          >
            <img
              :src="getDestinationImageUrl(report.Destination.imagePath)"
              :alt="report.Destination.title"
              width="96"
              height="54"
              style="object-fit: cover;"
            />
          </router-link>

          <div class="flex-grow-1">
            <router-link
              :to="{ name: 'destination-detail', params: { id: report.Destination.id } }"
              class="fw-semibold text-decoration-none"
            >
              {{ report.Destination.title }}
            </router-link>

            <span class="text-muted small">
              de @{{ report.Destination.User.username }}
            </span>

            <div>
              <span class="badge text-bg-warning me-2">
                {{ reasonLabels[report.reason] || report.reason }}
              </span>

              <span
                class="badge"
                :class="report.status === 'pending' ? 'text-bg-danger' : 'text-bg-success'"
              >
                {{ report.status === 'pending' ? 'Pendente' : 'Revisada' }}
              </span>
            </div>

            <div class="small text-muted">
              Denunciado por @{{ report.Reporter.username }}
              em {{ formatDateTime(report.createdAt) }}

              <template v-if="report.reviewedAt">
                · revisada em {{ formatDateTime(report.reviewedAt) }}
              </template>
            </div>
          </div>

          <button
            v-if="report.status === 'pending'"
            type="button"
            class="btn btn-sm btn-outline-success"
            :disabled="busyIds.has(report.id)"
            @click="markAsReviewed(report)"
          >
            {{ busyIds.has(report.id) ? 'Salvando...' : 'Marcar como revisada' }}
          </button>
        </li>
      </ul>

      <div v-if="hasMore" class="text-center mt-4">
        <BaseButton
          variant="outline-primary"
          :loading="isLoadingMore"
          loading-text="Carregando..."
          @click="loadMore"
        >
          Carregar mais denúncias
        </BaseButton>
      </div>
    </template>
  </div>
</template>