<script>
    // Fungsi untuk memeriksa login
function checkAuth() {
    if(!sessionStorage.getItem('isLoggedIn')) {
        Swal.fire({
            title: 'Akses Ditolak',
            text: 'Anda harus login terlebih dahulu',
            icon: 'warning',
            confirmButtonText: 'Ke Halaman Login'
        }).then(() => {
            window.location.href = 'index.html';
        });
        return false;
    }
    return true;
}

// Fungsi untuk login
function login(username, password) {
    const users = JSON.parse(localStorage.getItem('users') || []);
    const user = users.find(u => u.username === username && u.password === password);
    
    if(user) {
        if(user.status !== 'approved') {
            Swal.fire({
                title: 'Akun Belum Disetujui',
                text: 'Registrasi Anda masih menunggu persetujuan admin',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
            return false;
        }
        
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
}

// Fungsi logout
function logout() {
    Swal.fire({
        title: 'Yakin ingin logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Logout',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('currentUser');
            Swal.fire({
                title: 'Logged Out!',
                text: 'Anda telah logout',
                icon: 'success',
                timer: 1000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = 'index.html';
            });
        }
    });
}

            function approveUser(nrp) {
            const pendingUsers = JSON.parse(localStorage.getItem('pendingUsers') || []);
            const users = JSON.parse(localStorage.getItem('users') || []);
            
            const userIndex = pendingUsers.findIndex(u => u.nrp === nrp);
            
            if(userIndex === -1) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Data pengguna tidak ditemukan',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.close();
                });
                return;
            }
            
            const approvedUser = pendingUsers[userIndex];
            approvedUser.status = 'approved';
            
            // Pindahkan dari pending ke users
            users.push(approvedUser);
            pendingUsers.splice(userIndex, 1);
            
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('pendingUsers', JSON.stringify(pendingUsers));
            
            // Kirim notifikasi ke webhook (simulasi)
            fetch('URL_WEBHOOK_NOTIFIKASI', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'registration_approved',
                    data: approvedUser
                })
            });
            
            Swal.fire({
                title: 'Disetujui!',
                text: 'Registrasi telah disetujui',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.close();
            });
        }
</script>