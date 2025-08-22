class UserAuth {
  constructor() {
    // Use localStorage
    this.users = JSON.parse(localStorage.getItem("users")) || [];
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  }


  saveData() {
    localStorage.setItem("users", JSON.stringify(this.users));
    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
  }

  // Signup
  signup(username, email, password) {
  
    if (this.users.some((u) => u.username === username)) {
      alert("⚠️ Username already exists. Please choose another.");
      return false;
    }

    const newUser = {
      id: Date.now(),
      username,
      email,
      password,
      createdAt: new Date().toLocaleString(),
      loggedIn: false,
    };

    this.users.push(newUser);
    this.saveData();

    alert("❤️Sign up successful! Please login.");
    window.location.href = "index.html"; // redirect to login
    return true;
  }

  // 2. Login
  login(username, password) {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      user.loggedIn = true;
      this.currentUser = user;
      this.saveData();
      alert("😊 Login successful!");
      window.location.href = "profile.html";
      return true;
    } else {
      alert("🚫Invalid username or password");
      return false;
    }
  }


  logout() {
    if (this.currentUser) {
      const user = this.users.find(
        (u) => u.username === this.currentUser.username
      );
      if (user) user.loggedIn = false;
      this.currentUser = null;
      this.saveData();
    }
    window.location.href = "index.html"; n
  }

le
  getProfile() {
    return this.currentUser;
  }

  
  checkAuth() {
    if (!this.currentUser || !this.currentUser.loggedIn) {
      window.location.href = "index.html";
    }
  }
}


const auth = new UserAuth();

document.addEventListener("DOMContentLoaded", () => {
  ge
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (username && email && password) {
        auth.signup(username, email, password);
      } else {
        alert("⚠️ Please fill in all fields.");
      }
    });
  }

  
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (username && password) {
        auth.login(username, password);
      } else {
        alert("⚠️ Please fill in all fields.");
      }
    });
  }

  
  const profileForm = document.getElementById("Profile");
  if (profileForm) {
    auth.checkAuth(); 
    const user = auth.getProfile();

    if (user) {
      
      const info = document.createElement("div");
      info.innerHTML = `
                <p><strong>Username:</strong> ${user.username}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Account Created:</strong> ${user.createdAt}</p>
                <p><strong>Status:</strong> ${
                  user.loggedIn ? "Online" : "Offline"
                }</p>
            `;
      profileForm.insertBefore(info, document.getElementById("logoutBtn"));
    }

  
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      auth.logout();
    });
  }
});
