import * as Msal from 'msal';

class AuthService {
  constructor(appConfig) {
    this.applicationConfig = {
      auth: {
        clientId: appConfig.clientId,
        redirectUri: appConfig.redirectUri,
        authority: appConfig.authority
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false, 
      }, 
      request : {
        scopes: ["user.read", "api://1a093e4f-b2f0-4e51-bcbc-1d191a7c7452/LabRegistrations"]
      }
    };
    this.app = new Msal.UserAgentApplication(this.applicationConfig);
  }
  login() {
    return this.app.loginPopup({ scopes: ["user.read"]}).then(
      idToken => {
        const user = this.app.getAccount();
        if (user) {
          return user;
        } else {
          return null;
        }
      },
      () => {
        return null;
      }
    );
  }
  logout() {
    this.app.logout();
  }
  isAuthenticated() {
    return this.app.isAuthenticated;
  }
  getToken(scopes) {
    var user = this.app.getAccount();
    return this.app.acquireTokenSilent({
      scopes: scopes,
      loginHint: user.userName
  }).then(
      accessToken => {
        return accessToken;
      },
      error => {
        return this.app
          .acquireTokenPopup({
            scopes: scopes,
            loginHint: user.userName
        })
          .then(
            accessToken => {
              return accessToken;
            },
            err => {
              console.error(err);
            }
          );
      }
    );
  }
}

export default AuthService;
