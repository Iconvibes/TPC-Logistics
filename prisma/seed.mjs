import { FreightMode, PrismaClient, Role, TrackingStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const daysAgo = (days) => new Date(Date.now() - days * 24 * 60 * 60 * 1000)

async function main() {
  await prisma.trackingUpdate.deleteMany()
  await prisma.shipment.deleteMany()
  await prisma.user.deleteMany()

  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'Admin@12345'
  const clientPassword = process.env.SEED_CLIENT_PASSWORD ?? 'Client@12345'
  const adminHash = await bcrypt.hash(adminPassword, 10)
  const clientHash = await bcrypt.hash(clientPassword, 10)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@tpclogistics.com',
      name: 'TPC Admin',
      phone: '+234 800 000 0000',
      passwordHash: adminHash,
      role: Role.ADMIN,
    },
  })

  const clientA = await prisma.user.create({
    data: {
      email: 'clienta@tpclogistics.com',
      name: 'Ada Okoro',
      phone: '+234 811 111 1111',
      passwordHash: clientHash,
      role: Role.CLIENT,
    },
  })

  const clientB = await prisma.user.create({
    data: {
      email: 'clientb@tpclogistics.com',
      name: 'Femi Bello',
      phone: '+234 822 222 2222',
      passwordHash: clientHash,
      role: Role.CLIENT,
    },
  })

  const shipments = [
    {
      trackingNumber: 'TPC-10001',
      clientId: clientA.id,
      origin: 'Lagos, Nigeria',
      destination: 'Abuja, Nigeria',
      weight: 1200,
      freightMode: FreightMode.ROAD,
      status: TrackingStatus.IN_TRANSIT,
      description: 'Retail goods palletized',
      events: [
        { location: 'Lagos, Nigeria', status: TrackingStatus.CREATED, timestamp: daysAgo(6) },
        { location: 'Lagos, Nigeria', status: TrackingStatus.PICKED_UP, timestamp: daysAgo(5) },
        { location: 'Ibadan, Nigeria', status: TrackingStatus.IN_TRANSIT, timestamp: daysAgo(4) },
        { location: 'Lokoja, Nigeria', status: TrackingStatus.IN_TRANSIT, timestamp: daysAgo(3) },
      ],
    },
    {
      trackingNumber: 'TPC-10002',
      clientId: clientA.id,
      origin: 'Port Harcourt, Nigeria',
      destination: 'Kano, Nigeria',
      weight: 3200,
      freightMode: FreightMode.ROAD,
      status: TrackingStatus.AT_PORT,
      description: 'Industrial equipment',
      events: [
        { location: 'Port Harcourt, Nigeria', status: TrackingStatus.CREATED, timestamp: daysAgo(5) },
        { location: 'Port Harcourt, Nigeria', status: TrackingStatus.PICKED_UP, timestamp: daysAgo(4) },
        { location: 'Abuja Hub, Nigeria', status: TrackingStatus.AT_PORT, timestamp: daysAgo(2) },
      ],
    },
    {
      trackingNumber: 'TPC-10003',
      clientId: clientB.id,
      origin: 'Ibadan, Nigeria',
      destination: 'Enugu, Nigeria',
      weight: 780,
      freightMode: FreightMode.ROAD,
      status: TrackingStatus.DELIVERED,
      description: 'Consumer goods',
      events: [
        { location: 'Ibadan, Nigeria', status: TrackingStatus.CREATED, timestamp: daysAgo(7) },
        { location: 'Ibadan, Nigeria', status: TrackingStatus.PICKED_UP, timestamp: daysAgo(6) },
        { location: 'Benin City, Nigeria', status: TrackingStatus.IN_TRANSIT, timestamp: daysAgo(5) },
        { location: 'Enugu, Nigeria', status: TrackingStatus.DELIVERED, timestamp: daysAgo(2) },
      ],
    },
    {
      trackingNumber: 'TPC-10004',
      clientId: clientB.id,
      origin: 'Kaduna, Nigeria',
      destination: 'Lagos, Nigeria',
      weight: 450,
      freightMode: FreightMode.ROAD,
      status: TrackingStatus.OUT_FOR_DELIVERY,
      description: 'Medical equipment',
      events: [
        { location: 'Kaduna, Nigeria', status: TrackingStatus.CREATED, timestamp: daysAgo(3) },
        { location: 'Kaduna, Nigeria', status: TrackingStatus.PICKED_UP, timestamp: daysAgo(3) },
        { location: 'Kwara, Nigeria', status: TrackingStatus.IN_TRANSIT, timestamp: daysAgo(2) },
        { location: 'Lagos, Nigeria', status: TrackingStatus.OUT_FOR_DELIVERY, timestamp: daysAgo(1) },
      ],
    },
    {
      trackingNumber: 'TPC-10005',
      clientId: clientA.id,
      origin: 'Kano, Nigeria',
      destination: 'Lagos, Nigeria',
      weight: 980,
      freightMode: FreightMode.ROAD,
      status: TrackingStatus.DELAYED,
      description: 'Agricultural produce',
      events: [
        { location: 'Kano, Nigeria', status: TrackingStatus.CREATED, timestamp: daysAgo(7) },
        { location: 'Kano, Nigeria', status: TrackingStatus.PICKED_UP, timestamp: daysAgo(6) },
        { location: 'Ilorin, Nigeria', status: TrackingStatus.IN_TRANSIT, timestamp: daysAgo(5) },
        { location: 'Ibadan, Nigeria', status: TrackingStatus.DELAYED, timestamp: daysAgo(2), notes: 'Rain delay' },
      ],
    },
  ]

  for (const shipment of shipments) {
    await prisma.shipment.create({
      data: {
        trackingNumber: shipment.trackingNumber,
        clientId: shipment.clientId,
        origin: shipment.origin,
        destination: shipment.destination,
        weight: shipment.weight,
        freightMode: shipment.freightMode,
        status: shipment.status,
        description: shipment.description,
        trackingEvents: {
          create: shipment.events.map((event) => ({
            location: event.location,
            status: event.status,
            timestamp: event.timestamp,
            notes: event.notes ?? null,
          })),
        },
      },
    })
  }

  await prisma.user.update({
    where: { id: admin.id },
    data: { isActive: true },
  })
}

main()
  .catch((error) => {
    console.error('Seed failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
