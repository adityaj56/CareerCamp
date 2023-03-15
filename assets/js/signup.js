{
    function verifyPassword() {
        let password = $('#pass').val();
        let conPassword = $('#con-pass').val();

        if(password != conPassword){
            alert('passwords do not match!');
            return false;
        }
        else{
            return true;
        }
    }
}