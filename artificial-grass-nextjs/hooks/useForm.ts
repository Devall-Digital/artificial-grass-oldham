import { useState, useCallback } from 'react'

interface FormValues {
  [key: string]: any
}

interface FormErrors {
  [key: string]: string
}

export const useForm = <T extends FormValues>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }, [errors])

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched(prev => new Set(prev).add(name))
  }, [])

  const setError = useCallback((field: string, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }))
  }, [])

  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev }
      delete newErrors[field]
      return newErrors
    })
  }, [])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched(new Set())
  }, [initialValues])

  const setFieldValue = useCallback((field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))
  }, [])

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setError,
    clearError,
    resetForm,
    setFieldValue,
  }
}