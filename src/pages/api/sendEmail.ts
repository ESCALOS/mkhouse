export const prerender = false
import type { APIRoute } from "astro"
import { Resend } from "resend"

const resend = new Resend(import.meta.env.SECRET_RESEND)

export const POST: APIRoute = async ({request}) => {
    const body = await request.json()
    const { name, email, message, subject } = body

    if(!name || !email || !subject || !message) {
        return new Response(
            JSON.stringify({
              message: 'Faltan campos.'
            }),
            {
              status: 400,
              statusText: 'Bad Request'
            }
          );
    }

    const send = await resend.emails.send({
        from: `MKHouse Reservas <mkhouse@resend.dev>`,
        to: import.meta.env.CONTACT_EMAIL,
        subject: "Nueva reserva",
        html: `
          <h1>Nueva reserva</h1>
          <h3>Nombre: ${name}</h3> 
          <h3>Email: ${email}</h3>
          <h3>Asunto: ${subject}</h3>
          <h3>Mensaje:</h3>
          <p>${message}</p>
        `
    })

    if(send.error) {
        return new Response(
            JSON.stringify({
                message: send.error
            }),
            {
                status: 500,
                statusText: 'Internal Server Error'
            }
        )
    }

    return new Response(
        JSON.stringify({
            message: "Mensaje enviado"
        }),
        {
            status: 200,
            statusText: 'OK'
        }
    )    
  }