import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createLogEntries } from '../API'

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = async data => {
    try {
      setLoading(true)
      data.longitude = location.longitude
      data.latitude = location.latitude
      await createLogEntries(data)
      onClose()
    } catch (error) {
      console.error(error)
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
      {error && <h3 className='error'>{error}</h3>}
      <label htmlFor='title'>Title</label>
      <input type='text' id='title' name='title' ref={register({ required: true })} />
      {errors.title && <span className='error'>This field is required</span>}
      <label htmlFor='comments'>Comments</label>
      <textarea id='comments' name='comments' ref={register} rows={3} />
      <label htmlFor='description'>Description</label>
      <textarea id='description' name='description' ref={register} rows={3} />
      <label htmlFor='image'>Image</label>
      <input type='text' id='image' name='image' ref={register} />
      <label htmlFor='visitDate'>Visit Date</label>
      <input type='date' id='visitDate' name='visitDate' ref={register({ required: true })} />
      {errors.visitDate && <span className='error'>This field is required</span>}
      <button disabled={loading}>{loading ? 'Saving' : 'Create Log Entry'}</button>
    </form>
  )
}

export default LogEntryForm
