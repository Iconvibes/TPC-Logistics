import Hero from '../components/Hero'

export default function HomePage() {
  return (
    <div>
      <Hero />

      <section id="services" className="bg-navy-900 pb-20">
        <div className="page-container">
          <div className="grid gap-8 rounded-3xl border border-slategray-700/40 bg-navy-800/60 p-10 lg:grid-cols-3">
            {[
              {
                title: 'Delivery Services',
                description:
                  'Fast and reliable delivery of goods across Nigeria.',
              },
              {
                title: 'Freight Forwarding & Transportation',
                description:
                  'Road and air transport options tailored to your cargo.',
              },
              {
                title: 'Warehousing & Storage',
                description:
                  'Secure facilities for short- and long-term storage.',
              },
              {
                title: 'Supply Chain Management',
                description:
                  'Custom planning and optimization to reduce delays and costs.',
              },
              {
                title: 'Import & Export Support',
                description:
                  'Documentation and clearance support for Nigeria-bound shipments with inland distribution.',
              },
              {
                title: 'Real-time Tracking & Delivery Management',
                description:
                  'Live updates from pickup to final delivery.',
              },
              {
                title: 'Property & Land Sales',
                description:
                  'Buying and selling of properties and land for clients and partners.',
              },
            ].map((service) => (
              <div key={service.title} className="space-y-3">
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="text-sm text-slategray-100">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-navy-900 pb-24">
        <div className="page-container">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-slategray-700/40 bg-navy-800/70 p-10 lg:flex-row lg:items-center">
            <div className="max-w-xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slategray-300">Get in Touch</p>
              <h2 className="text-2xl font-semibold text-white">
                Talk to our team for nationwide logistics support.
              </h2>
              <p className="text-sm text-slategray-100">
                We currently deliver services within Nigeria only.
              </p>
              <div className="mt-4 space-y-2 text-sm text-slategray-100">
                <p>Address: 9b, Atiba Close, Onipetesi Estate, Ikeja, Lagos.</p>
                <p>
                  Phone:{' '}
                  <a className="text-cyber-200 hover:text-cyber-100" href="tel:+2348022550250">
                    +234 802 255 0250
                  </a>
                  ,{' '}
                  <a className="text-cyber-200 hover:text-cyber-100" href="tel:+2349037028237">
                    +234 903 702 8237
                  </a>
                </p>
                <p>
                  Email:{' '}
                  <a
                    className="text-cyber-200 hover:text-cyber-100"
                    href="mailto:tpclogisticscompany@gmail.com"
                  >
                    tpclogisticscompany@gmail.com
                  </a>
                </p>
                <p>
                  WhatsApp:{' '}
                  <a className="text-cyber-200 hover:text-cyber-100" href="https://wa.me/2348022550250">
                    Chat with us
                  </a>
                </p>
                <p>
                  Website:{' '}
                  <a className="text-cyber-200 hover:text-cyber-100" href="https://tpclogisticscompany.com">
                    www.tpclogisticscompany.com
                  </a>
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/2348022550250"
              className="rounded-2xl bg-cyber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyber-500"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
