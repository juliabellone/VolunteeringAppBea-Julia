#**Plataforma de voluntariado**

##DESCRIPCIÓN 

Consiste en una plataforma donde buscar opciones de voluntariado acordes a tus intereses. Del mismo modo, sirve para que las organizaciones interesadas en ofertar puestos de voluntariado, puedan localizar candidatos acorde a sus necesidades.

##TIPOS DE CUENTAS

La plataforma se visualizará en función de si el perfil es de:
 
- Voluntario.
- Organización. *ONG, Fundación, Empresa, etc* 

#####**Características de la cuenta de Voluntario:** 

- Los voluntarios tendrán la opción de hacer consultas a través de filtros para encontrar los voluntariados que les interesen.
- Los voluntarios tendrán un perfil donde esté visible la información que ellos mismos proporcionan, además de sus preferencias como voluntarios. 
- Los voluntarios facilitarán una serie de preferencias e informaci´ón personal, que servir´á para mostrarles ofertas personalizadas.
- Los voluntarios podrán inscribirse en las ofertas que les interesen.
- Los voluntarios pueden seguir a las organizaciones que les interesen para recibir información que actualicen.
- Los voluntarios pueden tener perfil público o privado. *(Esto esta por decidir)*
- Los voluntarios deben poder ponerse en contacto por la app. 

#####**Características de la cuenta de Organización:** 

- Las Organizaciones deben de tener un perfil donde se explique información relativa a la misma.
- Las Organizaciones serán las encargadas de publicar anuncios dentro de su propio perfil.
- Si las organizaciones no tienen anuncios publicados, su perfil seguirá visible.   
- Las organizaciones serán las encargadas de selecionar a los usuarios que les interesen en función de las solicitudes recibidas por cada publicación.
- Las organizaciones recibirán una notificación por cada voluntario inscrito en sus ofertas.
- Las organizaciones pueden realizar una búsqueda de voluntarios (mientras estos tengan un perfil público).
- Las organizaciones deben poder ponerse en contacto por la app. 

##ESTRUCTURA 

###Home Page 

####Estados 

#####**No logueado:**

- Sign Up
- Login
- Social Login 
- Opciones de búsqueda de voluntariados

#####**Logueado como Voluntario**
	
Lista de ofertas disponibles de Organizaciones adaptadas al perfil del voluntario.

#####**Logueado como Voluntario**

Panel de control. Gestion y publicacion de ofertas. 

###SIGN UP

Formulario de creación de usuario:  *¿Eres Voluntario o ONG?*

####Voluntario

#####**Información personal**

- *Nombre* 
- *Sexo* 
- *Edad*
- *Profesión* 
- *Foto de perfil* 
- *Descripción personal*

#####**Ubicación** 
- *País donde se desea realizar el voluntariado*
- *Ciudad donde se desea realizar el voluntariado*
- *País de origen del voluntario*
- *Ciudad de origen del voluntario*

> El voluntario puede añadir tantos países y correspondientes ciudades como desee.

#####**Habilidades**
- **Cualificadas.** *Permiso de conducir, legislativas, sanitarias, informáticas, etc*
- **Personales.** *Fotografía, sociales, etc*

#####**Intereses**
Opciones predeterminadas en diferente áreas: social, mediambiental, médico-sanitario, animales, etc.

#####**Disponiblidad** 
- **Tiempo.** *En función semanal y mensual*
- **Periódo de tiempo.** *Fecha de inicio y final del periódo en el cual sea posible realizar el voluntariado.*
- **Localización.** *Si se esta dispuesto a viajar. Esto tendría relación con el apartado anterior de "Ubicación", donde se especifica si el voluntario desea busca voluntariados fuera de su lugar de origen.*
- **Si se dispone de un vehículo propio.**

####Organización

#####**Información de la organización**

- *Nombre* 
- *Tamaño de la organización.* 
- *Areas de actuación. Salud, medio ambiente, etc.* 
- *Foto de perfil* 
- *Descripción de la organización*

#####**Ubicación** 
- *País o países donde trabajan*
- *Ciudad o ciudades donde trabajan*

#####**Diferentes áreas en las que trabajan**
Opciones predeterminadas en diferente áreas: social, mediambiental, médico-sanitario, animales, etc.

*Véase que serán las mismas opciones que se les ofrezcan a los voluntarios en su apartado de intereses.*

##MODELOS POSIBLES 

