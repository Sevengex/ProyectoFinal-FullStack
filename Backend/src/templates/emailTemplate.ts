const createTemplate = (message = String) => {
  return `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        font-family: Arial, Helvetica, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #111;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 25px;
        color: #333333;
        line-height: 1.5;
      }
      .footer {
        background-color: #f0f0f0;
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #777777;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 20px;
        background-color: #111;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="header">
        <h1>Harmony Music Store</h1>
      </div>

      <div class="content">
        <p>Hola 👋</p>

        <p>${message}</p>

        <!-- Podés agregar más contenido acá -->
        <!-- <p>Otro texto</p> -->
        <!-- <a href="#" class="btn">Ver detalle</a> -->
      </div>

      <div class="footer">
        <p>© ${new Date().getFullYear()} Harmony Music Store</p>
        <p>Este es un mensaje automático, por favor no respondas.</p>
      </div>
    </div>
  </body>
</html>
`
}

export default createTemplate