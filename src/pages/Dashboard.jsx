const shipments = [
  {
    id: 'TPC-10452',
    origin: 'Lagos, Nigeria',
    destination: 'Abuja, Nigeria',
    status: 'In Transit',
    eta: 'Mar 13, 2026',
  },
  {
    id: 'TPC-10410',
    origin: 'Port Harcourt, Nigeria',
    destination: 'Kano, Nigeria',
    status: 'At Hub',
    eta: 'Mar 15, 2026',
  },
  {
    id: 'TPC-10388',
    origin: 'Ibadan, Nigeria',
    destination: 'Enugu, Nigeria',
    status: 'Delivered',
    eta: 'Mar 10, 2026',
  },
]

const statusBadge = (status) => {
  const styles = {
    'In Transit': 'border-cyber-500/50 bg-cyber-500/15 text-cyber-100',
    Delivered: 'border-emerald-400/40 bg-emerald-400/15 text-emerald-100',
    'At Hub': 'border-cyber-300/50 bg-cyber-300/15 text-cyber-100',
  }

  return styles[status] || 'border-slategray-500/40 bg-slategray-500/15 text-slategray-100'
}

const handleDownload = (trackingNumber) => {
  const content = `Waybill\nTracking Number: ${trackingNumber}\nIssued by TPC Logistics`
  const blob = new Blob([content], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${trackingNumber}-waybill.pdf`
  link.click()
  URL.revokeObjectURL(url)
}

export default function DashboardPage() {
  return (
    <section className="bg-navy-900 pb-16 pt-12">
      <div className="page-container space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">Client Dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Active shipments overview</h1>
          <p className="mt-2 text-sm text-slategray-100">
            Track performance, download documentation, and manage exceptions across Nigeria from one control desk.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slategray-700/40 bg-navy-800/60">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-navy-950/80 text-slategray-300">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Tracking ID</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Route</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                  <th scope="col" className="px-6 py-4 font-semibold">ETA</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Documents</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slategray-700/40">
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className="text-slategray-100">
                    <td className="px-6 py-4 font-semibold text-white">{shipment.id}</td>
                    <td className="px-6 py-4">
                      {shipment.origin} - {shipment.destination}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusBadge(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{shipment.eta}</td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleDownload(shipment.id)}
                        className="rounded-full border border-cyber-500/60 px-4 py-2 text-xs font-semibold text-cyber-100 transition hover:bg-cyber-500/20"
                      >
                        Download Waybill (PDF)
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.6fr]">
          <div className="rounded-3xl border border-slategray-700/40 bg-navy-800/60 p-6">
            <h2 className="text-lg font-semibold text-white">Alerts and exceptions</h2>
            <p className="mt-3 text-sm text-slategray-100">
              No critical exceptions detected. Two shipments are awaiting hub dispatch confirmation.
            </p>
            <div className="mt-4 space-y-2 text-sm text-slategray-100">
              <p>- Hub dispatch pending for TPC-10410</p>
              <p>- Delivery appointment scheduled for TPC-10452</p>
            </div>
          </div>
          <div className="rounded-3xl border border-slategray-700/40 bg-navy-900/70 p-6">
            <h3 className="text-lg font-semibold text-white">Documents center</h3>
            <p className="mt-3 text-sm text-slategray-100">
              Manage commercial invoices, packing lists, and proof-of-delivery records for all active shipments.
            </p>
            <button className="mt-6 w-full rounded-2xl bg-cyber-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyber-500">
              Open document vault
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

