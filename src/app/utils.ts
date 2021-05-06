import Swal from "sweetalert2";

export class Utils {
    // static doSomething(val: string) { return val; }
    // static doSomethingElse(val: string) { return val; }
    static successAlert() {
        Swal.fire({
            icon: 'success',
            title: 'Good job!',
            text: 'Successfull!',
            showConfirmButton: false,
            timer: 1500
        })
    }
    static oopsAlert() {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>'
        })
    }
    static postUpdatedAlert() {
        Swal.fire({
            icon: 'success',
            title: 'Good job!',
            text: 'Post Updated Successfully!',
            showConfirmButton: false,
            timer: 1500
        })
    }
    static postAddedAlert() {
        Swal.fire({
            icon: 'success',
            title: 'Good job!',
            text: 'Post Added Successfully!',
            showConfirmButton: false,
            timer: 1500
        })
    }
}