###VOLUNTEERS
```text
{
  - id
  - login: {
    -user: String
    -password: String
  }
  - profileImage {
    - pic_path: String,
    - pic_name: String,
  }
  - personalData: {
    - name: String
    - surname: String
    - birthDate: Date
    - sex: String
    - zip: Number
  }  
   - contact {
    - telephone: String
    - email: String
  }  
  - Volunteering{
    - skills: [ ]
    - interests: [ ]
    - availability {
      - fulltime: Boolean
      - weekend: Boolean
      - summer: Boolean
      - travelAvailability: Boolean	
    }  
    - offersRegistered: [offer_id]
  }
  - timestamp {
    -createdAt
    -updatedAt
  } 
}
```
###OFFERS
```text
- id
- ownerOng: ong_id
- category: String
- title: String
- description: String
- profileImage {
    - pic_path: String,
    - pic_name: String,
  }
- skillsRequired [String]
- usersRegistered: [user_id]
- timeSpent: number, 
- timestamp {
  -createdAt
  -updatedAt
}
```

###ONG
```text
{

  - id
  - login: {
    -user: String
    -password: String
  }
  - profileImage {
    - pic_path: String,
    - pic_name: String,
  }
  - personalData: {
    - ongName: String 
    - description: String
    - category: []
    - ongContactPerson {
      - name: String
      - surname: String
      - birthDate: Date
    } 
  }  
   - contact {
    - telephone: String
    - email: String
    - address {
      - street: String
      - city: String
      - state: String
      - zip: Number
    }
  }
   - offersPublished: [offer_id]
  - timestamp {
    -createdAt
    -updatedAt
  }
}
```

##RUTAS POSIBLES 
Metodo | Action | Description | Login  
--- | --- | --- | --- 
GET | /signup | signup get | x
POST | /signup | signup post | x
GET | /preferences | usuario indica preferecnias | x
POST | /preferences | update del user | x
GET | / | index | x
GET | /login | login get | x
POST | /login | login post | y
GET | /logout | destroy user session | y
GET | /offers | user sees offers | y
GET | /profile | profile of the user | y
GET | /profile/preferences | fill the preferences
POST | /profile/preferences | add changes of profile to dbs
GET | offers/:offerid | specific offer page |y|
POST | offers/:offerid | user signups in offer |y|


_____________________________
_____________________________
#
Express

## Express-generator

Install `express-generator` package

```bash
$ npm install -g express-generator
```

```bash
$ express <nameOfProject> --view=ejs --git
$ cd <nameOfProject>
$ npm install
```

### nodemon

[Link](http://nodemon.io)

```bash
$ npm install --save-dev nodemon
```

**Package.json**

```json
{
...
"scripts": {
"start-dev": "nodemon ./bin/www",
"start": "node ./bin/www"
},
...
}
```

### Variable environment

```bash
$ npm install --save dotenv
```

Create a file call \`.env\`

**.env**

```txt
DOMAIN=http://localhost:3000
```

### ESLint

[Link ESLint](https://eslint.org)

[Link ESlint Rules](https://eslint.org/docs/rules/)

Execute `eslint --init` in your terminal folder or add `.eslintrc.json`

```bash
$ npm install --save-dev eslint eslint-config-airbnb-base eslint-plugin-import
```

**.eslintrc.json**

```js
{
"env": {
"node": true
},
"extends": "airbnb-base",
"rules": {
"max-len": "off",
"radix": "off",
"object-curly-newline": "off",
"newline-per-chained-call": "off",
"import/newline-after-import": "off",
"no-unused-vars": "off"
}
}
```

### Layouts Partials and helpers views

[Link to express-ejs-layouts](https://github.com/Soarez/express-ejs-layouts)

Assuming that you use `EJS` as view engine

```bash
$ npm install --save express-ejs-layouts
```

**app.js**

```javascript
const expressLayouts = require('express-ejs-layouts');

...
app.set('view engine', 'ejs');

app.set("layout extractScripts", true) // see Documentation
app.set("layout extractStyles", true) // see Documentation
app.set("layout extractMetas", true) // see Documentation
app.set('layout', 'layouts/main'); // custom layout

app.use(expressLayouts);
...
```

create the layout view `main.ejs` in `views/layouts/` folder

create the following structure

```
views
├── ...
├── partials
│ ├── navbar.ejs
│ └── footer.ejs
└── layouts
├── main.ejs
└── secondLayout.ejs
```

### Git

* Make sure you have `.gitignore` with `node_modules`

* Create a remote repository in Gihub

* Create local repository

```
$ git init
$ git add .
$ git commit -m "initial commit"
$ git checkout -b dev
```


