import { useForm, type SubmitHandler } from "react-hook-form"

type Form = {
    checkin: string,
    checkout: string,
    adults: string,
    children: string,
}

type Inputs = {
  checkin: {
    label: string,
    errors: {
      required: string,
      validateDate: string
    }
  },
  checkout: {
    label: string,
    errors: {
      required: string,
      validateDate: string,
      validateCheckoutDate: string
    }
  },
  adults: {
    label: string,
    errors: {
      required: string,
    }
  }
  children: {
    label: string,
    errors: {
      required: string,
    }
  },
}

export default ({form: {checkin,checkout,adults,children}, buttonText}: {form: Inputs, buttonText: string}) => {
    const { register, handleSubmit, formState: {errors}, getValues } = useForm<Form>();

    const validateDate = (date: string) => {
      return !isNaN(Date.parse(date)) || checkin.errors.validateDate;
    };

    const validateCheckoutDate = (checkoutValue: string) => {
      const checkinValue = getValues("checkin");
      return new Date(checkoutValue) > new Date(checkinValue) || checkout.errors.validateCheckoutDate;
    };

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JS van de 0 a 11
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const onSubmit: SubmitHandler<Form> = async data => {
      const whatsappNumber = "993695507";
      const checkinFormatted = formatDate(data.checkin);
      const checkoutFormatted = formatDate(data.checkout);
      const text = `Hola, ¿dispone de habitación para los días: ${checkinFormatted} - ${checkoutFormatted}, para ${data.adults} adultos y ${data.children} niños?`;
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      try {
        window.open(url, '_blank');
      } catch (error) {
        alert('Hubo un error al redirigir.');
      }
    }

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 items-start justify-start gap-4"
        method="post"
      >
        <div>
          <label className="block font-semibold mb-2 text-sm" htmlFor="checkin">
            {checkin.label}
          </label>
          <input
            type="date"
            id="checkin"
            className="rounded-md px-4 py-3 border border-gray-400 w-full"
            {...register("checkin", { required: checkin.errors.required, validate: validateDate })}
          />
          {
            errors.checkin && <span className="text-sm text-red-500">{errors.checkin.message}</span>
          }
        </div>
        <div>
          <label className="block font-semibold mb-2 text-sm" htmlFor="checkout">
            {checkout.label}
          </label>
          <input
            type="date"
            id="checkout"
            className="rounded-md px-4 py-3 border border-gray-400 w-full"
            {...register("checkout", { required: checkout.errors.required, validate: validateCheckoutDate })}
          />
          {
            errors.checkout && <span className="text-sm text-red-500">{errors.checkout.message}</span>
          }
        </div>
        <div>
          <label className="block font-semibold mb-2 text-sm" htmlFor="adults">
            {adults.label}
          </label>
          <select
            id="adults"
            className="rounded-md px-4 py-3 border border-gray-400 bg-white w-full"
            {...register("adults", { required: adults.errors.required})}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>más de 4</option>
          </select>
          {
            errors.adults && <span className="text-sm text-red-500">{errors.adults.message}</span>
          }
        </div>
        <div>
          <label className="block font-semibold mb-2 text-sm" htmlFor="children">
            {children.label}
          </label>
          <select
            id="children"
            className="rounded-md px-4 py-3 border border-gray-400 bg-white w-full"
            {...register("children", { required: children.errors.required })}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>más de 3</option>
          </select>
          {
            errors.children && <span className="text-sm text-red-500">{errors.children.message}</span>
          }
        </div>
        <div className="col-span-2 md:col-span-4 lg:col-span-2">
          <label className="lg:block font-semibold mb-2 text-sm hidden" htmlFor="send">
            {buttonText}
          </label>
          <button
            className="w-full bg-primary-500 text-white font-semibold rounded-md hover:bg-primary-600 transition-colors px-4 py-3"
          >
            {buttonText}
          </button>
        </div>
      </form>
    )
}