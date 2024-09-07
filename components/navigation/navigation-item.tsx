"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";

interface NavigationItemProps {
    id: string;        // Changed from String to string
    imageUrl: string; // Changed from String to string
    name: string;     // Changed from String to string
}

export const NavigationItem = ({
    id,
    imageUrl,
    name
}: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();
    
    const onClick = () => {
        router.push(`/servers/${id}`);
    }

    return (
        <ActionTooltip
            side="right"
            align="center"
            label={name}
        >
            <button
                onClick={onClick}
                className="group relative flex items-center"
            >
                <div className={cn(
                    "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
                    params?.serverId !== id && "group-hover:h-[20px]",
                    params?.serverId === id ? "h-[36px]" : "h-[8px]"
                )} />
                <div className={cn(
                    "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                    params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
                )}>
                    <Image
                        fill
                        src={imageUrl} // Ensure imageUrl is a valid string
                        alt="Channel"
                    />
                </div>
            </button>
        </ActionTooltip>
    )
}







// <---PREVIOUS CODE -->


// "use client";

// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import {cn} from "@/lib/utils";
// import { ActionTooltip } from "@/components/action-tooltip";

// interface NavigationItemProps {
//     id: String;
//     imageUrl: String;
//     name: String;
// };

// export const NavigationItem = ({
//     id,
//     imageUrl,
//     name
// }: NavigationItemProps) => {
//     const params = useParams();
//     const router = useRouter();
    
//     const onClick = () => {
//         router.push(`/servers/${id}`);
//     }

//     return (
//         <ActionTooltip
//         side="right"
//         align="center"
//         label={name}
//         >
//             <button
//             onClick={onClick}
//             className="group relative flex items-center"
//             >
//                 <div className={cn(
//                     "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
//                     params?.serverId !== id && "group-hover:h-[20px]",
//                     params?.serverId === id ? "h-[36px]" : "h-[8px]"
//                 )} />
//                 <div className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
//                 params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
//                 )}>
//                  <Image
//                      fill
//                      src={imageUrl}
//                      alt="Channel"
//                  />
//                 </div>
//             </button>
//         </ActionTooltip>
//     )
// }