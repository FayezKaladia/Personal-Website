'use client'

import { SplineScene } from './spline';
import { Spotlight } from './spotlight';

export function SplineSceneBasic() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* subtle blended background to integrate with page */}
      <div className="pointer-events-none absolute -right-20 -top-10 w-[680px] h-[680px] rounded-full bg-gradient-to-br from-black/60 via-teal-900/20 to-transparent opacity-80 blur-3xl" />

      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="absolute inset-0">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </div>
  )
}
