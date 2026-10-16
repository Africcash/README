import { Accordion } from "@base-ui/react/accordion"
import { Plus } from "lucide-react"
import { AppColors } from "@/components/reuseables/app_colors"
import { Text } from "@/components/ui/text"

const faqs: { question: string; answer: string }[] = [
  {
    question: "How do I connect a wallet?",
    answer:
      "Tap Connect Wallet on the home screen and choose your provider. Africcash never stores your private keys.",
  },
  {
    question: "Why must I enable USDC?",
    answer:
      "USDC is the asset locked in escrow during a cash exchange, so your wallet needs it enabled to start a transaction.",
  },
  {
    question: "How do I find nearby agents?",
    answer:
      "Open the Agents tab to see verified agents near your current location, ranked by distance and rating.",
  },
  {
    question: "How do I lock USDC in escrow?",
    answer:
      "Choose an agent and amount, then confirm the transaction. Your USDC is held in escrow until the handover is confirmed.",
  },
  {
    question: "When do I confirm cash receipt?",
    answer:
      "Once you've received your cash from the agent in person, confirm it in the app to release the escrowed USDC.",
  },
  {
    question: "What fees apply to an exchange?",
    answer:
      "Fees vary by agent and amount and are shown upfront before you confirm any transaction.",
  },
]

function Faq() {
  return (
    <section className="px-6 py-10 md:px-12">
      <div className="rounded-3xl p-8 md:p-12" style={{ backgroundColor: AppColors.primaryPurple }}>
        <div className="flex flex-col gap-10 md:flex-row md:gap-12">
          <Text as="h2" size="3xl" weight="bold" className="max-w-xs leading-tight text-white">
            Frequently Asked Questions
          </Text>

          <Accordion.Root className="flex flex-1 flex-col gap-3">
            {faqs.map((faq) => (
              <Accordion.Item
                key={faq.question}
                value={faq.question}
                style={{ backgroundColor: AppColors.darkPurple }}
                className="group overflow-hidden rounded-4xl"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left">
                    <Text weight="medium" className="text-white">
                      {faq.question}
                    </Text>
                    <Plus className="size-4 shrink-0 text-white transition-transform duration-200 group-data-[open]:rotate-45" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Panel className="px-6 pb-4">
                  <Text size="sm" className="text-white/70">
                    {faq.answer}
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  )
}

export { Faq, faqs }
