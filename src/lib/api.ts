


// export async function fetchUser(userEmail: string) {
//     const user = await prisma.user.findFirst({
//         where: {
//             email: {
//                 equals: userEmail
//             }
//         }
//     });

//     console.log(user);

//     return user;
// };

export async function createUser(userEmail: string, userAuthentication: string) {
    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({userEmail: userEmail, userAuthentication: userAuthentication}),
    });

    const data = await response.json();
    return data;
};