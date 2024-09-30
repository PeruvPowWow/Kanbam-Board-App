import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    try {
      //decode the given token
      const decode: any = jwtDecode(token);
      
      //check to see if the token has an expiration and that its less than the current date divided by 1000
      if(decode?.exp && decode?.exp < Date.now() / 1000){
        //if it fulfills the condition then send back true ()
        return true
      }
    } catch (err) {
      return false
    }
  }

  getToken(): string {
    // TODO: return the token
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken);
    // TODO: redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO: redirect to the login page
    window.location.assign('/');
  }
}

export default new AuthService();