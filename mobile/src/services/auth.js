import SignIn from "../pages/auth/SignIn";

export function signIn() {
   return new Promise(resolve => {
         setTimeout(() => {
            resolve({
               token: 'jksdjf9231jfçam3210vjeo1',
               user: {
                  email: 'heyvitoria.lopes@gmail.com',
                  password: 'vitorinha'
               }
            })
         }, 2000);
      }
   )
}