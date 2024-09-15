import { jwtDecode } from 'jwt-decode'; // Use this for most cases
import { UserData } from '../interfaces/UserData';

// Define DecodedToken interface if not already declared
interface DecodedToken {
  exp?: number;
  id?: string;
  username?: string;
}

class AuthService {
  getProfile() {
    // Return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decode: DecodedToken = jwtDecode(token); // Use DecodedToken type

      if (decode?.exp && decode.exp < Date.now() / 1000) {
        return true; // Token is expired
      }
    } catch (err) {
      return false; // Error occurred during decoding or token is invalid
    }

    return false; // Token is not expired
  }

  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
