import qs from "query-string";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";

interface ChatQueryProps {
    queryKey: string;
    apiUrl: string;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
}

interface MessageResponse {
    items: any[]; // Replace with the actual type of your messages
    nextCursor?: string; // Add the actual key for pagination
}

export const useChatQuery = ({
    queryKey,
    apiUrl,
    paramKey,
    paramValue
}: ChatQueryProps) => {
    const { isConnected } = useSocket();

    // Fetch messages based on cursor (pagination)
    const fetchMessages = async ({ pageParam = undefined }: { pageParam?: string }) => {
        const url = qs.stringifyUrl(
            {
                url: apiUrl,
                query: {
                    cursor: pageParam,
                    [paramKey]: paramValue,
                },
            },
            { skipNull: true }
        );

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Error fetching messages: ${res.statusText}`);
        }

        return res.json() as Promise<MessageResponse>;
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error, // Add error handling for UI display
    } = useInfiniteQuery({
        queryKey: [queryKey, paramKey, paramValue], // Ensure dynamic query key
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor ?? undefined,
        refetchInterval: isConnected ? false : 1000, // Polling if not connected
        initialPageParam: undefined, // Specify the initial page parameter
    });

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error, // Return error for UI handling
    };
};




// <-----PREVIOUS CODE ------>
// import qs from "query-string";
// import { useInfiniteQuery } from "@tanstack/react-query";

// import { useSocket } from "@/components/providers/socket-provider";

// interface ChatQueryProps {
//     queryKey: string;
//     apiUrl: string;
//     paramKey: "channelId" | "conversationId",
//     paramValue: string;
// };

// export const useChatQuery = ( {
//     queryKey,
//     apiUrl,
//     paramKey,
//     paramValue
// }: ChatQueryProps) => {
//     const {isConnected} = useSocket();

//     const fetchMessages = async ({pageParam = undefined}) => {
//         const url = qs.stringifyUrl({
//             url: apiUrl,
//             query: {
//                 cursor : pageParam,
//                 [paramKey] : paramValue,
//             }
//         }, { skipNull: true});

//         const res = await fetch(url);
//         return res.json();
//     };

//     const {
//         data,
//         fetchNextPage,
//         hasNextPage,
//         isFetchingNextPage,
//         status,
//     } = useInfiniteQuery({
//         queryKey: [queryKey],
//         queryFn: fetchMessages,
//         getNextPageParam: (lastPage) => lastPage?.nextCursor,
//         refetchInterval: isConnected ? false :  1000
//     });

//     return {
//         data,
//         fetchNextPage,
//         hasNextPage,
//         isFetchingNextPage,
//         status,
//     };
// }