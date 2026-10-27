
import { useEffect, useState } from 'react'
import './App.css'

const API = 'http://localhost:8081/beautysalon'

function App() {
  const [salons, setSalons] = useState([])
  const [form, setForm] = useState({
    salonName: '',
    location: '',
    staffCount: '',
    open: 'true',
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function loadSalons() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API}/displayall`)
      if (!response.ok) throw new Error('Unable to load salons.')

      const data = await response.json()
      setSalons(data)
    } catch {
      setError(
        'Cannot connect to backend. Check that Spring Boot is running and CORS allows http://localhost:5173.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSalons()
  }, [])

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!form.salonName.trim() || !form.location.trim()) {
      setError('Please enter the salon name and location.')
      return
    }

    if (
      form.staffCount.trim() === '' ||
      !Number.isInteger(Number(form.staffCount)) ||
      Number(form.staffCount) < 0
    ) {
      setError('Staff count must be a non-negative whole number.')
      return
    }

    setSaving(true)

    const requestData = {
      salonName: form.salonName.trim(),
      location: form.location.trim(),
      staffCount: Number(form.staffCount),
      open: form.open === 'true',
    }

    try {
      const response = await fetch(`${API}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        const body = await response.text()
        throw new Error(body || `Failed to add salon (HTTP ${response.status}).`)
      }

      setMessage('Beauty salon added successfully!')
      setForm({
        salonName: '',
        location: '',
        staffCount: '',
        open: 'true',
      })

      await loadSalons()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setError(err.message || 'Could not add salon.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this salon?')) return

    setMessage('')
    setError('')

    try {
      const response = await fetch(`${API}/delete/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(
          (await response.text()) ||
          `Failed to delete salon (HTTP ${response.status}).`
        )
      }

      setMessage('Beauty salon deleted successfully!')
      await loadSalons()
    } catch (err) {
      setError(err.message || 'Could not delete salon.')
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark salon-navbar">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#top">
             Nayra
          </a>
          <span className="navbar-text text-white">
            Beauty Salon Management
          </span>
        </div>
      </nav>

      <main id="top" className="container py-5">
        <section className="hero text-center mb-5">
          <p className="text-uppercase small fw-semibold">
            Your beauty, our passion
          </p>
          <h1>Beauty Salon Management</h1>
          <p className="text-secondary">
            Manage your salon details in one place.
          </p>
        </section>

        {message && (
          <div className="alert alert-success" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row g-4">

          {/* Add Salon form at the top */}
          <div className="col-12">
            <div className="card salon-card">
              <div className="card-body p-4">
                <h4 className="mb-1">Add a Salon</h4>
                <p className="text-secondary small mb-4">
                  Enter the salon details below.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="salonName">
                        Salon Name
                      </label>
                      <input
                        id="salonName"
                        className="form-control"
                        name="salonName"
                        value={form.salonName}
                        onChange={handleChange}
                        placeholder="Enter salon name"
                        required
                        maxLength={100}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="location">
                        Location
                      </label>
                      <input
                        id="location"
                        className="form-control"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Enter location"
                        required
                        maxLength={150}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="staffCount">
                        Staff Count
                      </label>
                      <input
                        id="staffCount"
                        className="form-control"
                        type="number"
                        name="staffCount"
                        value={form.staffCount}
                        onChange={handleChange}
                        placeholder="Number of staff"
                        min="0"
                        step="1"
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label" htmlFor="open">
                        Salon Status
                      </label>
                      <select
                        id="open"
                        className="form-select"
                        name="open"
                        value={form.open}
                        onChange={handleChange}
                      >
                        <option value="true">Open</option>
                        <option value="false">Closed</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-salon"
                        disabled={saving}
                      >
                        {saving ? 'Adding...' : '+ Add Salon'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Salon Directory below the form */}
          <div className="col-12">
            <div className="card salon-card">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                  <div>
                    <h4 className="mb-1">Salon Directory</h4>
                    <p className="text-secondary small mb-0">
                      Registered salon details
                    </p>
                  </div>

                  <button
                    className="btn btn-outline-secondary"
                    onClick={loadSalons}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : '↻ Refresh'}
                  </button>
                </div>

                <div className="table-responsive">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Salon</th>
                        <th>Location</th>
                        <th>Staff</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {!loading && salons.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center py-5">
                            No salons found. Add your first salon!
                          </td>
                        </tr>
                      )}

                      {salons.map((salon) => (
                        <tr key={salon.id}>
                          <td>{salon.id}</td>
                          <td className="fw-semibold">{salon.salonName}</td>
                          <td>{salon.location}</td>
                          <td>{salon.staffCount}</td>
                          <td>
                            <span
                              className={`badge ${
                                salon.open
                                  ? 'text-bg-success'
                                  : 'text-bg-secondary'
                              }`}
                            >
                              {salon.open ? 'Open' : 'Closed'}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(salon.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}

                      {loading && (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            Loading salons...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <p className="text-secondary small mb-0 mt-3">
                  Total salons: {salons.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-secondary small">
        Nayara · Beauty Salon Management System
      </footer>
    </>
  )
}

export default App
