      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
      import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
      import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries
    
      // Your web app's Firebase configuration
      const firebaseConfig = {
        apiKey: "AIzaSyDdItBP6MoIWjn9B5TJcA_B_1919xTK0a4",
        authDomain: "login-b0f6b.firebaseapp.com",
        projectId: "login-b0f6b",
        storageBucket: "login-b0f6b.appspot.com",
        messagingSenderId: "574427488387",
        appId: "1:574427488387:web:66428ee59249fe156d7bb6"
      };
    
    
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app);
      const auth = getAuth(app);

      //tính năng đăng kí
      document.addEventListener('DOMContentLoaded', function() {
        const signUpButton = document.getElementById('signUp');

        signUpButton.addEventListener('click', (event) => {
            event.preventDefault();
            const email = document.getElementById('rEmail').value;
            const password = document.getElementById('rPassword').value;
            const cpassword = document.getElementById('cPassword').value;

            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //Đã đăng kí
                const user = userCredential.user;
                set(ref(database, 'users/' + user.uid), {
                    email: email,
                    password: password,
                    cpassword: cpassword,
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                alert(errorMessage, 'signUpMessage');
            });
        });
      });

      //tính năng đăng nhập
      const signInButton = document.getElementById('signIn');
      if (signInButton) {
        signInButton.addEventListener('click', (event) => {
            event.preventDefault();
            const email = document.getElementById('email_field').value;
            const password = document.getElementById('password_field').value;

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                //đã đăng nhập
                const user = userCredential.user;
                localStorage.setItem('loggedInUserId', user.uid);
                window.location.href = 'index.html';
                const dt = new Date();
                update(ref(database, 'users/'+ user.uid), {
                    last_login: dt,
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
        });
      }



      //Hàm này tạo ra để theo dõi trạng thái đăng nhập của người dùng
      const user = auth.currentUser;
      onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
        }else {
            //người dùng đã đăng xuất
        }
      });



  