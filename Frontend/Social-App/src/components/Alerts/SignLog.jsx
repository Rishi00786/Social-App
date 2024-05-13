import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook

const SignLog = (props) => {
    const navigate = useNavigate(); // Initialize useHistory hook

    useEffect(() => {
        Swal.fire({
            position: 'center',
            icon: props.icon,
            title: props.title,
            showConfirmButton: props.confirmation,
            timer: props.confirmation ? undefined : 1500,
            confirmButtonText: props.confirmButtonText || 'OK',
            allowOutsideClick: false, // Prevent closing by clicking outside
            willClose: (dismiss) => {
                if (dismiss === 'timer' && props.onConfirm) {
                    props.onConfirm(); // Call onConfirm callback if provided
                }
            }
        }).then((result) => { // Handle SweetAlert2 result
            if (result.isConfirmed && props.confirmation) { // Check if confirmation button is clicked
                navigate('/'); // Navigate to '/' route
            }
        });
    }, [props.icon, props.title, props.confirmation, props.onConfirm, props.confirmButtonText, history]);

    return null; // Return null as we don't want anything to be rendered by this component
};

export default SignLog;
