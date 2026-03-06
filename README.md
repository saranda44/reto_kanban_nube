# reto_kanban_nube
¿Qué tecnología elegiste para el cómputo y por qué?
Lambda para que los request se ejecuten bajo demanda y no tener un servidor corriendo todo el tiempo, asi solo se ejecuta la funcion cuando quiere crear una tarjeta, actualizarla o verla.

¿Qué tecnología elegiste para almacenamiento y por qué?
DynamoDB para hacer consultas rapida de las tarjetas 

¿Qué tecnologías utilizarías para notificar al usuario que una tarea con estado backlog o doing está próxima a vencer?
SNS. Tendriamos una funcion que este revisando las fechas proximas a vencer y con los estados de backlog o doing y cuando cuando encuentre una mandar un correo con esta alerta.