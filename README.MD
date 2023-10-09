# COTO Task

![](https://i.imgur.com/ll13OQl.png)

# Índice

1. [Descripción](#description-es)
2. [Tecnologías utilizadas](#technologies-es)
3. [Ejecutar localmente](#run-es)
4. [Variables de entorno](#env-es)
5. [Autor](#author-es)

<a name="description-es"></a>

## 1. Descripción

Coto-Task es una aplicación de arquitectura MVC diseñada para tomar reservaciones de eventos. El usuario puede registrarse en la base de datos, loguearse, recuperar su contraseña en caso de perderla y, en última instancia, agendar reservaciones. Cada usuario podrá modificar y eliminar las reservaciones que haya realizado, considerando siempre las fechas que ya hayan sido agendadas por otros usuarios.

Es una SPA que usa React con el framework Vite del lado del navegador, aprovechando React Router y Context API para mejorar la navegación y gestión de estados, añadiendo Formik para el manejo de formularios y Yup para la validación de datos.

Del lado del servidor, corre una API usando Node con el framework Express.JS, los datos son almacenados en una base de datos MongoDB, con el ORM Mongoose para el modelado de datos. Se utiliza  Passport para la autenticación y autorización de usuarios, mientras que las contraseñas se cifran con Bcrypt para guardarse de forma segura. Finalmente, utiliza Nodemailer para la gestión de correos electrónicos.

<a name="technologies-es"></a>

## 2. Tecnologías utilizadas

| Front-End         |
| ----------------- |
| React + Vite.Js   |
| React Router      |
| React Context API |
| Tailwind 3 CSS    |
| Formik            |
| Yup               |
| SweetAlert2       |
| PNPM              |

| Back-End          |
| ----------------- |
| Express.JS        |
| Mongo DB          |
| Mongoose          |
| Passport          |
| Nodemailer        |
| Bcrypt            |
| Dotenv            |
| JWT               |
| UUID              |

| General           |
| ----------------- |
| Standard          |
| PNPM              |

<a name="run-es"></a>

## 3. Ejecutar localmente

> Abrir una terminal y clonar el repositorio, dirigirse a la carpeta del frontend, instalar las dependencias y ejecutar
```bash
$ git clone https://github.com/nbrusco/coto-reservations-app.git
$ cd coto-reservations-app/frontend
$ pnpm install
$ pnpm run dev
```
> Con el frontend en ejecución, abrir otra terminal y repetir los pasos para el Backend
```bash
$ cd coto-reservations-app/backend
$ touch .env
$ pnpm install
```

> El proyecto corre por defecto en el puerto 5137 para el frontend, en el backend, por defecto será el 8080 salvo se especifique en la variable de entorno.

<a name="env-es"></a>

## 4. Variables de entorno

```bash
PORT=
#DATABASE
DB_URL=""
#SECRET
JWT_SECRET=""
#EMAIL CREDENTIALS
EMAIL_SERVICE=""
EMAIL_PORT=""
EMAIL_USER=""
EMAIL_PASS=""
```
> Deben colocarse en el archivo .env creado en la carpeta /backend

#### Finalmente, ejecutar *pnpm run dev* en la CLI del backend e ingresar a http://localhost:5173/

<a name="author-es"></a>

## 5. Autor

Nicolás Brusco | Desarrollador Web Fullstack / MERN

|Redes | Enlace |
|---------------------------|----------------|
|GitHub |[nbrusco](https://github.com/nbrusco) |
|Linkedin |[Nicolas Brusco](https://www.linkedin.com/in/nicolasbrusco)|
|Instagram |[nicobrusco](https://instagram.com/nicobrusco)