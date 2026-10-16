import { AppColors } from "@/components/reuseables/app_colors";
import { Appimages } from "@/components/reuseables/app_images";
import { Text } from "@/components/ui/text";
import Image from "next/image";
import type { AgentProfile } from "@/lib/api/types";
import { AvatarComp } from "./avatar-comp";

const AgentProfileDetailsBanner = ({ agent }: { agent: AgentProfile }) => {
    return (
        <div className='w-full rounded-[14px] relative text-white overflow-hidden' style={{backgroundColor: AppColors.primaryPurple}}>
           <Image
            src={Appimages.percent}           
            alt="Percent Icon"
            width={350}
            height={200}
            className="absolute top-0 right-0 hidden md:block"
           />

            <div className="relative flex flex-col items-center gap-6 px-6 py-8 md:flex-row md:items-start md:justify-between md:px-12 md:py-6">
                <div className="flex flex-col items-center gap-4 text-center md:flex-row md:items-center md:gap-6 md:text-left">
                    <AvatarComp
                        src={agent.avatar_url || Appimages.agentAvatarPlaceholder}
                        alt={agent.name}
                        size="large"
                        border="medium"
                    />

                    <div className="flex flex-col justify-center gap-4">
                        <div>
                            <Text size="xl" weight="semibold" className="text-white">
                                {agent.name}
                            </Text>
                            <Text size="sm" className="text-white/70">
                                {agent.city}, {agent.country}
                            </Text>
                        </div>

                        <div className="flex gap-10">
                            <div>
                                <Text weight="semibold" className="text-white">{agent.reputation_score}/5</Text>
                                <Text size="sm" className="text-white/70">Rating</Text>
                            </div>
                            <div>
                                <Text weight="semibold" className="text-white">{agent.completed_trades}</Text>
                                <Text size="sm" className="text-white/70">Exchanges</Text>
                            </div>
                            <div>
                                <Text weight="semibold" className="text-white">{agent.review_count}</Text>
                                <Text size="sm" className="text-white/70">Reviews</Text>
                            </div>
                        </div>
                    </div>
                </div>

                <Text size="sm" className="hidden shrink-0 text-white/80 md:block">
                    Report Agent
                </Text>
            </div>
        </div>
    );
};

export default AgentProfileDetailsBanner;