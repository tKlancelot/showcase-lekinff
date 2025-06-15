// userUtils.js

export function getToken() {
    return localStorage.getItem('token');
}

export function getRole() {
    return localStorage.getItem('role');
}

export function getUsername() {
    return localStorage.getItem('username');
}


export function logout() {
    let logout = document.getElementById('logout');
    if(logout){
      logout.addEventListener('click', () => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('username');
          localStorage.removeItem('userId');
          window.location.href = '/';
      });
    }
}