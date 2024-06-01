import toast from 'react-hot-toast'

const Toast = {
    Success: (msg: string) =>{
        toast.success(msg,{
            duration: 2500,
            position: 'top-center',
            style: {
                backgroundColor: 'green',
                color: 'white',
                padding: '8px',
                paddingLeft: '15px',
                fontSize: '1.2rem',
                borderRadius: '5px',
            }
        })
    },
    Error: (msg: string) =>{
        toast.error(msg,{
            duration: 2500,
            position: 'top-center',
            style: {
                backgroundColor: 'red',
                color: 'white',
                padding: '8px',
                paddingLeft: '15px',
                fontSize: '1.2rem',
                borderRadius: '5px',
            },
        })
    },
    Info: (msg: string) =>{
        toast(msg,{
            duration: 2500,
            position: 'top-center',
            style: {
                backgroundColor: 'blue',
                color: 'white',
                padding: '8px',
                paddingLeft: '15px',
                fontSize: '1.2rem',
                borderRadius: '5px',
            }
        })
    }

}

export default Toast