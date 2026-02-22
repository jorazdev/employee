<script setup lang="ts">
import { ref, computed } from "vue";
import type { TAbsence, TEmployee } from "~/types/absence";
import FormAbsence from "~/components/FormAbsence.vue";
import Modal from "~/components/Modal.vue";
import useAbscence from "~/composables/absence";
import BtnActionTable from "~/components/table/BtnActionTable.vue";
import HeaderTable from "~/components/table/HeaderTable.vue";
import BodyTable from "~/components/table/BodyTable.vue";
import useTools from "~/composables/tools";
import Button from "~/components/form/Button.vue";

type props = {
  absences: TAbsence[];
};
const props = defineProps<props>();

const { absenceForm, onUpdateAbsence } = useAbscence();
const { getUserRandom, formatDate } = useTools();

const currentDate = ref(new Date());
const show = ref<boolean>(false);
const action = ref<"add" | "edit">("add");

// Generates all dates for the current month
const monthDates = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dates: string[] = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    dates.push(d.toISOString().split("T")[0] || ""); // ex: "2025-10-01"
  }
  return dates;
});

const employees = computed(() => {
  const grouped = new Map<string, TEmployee>();
  for (const a of props.absences) {
    const key = `${a.firstName}-${a.lastName}`;
    if (!grouped.has(key)) {
      grouped.set(key, {
        abscenceId: a.abscenceId,
        firstName: a.firstName,
        lastName: a.lastName,
        personnelNumber: a.personnelNumber || "",
        absences: [],
      });
    }
    grouped.get(key)!.absences.push({ begin: a.startDate, end: a.endDate });
  }
  return Array.from(grouped.values());
});

const onSelect = async (emp: TEmployee | null) => {
  if (emp != null) {
    action.value = "edit";
    absenceForm.value.abscenceId = emp.abscenceId;
    absenceForm.value.firstName = emp.firstName;
    absenceForm.value.lastName = emp.lastName;
    absenceForm.value.startDate = emp.absences[0]?.begin || "";
    absenceForm.value.endDate = emp.absences[0]?.end || "";
  } else {
    action.value = "add";
    const data = await getUserRandom();
    if (data && absenceForm) {
      absenceForm.value.firstName = data.results[0]?.name.first ?? "";
      absenceForm.value.lastName = data.results[0]?.name.last ?? "";
      absenceForm.value.startDate = formatDate(new Date(), "iso");
      absenceForm.value.endDate = formatDate(new Date(), "iso");
    }
  }
  show.value = true;
};
</script>

<template>
  <BtnActionTable v-model="currentDate" />
  <div
    class="border border-gray-300 rounded-lg overflow-x-auto max-h-[400px] overflow-y-auto"
  >
    <table
      v-if="absences.length > 0"
      class="min-w-full border-collapse text-sm text-left text-gray-700"
    >
      <HeaderTable v-model="show" :monthDates />
      <BodyTable v-model="show" :employees :monthDates @onSelect="onSelect" />
    </table>
  </div>
  <Button
    icon="add"
    title="Add Absent"
    className="bg-blue-400 text-white mt-5"
    @onclick="onSelect(null)"
  />

  <Modal v-model="show" @onClose="show = false" class="z-30">
    <FormAbsence
      v-model="absenceForm"
      :action
      @onClose="show = false"
      @onUpdateAbsence="onUpdateAbsence"
    />
  </Modal>
</template>

<style lang="css" scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  text-align: center;
}
</style>
