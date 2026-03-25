import { useMemo, useState } from 'react'

const emissionFactors = {
  Air: 1.1,
  Sea: 0.015,
  Land: 0.062,
  Rail: 0.022,
}

export default function SustainabilityWidget() {
  const [mode, setMode] = useState('Air')
  const [distance, setDistance] = useState('')
  const [weight, setWeight] = useState('')

  const result = useMemo(() => {
    const distanceKm = Number(distance)
    const weightKg = Number(weight)
    if (!distanceKm || !weightKg) return null
    const tonnes = weightKg / 1000
    const factor = emissionFactors[mode] || 0
    const emissions = distanceKm * tonnes * factor
    return {
      emissions: emissions.toFixed(2),
      factor,
    }
  }, [distance, weight, mode])

  return (
    <div className="rounded-3xl border border-slategray-700/40 bg-navy-800/60 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">Sustainability</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">CO2 emissions estimator</h2>
          <p className="mt-2 text-sm text-slategray-100">
            Estimate carbon footprint using distance, weight, and freight mode.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="text-sm text-slategray-100">
          Freight mode
          <select
            value={mode}
            onChange={(event) => setMode(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
          >
            <option value="Air">Air</option>
            <option value="Sea">Sea</option>
            <option value="Land">Land</option>
            <option value="Rail">Rail</option>
          </select>
        </label>
        <label className="text-sm text-slategray-100">
          Distance (km)
          <input
            type="number"
            value={distance}
            onChange={(event) => setDistance(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
            placeholder="e.g. 1200"
          />
        </label>
        <label className="text-sm text-slategray-100">
          Weight (kg)
          <input
            type="number"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
            placeholder="e.g. 1500"
          />
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-slategray-700/40 bg-navy-900/70 p-5" aria-live="polite">
        {result ? (
          <div>
            <p className="text-sm text-slategray-100">Estimated emissions</p>
            <p className="mt-2 text-2xl font-semibold text-white">{result.emissions} kg CO2</p>
            <p className="mt-2 text-xs text-slategray-400">
              Factor used: {result.factor} kg CO2 per tonne-km. Estimates only.
            </p>
          </div>
        ) : (
          <p className="text-sm text-slategray-100">Enter distance and weight to calculate emissions.</p>
        )}
      </div>
    </div>
  )
}
