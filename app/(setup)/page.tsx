import { InitialModal } from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server"; // Import this if you're using NextResponse in your app

const SetupPage = async () => {
    const profile = await initialProfile();

    // Check if profile is a NextResponse
    if (profile instanceof NextResponse) {
        console.error('Received a NextResponse, not a profile object:', profile);
        return <InitialModal/>; // Handle this case appropriately (e.g., show an error or return to InitialModal)
    }

    // Now that we know profile is not a NextResponse, we can safely access profile.id
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id // Safe to access here
                }
            }
        }
    });

    if (server) {
        return redirect(`/servers/${server.id}`);
    }

    return <InitialModal />;
}

export default SetupPage;







// <---PREVIOUS CODE ---------------------------------->

// import { InitialModal } from "@/components/modals/initial-modal";
// import { db } from "@/lib/db";
// import { initialProfile } from "@/lib/initial-profile";
// import {redirect} from "next/navigation";

// const SetupPage = async () => {
//     const profile = await initialProfile();
//     const server = await db.server.findFirst({
//           where: {
//             members: {
//                 some: {
//                     profileId: profile.id

//                 }
//             }
//           }
//     });

//     if(server) {
//          return redirect(`/servers/${server.id}`);
//     }
//     return <InitialModal/>;
// }
 
// export default SetupPage;