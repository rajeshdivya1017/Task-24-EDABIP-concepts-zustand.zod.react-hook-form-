import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DashboardDepartment } from '../types'

export type DateFilterMode =
  | 'all'
  | 'exact'
  | 'range'

interface DashboardState {
  department: DashboardDepartment
  fromDate: string
  toDate: string
  dateMode: DateFilterMode
  sidebarOpen: boolean

  setDepartment: (
    department: DashboardDepartment
  ) => void

  setFromDate: (date: string) => void

  setToDate: (date: string) => void

  setDateMode: (mode: DateFilterMode) => void

  toggleSidebar: () => void

  resetFilters: () => void
}

export const useDashboardStore =
  create<DashboardState>()(
    persist(
      (set) => ({
        // Initial state
        department: 'All',
        fromDate: '',
        toDate: '',
        dateMode: 'all',
        sidebarOpen: true,

        // Actions
        setDepartment: (department) =>
          set({ department }),

        setFromDate: (date) =>
          set({ fromDate: date }),

        setToDate: (date) =>
          set({ toDate: date }),

        setDateMode: (mode) =>
          set({
            dateMode: mode,
            fromDate: '',
            toDate: '',
          }),

        toggleSidebar: () =>
          set((state) => ({
            sidebarOpen: !state.sidebarOpen,
          })),

        resetFilters: () =>
          set({
            department: 'All',
            fromDate: '',
            toDate: '',
            dateMode: 'all',
          }),
      }),
      {
        name: 'dashboard-storage',
      }
    )
  )