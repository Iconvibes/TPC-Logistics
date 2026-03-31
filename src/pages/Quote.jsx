import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const steps = ['Contact', 'Shipment', 'Review']

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  freightMode: '',
  weight: '',
  length: '',
  width: '',
  height: '',
  notes: '',
}

export default function QuotePage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const reduceMotion = useReducedMotion()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const currentStepValid = useMemo(() => {
    if (step === 0) {
      return form.name && form.email && form.phone
    }
    if (step === 1) {
      return form.freightMode && form.weight && form.length && form.width && form.height
    }
    return true
  }, [form, step])

  const handleNext = () => {
    if (!currentStepValid) {
      setError('Please complete all required fields before continuing.')
      return
    }
    setError('')
    setStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setError('')
    setStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!currentStepValid) {
      setError('Please complete all required fields before submitting.')
      return
    }
    setError('')
    alert('Quote request captured. Our team will respond shortly.')
    setForm(initialForm)
    setStep(0)
  }

  const motionProps = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.3 },
      }

  return (
    <section className="bg-navy-900 pb-16 pt-12">
      <div className="page-container">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">Request a Quote</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Nationwide delivery request</h1>
          <p className="mt-2 text-sm text-slategray-100">
            Provide delivery details to receive a tailored logistics proposal for shipments within Nigeria.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.35fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slategray-700/40 bg-navy-800/60 p-8"
          >
            <div className="flex items-center gap-4">
              {steps.map((label, index) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                      index <= step
                        ? 'border-cyber-500 bg-cyber-500/20 text-cyber-100'
                        : 'border-slategray-700 text-slategray-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`text-sm ${index <= step ? 'text-white' : 'text-slategray-400'}`}>
                    {label}
                  </span>
                  {index < steps.length - 1 ? <span className="text-slategray-600">&gt;</span> : null}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div key="contact" className="mt-8 space-y-6" {...motionProps}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm text-slategray-100">
                      Full name
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
                        required
                      />
                    </label>
                    <label className="text-sm text-slategray-100">
                      Company
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
                      />
                    </label>
                    <label className="text-sm text-slategray-100">
                      Email
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
                        required
                      />
                    </label>
                    <label className="text-sm text-slategray-100">
                      Phone
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
                        required
                      />
                    </label>
                  </div>
                </motion.div>
              ) : null}

              {step === 1 ? (
                <motion.div key="shipment" className="mt-8 space-y-6" {...motionProps}>
                  <label className="text-sm text-slategray-100">
                    Transport mode
                    <select
                      name="freightMode"
                      value={form.freightMode}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
                      required
                    >
                      <option value="" disabled>Select mode</option>
                      <option value="Road">Road</option>
                      <option value="Air">Air</option>
                      <option value="Sea (Coastal)">Sea (Coastal)</option>
                    </select>
                  </label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm text-slategray-100">
                      Weight (kg)
                      <input
                        type="number"
                        name="weight"
                        value={form.weight}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
                        required
                      />
                    </label>
                    <label className="text-sm text-slategray-100">
                      Length (cm)
                      <input
                        type="number"
                        name="length"
                        value={form.length}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
                        required
                      />
                    </label>
                    <label className="text-sm text-slategray-100">
                      Width (cm)
                      <input
                        type="number"
                        name="width"
                        value={form.width}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
                        required
                      />
                    </label>
                    <label className="text-sm text-slategray-100">
                      Height (cm)
                      <input
                        type="number"
                        name="height"
                        value={form.height}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
                        required
                      />
                    </label>
                  </div>
                  <label className="text-sm text-slategray-100">
                    Notes
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows="3"
                      className="mt-2 w-full rounded-2xl border border-slategray-700/60 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-cyber-500 focus:outline-none focus:ring-2 focus:ring-cyber-600/40"
                    />
                  </label>
                </motion.div>
              ) : null}

              {step === 2 ? (
                <motion.div key="review" className="mt-8 space-y-6" {...motionProps}>
                  <div className="rounded-2xl border border-slategray-700/40 bg-navy-900/70 p-6 text-sm text-slategray-100">
                    <p className="font-semibold text-white">Review submission</p>
                    <div className="mt-4 grid gap-2">
                      <p>Name: {form.name}</p>
                      <p>Email: {form.email}</p>
                      <p>Phone: {form.phone}</p>
                      <p>Company: {form.company || 'N/A'}</p>
                      <p>Transport mode: {form.freightMode}</p>
                      <p>Weight: {form.weight} kg</p>
                      <p>Dimensions: {form.length} x {form.width} x {form.height} cm</p>
                      <p>Notes: {form.notes || 'None'}</p>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {error ? (
              <p className="mt-4 text-sm text-rose-200" role="alert">
                {error}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className="rounded-2xl border border-slategray-700/60 px-5 py-2 text-sm text-slategray-100 transition hover:border-cyber-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>
              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded-2xl bg-cyber-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-cyber-500"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-2xl bg-cyber-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-cyber-500"
                >
                  Submit request
                </button>
              )}
            </div>
          </form>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slategray-700/40 bg-navy-800/60 p-6 text-sm text-slategray-100">
              <h2 className="text-lg font-semibold text-white">Quote guidance</h2>
              <p className="mt-3">
                Provide accurate weights and dimensions to receive the most competitive routing and pricing.
              </p>
              <ul className="mt-4 space-y-2">
                <li>Transport mode selection influences SLA and routing.</li>
                <li>Dimensions are required for volumetric calculations.</li>
                <li>One of our specialists will confirm final routing.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-slategray-700/40 bg-navy-900/70 p-6 text-sm text-slategray-100">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">Support</p>
              <p className="mt-3">Need help before you submit? Call or WhatsApp our operations desk.</p>
              <p className="mt-3 font-semibold text-white">+234 802 255 0250</p>
              <p className="mt-1 font-semibold text-white">+234 903 702 8237</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}


