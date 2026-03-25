'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import TopNav from '../../components/TopNav'
import LogoutButton from '../../components/LogoutButton'

type Client = {
  id: string
  name: string | null
  email: string
  phone?: string | null
}

type Shipment = {
  id: string
  trackingNumber: string
  origin: string
  destination: string
  status: string
  client: { id: string; name: string | null; email: string }
  trackingEvents?: { timestamp: string }[]
}

const freightModes = ['ROAD', 'AIR', 'OCEAN', 'RAIL', 'MULTIMODAL']
const trackingStatuses = [
  'CREATED',
  'BOOKED',
  'PICKED_UP',
  'IN_TRANSIT',
  'AT_PORT',
  'AT_CUSTOMS',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
  'DELAYED',
  'EXCEPTION',
  'CANCELLED',
]

const statusLabel: Record<string, string> = {
  CREATED: 'Created',
  BOOKED: 'Booked',
  PICKED_UP: 'Picked Up',
  IN_TRANSIT: 'In Transit',
  AT_PORT: 'At Hub',
  AT_CUSTOMS: 'At Hub',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  DELAYED: 'Delayed',
  EXCEPTION: 'Exception',
  CANCELLED: 'Cancelled',
}

export default function AdminPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  })

  const [shipmentForm, setShipmentForm] = useState({
    trackingNumber: '',
    clientId: '',
    origin: '',
    destination: '',
    weight: '',
    freightMode: 'ROAD',
    status: 'CREATED',
    description: '',
  })

  const [updateForm, setUpdateForm] = useState({
    shipmentId: '',
    location: '',
    status: 'IN_TRANSIT',
    notes: '',
  })

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const [clientsRes, shipmentsRes] = await Promise.all([
        fetch('/api/admin/clients'),
        fetch('/api/admin/shipments'),
      ])

      if (clientsRes.status === 401 || shipmentsRes.status === 401) {
        window.location.href = '/login?next=/admin'
        return
      }
      if (clientsRes.status === 403 || shipmentsRes.status === 403) {
        window.location.href = '/unauthorized'
        return
      }

      const clientsData = await clientsRes.json().catch(() => ({}))
      const shipmentsData = await shipmentsRes.json().catch(() => ({}))

      if (!clientsRes.ok) {
        throw new Error(clientsData.error || `Unable to load clients (${clientsRes.status})`)
      }
      if (!shipmentsRes.ok) {
        throw new Error(shipmentsData.error || `Unable to load shipments (${shipmentsRes.status})`)
      }

      setClients(clientsData.clients || [])
      setShipments(shipmentsData.shipments || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load admin data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const clientOptions = useMemo(
    () => clients.map((client) => ({ value: client.id, label: `${client.name || 'Client'} (${client.email})` })),
    [clients],
  )

  const handleCreateClient = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    const response = await fetch('/api/admin/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: clientForm.name,
        email: clientForm.email,
        phone: clientForm.phone || undefined,
        password: clientForm.password,
      }),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Unable to create client')
      return
    }

    setClientForm({ name: '', email: '', phone: '', password: '' })
    await loadData()
  }

  const handleCreateShipment = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    const response = await fetch('/api/admin/shipments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        trackingNumber: shipmentForm.trackingNumber,
        clientId: shipmentForm.clientId,
        origin: shipmentForm.origin,
        destination: shipmentForm.destination,
        weight: shipmentForm.weight,
        freightMode: shipmentForm.freightMode,
        status: shipmentForm.status,
        description: shipmentForm.description || undefined,
      }),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Unable to create shipment')
      return
    }

    setShipmentForm({
      trackingNumber: '',
      clientId: '',
      origin: '',
      destination: '',
      weight: '',
      freightMode: 'ROAD',
      status: 'CREATED',
      description: '',
    })
    await loadData()
  }

  const handleAddUpdate = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    if (!updateForm.shipmentId) {
      setError('Select a shipment before posting an update')
      return
    }

    const response = await fetch(`/api/admin/shipments/${updateForm.shipmentId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: updateForm.location,
        status: updateForm.status,
        notes: updateForm.notes || undefined,
      }),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setError(data.error || 'Unable to add tracking update')
      return
    }

    setUpdateForm({ shipmentId: updateForm.shipmentId, location: '', status: 'IN_TRANSIT', notes: '' })
    await loadData()
  }

  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <TopNav />
      <section className="page-container py-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">Admin Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Control center</h1>
            <p className="mt-2 text-sm text-slategray-100">
              Create clients, manage shipments, and post tracking updates in real time.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadData}
              className="rounded-2xl border border-cyber-500/60 px-5 py-2 text-sm font-semibold text-cyber-100 transition hover:bg-cyber-500/20"
            >
              Refresh data
            </button>
            <LogoutButton
              className="rounded-2xl border border-slategray-700/60 px-5 py-2 text-sm font-semibold text-slategray-100 transition hover:border-cyber-500 hover:text-white"
            />
          </div>
        </div>

        {error ? (
          <p className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
            {error}
          </p>
        ) : null}

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <form
            onSubmit={handleCreateClient}
            className="rounded-3xl border border-slategray-700/40 bg-navy-800/60 p-6"
          >
            <h2 className="text-lg font-semibold text-white">Create client account</h2>
            <div className="mt-6 grid gap-4">
              <label className="text-sm text-slategray-100">
                Full name
                <input
                  value={clientForm.name}
                  onChange={(event) => setClientForm({ ...clientForm, name: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                  required
                />
              </label>
              <label className="text-sm text-slategray-100">
                Email
                <input
                  type="email"
                  value={clientForm.email}
                  onChange={(event) => setClientForm({ ...clientForm, email: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                  required
                />
              </label>
              <label className="text-sm text-slategray-100">
                Phone
                <input
                  value={clientForm.phone}
                  onChange={(event) => setClientForm({ ...clientForm, phone: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                />
              </label>
              <label className="text-sm text-slategray-100">
                Temporary password
                <input
                  type="password"
                  value={clientForm.password}
                  onChange={(event) => setClientForm({ ...clientForm, password: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                  required
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-2xl bg-cyber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyber-500"
            >
              Create client
            </button>
          </form>

          <form
            onSubmit={handleCreateShipment}
            className="rounded-3xl border border-slategray-700/40 bg-navy-800/60 p-6"
          >
            <h2 className="text-lg font-semibold text-white">Create shipment</h2>
            <div className="mt-6 grid gap-4">
              <label className="text-sm text-slategray-100">
                Tracking number (TPC-XXXXX)
                <input
                  value={shipmentForm.trackingNumber}
                  onChange={(event) => setShipmentForm({ ...shipmentForm, trackingNumber: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                  required
                />
              </label>
              <label className="text-sm text-slategray-100">
                Client
                <select
                  value={shipmentForm.clientId}
                  onChange={(event) => setShipmentForm({ ...shipmentForm, clientId: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                  required
                >
                  <option value="" disabled>Select client</option>
                  {clientOptions.map((client) => (
                    <option key={client.value} value={client.value}>{client.label}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-slategray-100">
                Origin
                <input
                  value={shipmentForm.origin}
                  onChange={(event) => setShipmentForm({ ...shipmentForm, origin: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                  required
                />
              </label>
              <label className="text-sm text-slategray-100">
                Destination
                <input
                  value={shipmentForm.destination}
                  onChange={(event) => setShipmentForm({ ...shipmentForm, destination: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                  required
                />
              </label>
              <label className="text-sm text-slategray-100">
                Weight (kg)
                <input
                  type="number"
                  step="0.1"
                  value={shipmentForm.weight}
                  onChange={(event) => setShipmentForm({ ...shipmentForm, weight: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                  required
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slategray-100">
                  Mode
                  <select
                    value={shipmentForm.freightMode}
                    onChange={(event) => setShipmentForm({ ...shipmentForm, freightMode: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                  >
                    {freightModes.map((mode) => (
                      <option key={mode} value={mode}>{mode}</option>
                    ))}
                  </select>
                </label>
                <label className="text-sm text-slategray-100">
                  Status
                  <select
                    value={shipmentForm.status}
                    onChange={(event) => setShipmentForm({ ...shipmentForm, status: event.target.value })}
                    className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                  >
                    {trackingStatuses.map((status) => (
                      <option key={status} value={status}>{statusLabel[status] ?? status}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="text-sm text-slategray-100">
                Description (optional)
                <input
                  value={shipmentForm.description}
                  onChange={(event) => setShipmentForm({ ...shipmentForm, description: event.target.value })}
                  className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-2xl bg-cyber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyber-500"
            >
              Create shipment
            </button>
          </form>
        </div>

        <form
          onSubmit={handleAddUpdate}
          className="mt-8 rounded-3xl border border-slategray-700/40 bg-navy-800/60 p-6"
        >
          <h2 className="text-lg font-semibold text-white">Post tracking update</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm text-slategray-100">
              Shipment
              <select
                value={updateForm.shipmentId}
                onChange={(event) => setUpdateForm({ ...updateForm, shipmentId: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                required
              >
                <option value="" disabled>Select shipment</option>
                {shipments.map((shipment) => (
                  <option key={shipment.id} value={shipment.id}>
                    {shipment.trackingNumber} - {shipment.origin} → {shipment.destination}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-slategray-100">
              Location
              <input
                value={updateForm.location}
                onChange={(event) => setUpdateForm({ ...updateForm, location: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
                required
              />
            </label>
            <label className="text-sm text-slategray-100">
              Status
              <select
                value={updateForm.status}
                onChange={(event) => setUpdateForm({ ...updateForm, status: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
              >
                {trackingStatuses.map((status) => (
                  <option key={status} value={status}>{statusLabel[status] ?? status}</option>
                ))}
              </select>
            </label>
            <label className="text-sm text-slategray-100">
              Notes (optional)
              <input
                value={updateForm.notes}
                onChange={(event) => setUpdateForm({ ...updateForm, notes: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 rounded-2xl bg-cyber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyber-500"
          >
            Post update
          </button>
        </form>

        <div className="mt-10 overflow-hidden rounded-3xl border border-slategray-700/40 bg-navy-800/60">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-navy-950/80 text-slategray-300">
                <tr>
                  <th className="px-6 py-4 font-semibold">Tracking ID</th>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Route</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slategray-700/40">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-slategray-200">
                      Loading shipments...
                    </td>
                  </tr>
                ) : shipments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-6 text-slategray-200">
                      No shipments created yet.
                    </td>
                  </tr>
                ) : (
                  shipments.map((shipment) => (
                    <tr key={shipment.id} className="text-slategray-100">
                      <td className="px-6 py-4 font-semibold text-white">{shipment.trackingNumber}</td>
                      <td className="px-6 py-4">
                        {shipment.client?.name || 'Client'} ({shipment.client?.email})
                      </td>
                      <td className="px-6 py-4">
                        {shipment.origin} - {shipment.destination}
                      </td>
                      <td className="px-6 py-4">{statusLabel[shipment.status] ?? shipment.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
