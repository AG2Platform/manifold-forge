import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './lib/utils';
import { getNotifications, fakeMetric, fakeTimeSeries, getQuickActions } from './lib/data';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import * as Icons from 'lucide-react';
import React, { useState } from 'react';

function GlassCard({ className = '', children, ...props }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl border border-border shadow-glass',
        'p-6',
        className
      )}
      {...props}
    >
      {/* Subtle top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accentGlow to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  React.useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const from = display;
    const to = value;
    const duration = 700;
    function animate(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplay(Math.round(from + (to - from) * (1 - Math.cos(Math.PI * progress)) / 2));
      if (progress < 1) raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, [value]);
  return <span>{display.toLocaleString()}</span>;
}

function DashboardMetrics() {
  const [metrics] = useState({
    users: fakeMetric(1200, 0.1),
    sessions: fakeMetric(3400, 0.15),
    revenue: fakeMetric(24000, 0.2),
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <GlassCard>
        <div className="text-sm text-zinc-500 mb-1">Active Users</div>
        <div className="text-3xl font-semibold text-zinc-900 mb-1"><AnimatedNumber value={metrics.users} /></div>
        <div className="text-xs text-zinc-400">Today</div>
      </GlassCard>
      <GlassCard>
        <div className="text-sm text-zinc-500 mb-1">Sessions</div>
        <div className="text-3xl font-semibold text-zinc-900 mb-1"><AnimatedNumber value={metrics.sessions} /></div>
        <div className="text-xs text-zinc-400">This week</div>
      </GlassCard>
      <GlassCard>
        <div className="text-sm text-zinc-500 mb-1">Revenue</div>
        <div className="text-3xl font-semibold text-zinc-900 mb-1">$
          <AnimatedNumber value={metrics.revenue} /></div>
        <div className="text-xs text-zinc-400">This month</div>
      </GlassCard>
    </div>
  );
}

function ActivityChart() {
  const [data] = useState(fakeTimeSeries(14));
  return (
    <GlassCard className="col-span-2 md:col-span-2">
      <div className="flex items-center justify-between mb-2">
        <div className="text-zinc-700 font-medium">Activity</div>
        <div className="text-xs text-zinc-400">Last 2 weeks</div>
      </div>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} width={32} />
            <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.9)', borderRadius: 8, fontSize: 13, color: '#222' }} />
            <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

function NotificationsPanel() {
  const notifications = getNotifications();
  return (
    <GlassCard className="p-0">
      <div className="px-6 pt-6 pb-2 text-zinc-700 font-medium">Notifications</div>
      <ul>
        <AnimatePresence>
          {notifications.map((n, i) => {
            const LucideIcon = (Icons[n.icon as keyof typeof Icons] ?? Icons.Bell) as React.ComponentType<any>;
            return (
              <motion.li
                key={n.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ delay: i * 0.07 }}
                className={cn('flex items-start gap-3 px-6 py-3 border-b last:border-b-0 border-border hover:bg-accentGlow/40 transition-colors')}
              >
                <span className="mt-1"><LucideIcon className="w-5 h-5 text-blue-400" /></span>
                <div className="flex-1">
                  <div className="font-medium text-zinc-800 text-sm">{n.title}</div>
                  <div className="text-xs text-zinc-500">{n.description}</div>
                </div>
                <span className="text-xs text-zinc-400 mt-1">{n.time}</span>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </GlassCard>
  );
}

function QuickActions() {
  const actions = getQuickActions();
  return (
    <GlassCard className="flex flex-row items-center justify-between gap-3 p-4">
      {actions.map((a, i) => {
        const LucideIcon = (Icons[a.icon as keyof typeof Icons] ?? Icons.Circle) as React.ComponentType<any>;
        return (
          <motion.button
            key={a.label}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-white/70 shadow-glass border border-border text-zinc-700 hover:bg-accentGlow/60 transition-all"
            style={{ boxShadow: '0 2px 12px 0 rgba(182,224,254,0.15)' }}
            aria-label={a.label}
          >
            <LucideIcon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{a.label}</span>
          </motion.button>
        );
      })}
    </GlassCard>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-6 pt-8 pb-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-2" style={{ fontFamily: 'SF Pro Display, SF Pro Text, ui-sans-serif, system-ui' }}>
          Dashboard
        </h1>
        <p className="text-lg text-zinc-500 max-w-xl">
          A clean, ambient dashboard inspired by Apple’s design language. Elegant glassmorphism, subtle gradients, and smooth micro-interactions.
        </p>
      </header>
      <main className="flex-1 px-4 md:px-8 pb-8 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 flex flex-col gap-6">
            <DashboardMetrics />
            <ActivityChart />
          </div>
          <div className="md:col-span-1 flex flex-col gap-6">
            <NotificationsPanel />
            <QuickActions />
          </div>
        </div>
      </main>
      <footer className="text-xs text-zinc-400 py-4 text-center">
        &copy; {new Date().getFullYear()} Apple-Inspired Dashboard Demo
      </footer>
    </div>
  );
}
