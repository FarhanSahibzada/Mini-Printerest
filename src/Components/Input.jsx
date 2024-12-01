import  { forwardRef, useId } from 'react'

const Input = ({ type = 'text', label , className, ...props }, ref) => {
    const id = useId();
    return (
        <div className={`w-full `} >
            {label && <label className='inline-block mb-1 pt-1 font-bold' htmlFor={id}>
                {label}
            </label>
            }
            <input className={`px-3 py-1.5 ${className} rounded-lg bg-white text-black outline-none focus:bg-gray-100
            duration-200 border border-gray-200 w-full `}
                {...props}
                ref={ref}
                id={id}
                type={type}
            />
        </div>
    )
}

export default forwardRef(Input)