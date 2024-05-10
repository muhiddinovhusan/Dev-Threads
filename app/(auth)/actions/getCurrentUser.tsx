import  prisma  from '@/lib/prismadb';
import getUserSession from './getUserSession';

const getCurrentUser = async () => {
 try{
    const session = await getUserSession();
    if(!session?.user?.email){

        return null;
    } 

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });
if(!currentUser){
    return null;
}
return currentUser
}
 catch(error:any){
    console.log(error);
    return null;
}
}

export default getCurrentUser;