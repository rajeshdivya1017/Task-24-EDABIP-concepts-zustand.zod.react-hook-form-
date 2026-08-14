import { describe, it, expect, beforeEach } from 'vitest'
import { useDashboardStore } from '../useDashboardStore'

describe('useDashboardStore', () => {
  beforeEach(() => {
    useDashboardStore.getState().resetFilters()

    useDashboardStore.setState({
      sidebarOpen: true,
    })
  })

  it('should have correct initial filter state', () => {
    const state = useDashboardStore.getState()

    expect(state.department).toBe('All')
    expect(state.fromDate).toBe('')
    expect(state.toDate).toBe('')
    expect(state.dateMode).toBe('all')
    expect(state.sidebarOpen).toBe(true)
  })

  it('should update department', () => {
    useDashboardStore.getState().setDepartment('Sales')

    expect(
      useDashboardStore.getState().department
    ).toBe('Sales')
  })

  it('should update date filters', () => {
    useDashboardStore.getState().setFromDate('2026-08-01')
    useDashboardStore.getState().setToDate('2026-08-13')

    const state = useDashboardStore.getState()

    expect(state.fromDate).toBe('2026-08-01')
    expect(state.toDate).toBe('2026-08-13')
  })

  it('should update date mode and clear dates', () => {
    useDashboardStore.getState().setFromDate('2026-08-01')
    useDashboardStore.getState().setToDate('2026-08-13')

    useDashboardStore.getState().setDateMode('range')

    const state = useDashboardStore.getState()

    expect(state.dateMode).toBe('range')
    expect(state.fromDate).toBe('')
    expect(state.toDate).toBe('')
  })

  it('should toggle sidebar', () => {
    useDashboardStore.getState().toggleSidebar()

    expect(
      useDashboardStore.getState().sidebarOpen
    ).toBe(false)

    useDashboardStore.getState().toggleSidebar()

    expect(
      useDashboardStore.getState().sidebarOpen
    ).toBe(true)
  })

  it('should reset filters', () => {
    useDashboardStore.getState().setDepartment('Finance')
    useDashboardStore.getState().setDateMode('exact')
    useDashboardStore.getState().setFromDate('2026-08-13')

    useDashboardStore.getState().resetFilters()

    const state = useDashboardStore.getState()

    expect(state.department).toBe('All')
    expect(state.fromDate).toBe('')
    expect(state.toDate).toBe('')
    expect(state.dateMode).toBe('all')
  })
})