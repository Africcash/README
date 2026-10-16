import { MapPin } from "lucide-react"

const pins = [
  { top: "14%", left: "72%", color: "#7657FF" },
  { top: "30%", left: "22%", color: "#7657FF" },
  { top: "46%", left: "58%", color: "#7657FF" },
  { top: "66%", left: "82%", color: "#7657FF" },
  { top: "76%", left: "16%", color: "#A2D729" },
]

function MapPlaceholder() {
  return (
    <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-2xl bg-zinc-100">
      {/* decorative street grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0 1px, transparent 1px 48px)",
        }}
      />

      {pins.map((pin, i) => (
        <MapPin
          key={i}
          className="absolute size-5 -translate-x-1/2 -translate-y-full"
          style={{ top: pin.top, left: pin.left, color: pin.color }}
          fill={pin.color}
        />
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 -m-2 animate-ping rounded-full bg-blue-400/40" />
        <span className="relative block size-3 rounded-full border-2 border-white bg-blue-500" />
      </div>
    </div>
  )
}

export { MapPlaceholder }
