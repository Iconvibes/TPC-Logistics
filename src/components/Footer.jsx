export default function Footer() {
  return (
    <footer className="border-t border-slategray-700/40 bg-navy-950">
      <div className="page-container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-semibold text-white">TPC Logistics</p>
          <p className="mt-2 text-sm text-slategray-300">
            Nationwide transportation, warehousing, and supply chain support across Nigeria.
          </p>
        </div>
        <div className="text-sm text-slategray-300">
          Powered by <span className="font-semibold text-cyber-300">Codeferd Digital</span>
        </div>
      </div>
    </footer>
  )
}
