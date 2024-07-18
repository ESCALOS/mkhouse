import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form"

type Inputs = {
  name: string,
  email: string,
  subject: string,
  message: string
}

export default ({inputs, buttonText }: {inputs: Inputs, buttonText:string}) => {
  const { register, handleSubmit, formState: {errors} } = useForm<Inputs>();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async data => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Mensaje Enviado');
        console.log(result.message)
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert('Hubo un error al enviar el mensaje.');
      console.error(error);
    } finally {
      setIsSubmitting(false)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:col-span-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            className="p-4 border border-gray-200 transition-all duration-300 bg-gray-100 focus:bg-white focus:border-secondary-500 rounded-md outline-none w-full"
            type="text"
            placeholder={inputs.name}
            autoComplete="name"
            {...register("name", { 
              required: {
                value: true,
                message: 'El nombre es requerido'
              },
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 3 caracteres'
              },
              maxLength: {
                value: 20,
                message: 'El nombre debe tener menos de 20 caracteres'
              }
            })}
          />
          {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
        </div>
        <div>
          <input
            className="p-4 border border-gray-200 transition-all duration-300 bg-gray-100 focus:bg-white focus:border-secondary-500 rounded-md outline-none w-full"
            type="email"
            placeholder={inputs.email}
            autoComplete="email"
            {...register("email", { 
              required: {
                value: true,
                message: 'El correo es requerido'
              },
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'El correo no es válido'
              }
            })}
          />
          {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
        </div>
        <div className="md:col-span-2">
          <input
            className="p-4 border border-gray-200 transition-all duration-300 bg-gray-100 focus:bg-white focus:border-secondary-500 rounded-md outline-none w-full"
            type="text"
            placeholder={inputs.subject}
            autoComplete="subject"
            {...register("subject", { 
              required: {
                value: true,
                message: 'El asunto es requerido'
              },
              minLength: {
                value: 3,
                message: 'El asunto debe tener al menos 3 caracteres'
              }
            })}
          />
          {errors.subject && <span className="text-sm text-red-500">{errors.subject.message}</span>}
        </div>
        <div className="md:col-span-2">
          <input
            className="p-4 border border-gray-200 transition-all duration-300 bg-gray-100 focus:bg-white focus:border-secondary-500 rounded-md outline-none w-full"
            type="text"
            placeholder={inputs.message}
            autoComplete="message"
            {...register("message", { 
              required: {
                value: true,
                message: 'El mensaje es requerido'
              },
              minLength: {
                value: 3,
                message: 'El mensaje debe tener al menos 3 caracteres'
              }
            })}
          />
          {errors.message && <span className="text-sm text-red-500">{errors.message.message}</span>}
        </div>
      </div>
      <div className="mt-4 text-end">
        <button
          type="submit"
          className="p-4 text-center bg-secondary-500 hover:bg-secondary-600 transition-colors duration-500 rounded-md text-white text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </span>
          ) : (
            buttonText
          )}
        </button>
      </div>
    </form>
  )
}
