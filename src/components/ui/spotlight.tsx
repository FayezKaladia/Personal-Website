'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

type SpotlightProps = {
  className?: string
  size?: number
}

export function Spotlight({ className, size = 200 }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const x = useSpring(0)
  const y = useSpring(0)

  const left = useTransform(x, v => `${v - size / 2}px`)
  const top = useTransform(y, v => `${v - size / 2}px`)

  const onMove = useCallback((e: MouseEvent) => {
    const rect = ref.current?.parentElement?.getBoundingClientRect()
    if (!rect) return
    x.set(e.clientX - rect.left)
    y.set(e.clientY - rect.top)
  }, [x, y])

  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return

    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseenter', () => setHovered(true))
    parent.addEventListener('mouseleave', () => setHovered(false))

    return () => {
      parent.removeEventListener('mousemove', onMove)
    }
  }, [onMove])

  return (
    <motion.div
      ref={ref}
      className={cn(
        'pointer-events-none absolute rounded-full blur-xl',
        hovered ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        width: size,
        height: size,
        left,
        top,
        background:
          'radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)',
      }}
    />
  )
}
