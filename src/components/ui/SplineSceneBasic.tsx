'use client'

import { SplineScene } from './spline';
import { Spotlight } from './spotlight';

export function SplineSceneBasic() {
  return (
    <div className="w-full h-full bg-black/[0.96] relative overflow-hidden rounded-lg">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <SplineScene
        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  )
}
