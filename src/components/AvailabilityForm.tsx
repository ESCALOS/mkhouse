import { useForm, type SubmitHandler } from "react-hook-form"

type Form = {
    checkin: string,
    checkout: string,
    adults: string,
    children: string,
}

export default ({form: {checkin,checkout,adults,children}, buttonText}: {form: Form, buttonText: string}) => {
    const { register, handleSubmit, formState: {errors}, getValues } = useForm<Form>();

    const validateDate = (date: string) => {
      return !isNaN(Date.parse(date)) || "Fecha no válida";
    };

    const validateCheckoutDate = (checkout: string) => {
      const checkin = getValues("checkin");
      return new Date(checkout) > new Date(checkin) || "La fecha de check-out debe ser posterior a la fecha de check-in";
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
            {checkin}
          </label>
          <input
            type="date"
            id="checkin"
            className="rounded-md px-4 py-3 border border-gray-400 w-full"
            {...register("checkin", { required: "La fecha de check-in es requerida", validate: validateDate })}
          />
          {
            errors.checkin && <span className="text-sm text-red-500">{errors.checkin.message}</span>
          }
        </div>
        <div>
          <label className="block font-semibold mb-2 text-sm" htmlFor="checkout">
            {checkout}
          </label>
          <input
            type="date"
            id="checkout"
            className="rounded-md px-4 py-3 border border-gray-400 w-full"
            {...register("checkout", { required: "La fecha de salida es requerida", validate: validateCheckoutDate })}
          />
          {
            errors.checkout && <span className="text-sm text-red-500">{errors.checkout.message}</span>
          }
        </div>
        <div>
          <label className="block font-semibold mb-2 text-sm" htmlFor="adults">
            {adults}
          </label>
          <select
            id="adults"
            className="rounded-md px-4 py-3 border border-gray-400 bg-white w-full"
            {...register("adults", { required: "El número de adultos es requerido"})}
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
            {children}
          </label>
          <select
            id="children"
            className="rounded-md px-4 py-3 border border-gray-400 bg-white w-full"
            {...register("children", { required: "El número de niños es requerido" })}
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