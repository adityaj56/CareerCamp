{
    $('#addStudentForm').submit(function(){
        console.log('asdas');
        $('#addStudentModal').modal('hide');
        $('.form-control').html('');
        return true;
    })
}