"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface GridBackgroundProps {
  title: string
  description?: string
  showAvailability?: boolean
  children?: React.ReactNode
  className?: string
}

export function GridBackground({
  title,
  description,
  showAvailability = false,
  children,
  className = '',
}: GridBackgroundProps) {
  return (
    <div 
      className={cn(
        'px-10 py-14 rounded-lg relative flex flex-col items-center justify-center overflow-hidden',
        className
      )}
      style={{
        backgroundColor: 'rgba(15, 15, 15, 0.4)',
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}
    >
      <div 
        className="w-2 h-2 rounded-full absolute shadow-[0_0_15px] shadow-blue-500 z-10"
        style={{
          animation: `border-follow 8s linear infinite`,
          backgroundColor: '#3b82f6'
        }}
      />
      <div 
        className="absolute inset-0 border rounded-lg pointer-events-none"
        style={{
          animation: 'border-color-change 8s linear infinite',
          borderWidth: '2px'
        }}
      />

      <div className="relative z-20 text-center w-full">
        <h3 className='text-3xl md:text-4xl font-extrabold text-foreground'>{title}</h3>
        {description && (
          <p className='text-base md:text-lg mt-3 text-muted-foreground leading-relaxed'>{description}</p>
        )}

        {children && (
          <div className="mt-6 text-base md:text-lg text-muted-foreground">
            {children}
          </div>
        )}

        {showAvailability && (
          <div className="mt-4 text-green-500 text-xs flex items-center justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2 animate-pulse" />
            Available
          </div>
        )}
      </div>
    </div>
  )
}
