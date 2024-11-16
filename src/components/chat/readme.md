
# Como usar componente ChatBot?
#### 1. Importar las propiedades: `ChatBot`, `chatBotResponses` y `Step`
```tsx
import { ChatBot, chatBotResponses, Step } from './components/chat'
```

#### 2. Crear un array de Step, ej:
```tsx
  const conversationFlow: Step[] = [
    {
      id: 'email',
      question:'¿Le gustaria brindarnos <b>su correo</b> para enviarle información más detallada?',
      validation: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input),
      errorMessage: 'Por favor ingrese un correo electrónico válido.',
    },
  ]

  /* 
  * id: Es la clave para el chatBotResponse, una vez terminado el flujo esto responderia:
    {email: 'corre@dom.com'}
  * question: Es la pregunta que leera el usuario, acepta etiquetas html como <b> o <br/>.
  * validation: Es opcional, es una funcion que recibe el input del usuario y debe devolver un booleano
  * errorMessage: Muestra el mensaje de error al usuario.
  */
```
#### 3. Crea una funcion para obtener las respuestas del usuario, la misma recibira un parametro de tipo `chatBotResponses`
```tsx
  const handleResponses = (userResponses: chatBotResponses) => {
    console.log('Informacion del usuario: ', userResponses);
  }
```
#### 4. Llama al componente `<ChatBot/>` y pasale las propiedades recien creadas

```tsx
  <ChatBot getUserData={handleResponses} conversationFlow={conversationFlow} />
```

#### Listo!✨
Tu chatbot ya esta configurado, el codigo completo deberia lucir asi:
```tsx
import { ChatBot, chatBotResponses, Step } from './components/chat';

const myApp = () => {
  const conversationFlow: Step[] = [
    {
      id: 'email',
      question:'¿Le gustaria brindarnos <b>su correo</b> para enviarle información más detallada?',
      validation: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input),
      errorMessage: 'Por favor ingrese un correo electrónico válido.',
    },
  ];

  const handleResponses = (userResponses: chatBotResponses) => {
    console.log('Informacion del usuario: ', userResponses);
  }

  return (
    <ChatBot getUserData={handleResponses} conversationFlow={conversationFlow} />
  )
}
```