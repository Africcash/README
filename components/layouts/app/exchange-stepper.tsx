import { Check, Loader2 } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Text } from "@/components/ui/text"

type ExchangeStepperProps = {
  steps: string[]
  currentStep: number
}

function ExchangeStepper({ steps, currentStep }: ExchangeStepperProps) {
  return (
    <div className="flex items-center gap-3">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-3">
          {i > 0 && <span className="w-6 border-t border-dashed border-zinc-300" />}
          <div className="flex items-center gap-1.5">
            {i < currentStep ? (
              <div className="flex size-4 items-center justify-center rounded-full" style={{ backgroundColor: AppColors.primaryPurple }}>
                <Check className="size-2.5 text-white" />
              </div>
            ) : i === currentStep ? (
              <Loader2 className="size-4 animate-spin" style={{ color: AppColors.primaryPurple }} />
            ) : (
              <div className="size-4 rounded-full border-2 border-zinc-200" />
            )}
            <Text size="sm" weight={i === currentStep ? "medium" : "normal"} muted={i !== currentStep}>
              {step}
            </Text>
          </div>
        </div>
      ))}
    </div>
  )
}

export { ExchangeStepper }
