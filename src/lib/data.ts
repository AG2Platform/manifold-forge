// src/lib/data.ts

const notifications = [
  {
    id: 1,
    icon: 'Bell',
    title: 'System Update',
    description: 'Your system was updated successfully.',
    time: '2m ago',
  },
  {
    id: 2,
    icon: 'CheckCircle',
    title: 'Backup Complete',
    description: 'Your files have been backed up.',
    time: '10m ago',
  },
  {
    id: 3,
    icon: 'AlertCircle',
    title: 'Low Battery',
    description: 'Your device battery is below 20%.',
    time: '30m ago',
  },
];

export function getNotifications() {
  return notifications;
}

export function fakeMetric(base = 1000, variance = 0.2) {
  return Math.round(base * (1 + (Math.random() - 0.5) * variance));
}

export function fakeTimeSeries(days = 14) {
  const base = 100;
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: Math.round(base * (1 + i * 0.04) + Math.random() * 10),
  }));
}

export function getQuickActions() {
  return [
    { icon: 'Sun', label: 'Light' },
    { icon: 'Moon', label: 'Night' },
    { icon: 'Wifi', label: 'Wi-Fi' },
    { icon: 'Bluetooth', label: 'Bluetooth' },
  ];
}
