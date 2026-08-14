import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  metricSchema,
  type MetricFormData,
} from '../schemas'
import type { Department } from '../types'

const departments: Department[] = [
  'Sales',
  'Marketing',
  'HR',
  'Finance',
  'Operations',
]

interface MetricFormProps {
  defaultValues?: MetricFormData
  submitLabel?: string
  onSubmit: (data: MetricFormData) => void
}

function MetricForm({
  defaultValues,
  submitLabel = 'Save Metric',
  onSubmit,
}: MetricFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MetricFormData>({
    resolver: zodResolver(metricSchema),
    defaultValues: defaultValues ?? {
      title: '',
      value: 0,
      department: 'Sales',
      date: '',
      note: '',
    },
  })

  const handleFormSubmit = (data: MetricFormData) => {
    onSubmit(data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="metric-form"
    >
      <div className="metric-form-field">
        <label htmlFor="title">
          Metric Title
        </label>

        <input
          id="title"
          type="text"
          placeholder="Enter metric title"
          {...register('title')}
        />

        {errors.title && (
          <p className="metric-form-error">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="metric-form-field">
        <label htmlFor="value">
          Value
        </label>

        <input
          id="value"
          type="number"
          step="any"
          placeholder="Enter metric value"
          {...register('value', {
            valueAsNumber: true,
          })}
        />

        {errors.value && (
          <p className="metric-form-error">
            {errors.value.message}
          </p>
        )}
      </div>

      <div className="metric-form-field">
        <label htmlFor="department">
          Department
        </label>

        <select
          id="department"
          {...register('department')}
        >
          {departments.map((department) => (
            <option
              key={department}
              value={department}
            >
              {department}
            </option>
          ))}
        </select>

        {errors.department && (
          <p className="metric-form-error">
            {errors.department.message}
          </p>
        )}
      </div>

      <div className="metric-form-field">
        <label htmlFor="date">
          Date
        </label>

        <input
          id="date"
          type="date"
          {...register('date')}
        />

        {errors.date && (
          <p className="metric-form-error">
            {errors.date.message}
          </p>
        )}
      </div>

      <div className="metric-form-field">
        <label htmlFor="note">
          Note
        </label>

        <textarea
          id="note"
          rows={4}
          placeholder="Optional note"
          {...register('note')}
        />

        {errors.note && (
          <p className="metric-form-error">
            {errors.note.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="add-metric-button"
      >
        {submitLabel}
      </button>
    </form>
  )
}

export default MetricForm