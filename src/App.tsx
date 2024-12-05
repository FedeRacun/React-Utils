import { ChatBot, chatBotResponses, Step } from "./components/chat";

const App = () => {
  // Función que recibe la data del chatbot, la data es de tipo chatBotResponses
  const handleUserInput = (data: chatBotResponses) => {
    console.log("Desde APP, la data es: ", data);
  };

  // Flujo de la conversación, debe ser un array de objetos de tipo Step
  const conversationFlow: Step[] = [
    {
      id: "fullNames",
      question:
        "Hola!, gracias por contactarnos.<br/> ¿Podría indicarnos su nombre y apellido, por favor?",
      validation: (input) => input.length > 3,
      errorMessage: "El nombre debe tener al menos 3 caracteres",
    },
    {
      id: "email",
      question:
        "Gracias ¿qué <b>correo electronico </b> podríamos enviarle información más detallada?",
      validation: (input) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input),
      errorMessage: "Por favor ingrese un correo electrónico válido.",
    },
    {
      id: "cellphone",
      question: "¿Tiene un número de celular al cual nos podamos comunicar?",
      validation: (input) => /^[0-9]{8,15}$/.test(input),
      errorMessage: "Por favor ingrese un número de celular válido (solo números).",
    },
    {
      id: "branch",
      question: `¿Qué sucursal quiere ser atendido?  <br/>
        0 - Vicente Lopez <br/>
        1 - Alvarez Thomas <br/>
        2 - Triunvirato <br/>
        3 - Salguero <br/>
        4 - Villa Crespo <br/>
        5 - Caballito <br/>
        6 - Acassuso <br/>
        7 - Belgrano`,
      validation: (input) => parseInt(input) <= 7,
      errorMessage: "Por favor ingrese una sucursal valida",
    },
    {
      id: "model",
      question: `¿Qué modelo quiere? <br/>
        1 - Nuevo 208 <br/>
        2 - Partner Confort <br/>
        3 - 2008`,
      validation: (input) => parseInt(input) <= 3,
      errorMessage: "Por favor ingrese un modelo valido",
    },
    {
      id: "farewell",
      question:
        "Le agradecemos mucho por su tiempo. Un asesor se pondrá en contacto con usted lo antes posible. ¡Que tenga un excelente día!",
    },
  ];

  return <ChatBot getUserData={handleUserInput} conversationFlow={conversationFlow} />;
};

export default App;
