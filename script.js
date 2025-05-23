/***********************************************************************
 * 1. DEFINICIÓN DE NODOS CON GRUPO
 *
 * Cada nodo tiene:
 *  - id: identificador único.
 *  - type: "question" o "conclusion".
 *  - text: texto a mostrar.
 *  - group: identifica el grupo (para reiniciar indentación cuando cambia).
 *  - yes / no: id del siguiente nodo según la respuesta.
 *
 * Se definen 6 grupos:
 *  • "power": Problemas de encendido.
 *  • "connectivity": Conectividad inalámbrica.
 *  • "printing": Problemas de impresión.
 *  • "paper": Problemas con el papel.
 *  • "config": Diagnóstico de configuración.
 *  • "buttons": Botones e indicadores.
 *
 * El nodo "start" decide a cuál rama ir:
 *  - Si enciende → grupo "connectivity" (y luego los otros grupos se inician secuencialmente).
 *  - Si no enciende → rama "power".
 ***********************************************************************/
const nodes = {
    // Nodo inicial (sin grupo)
    start: {
        id: "start",
        type: "question",
        text: "¿La impresora enciende correctamente?",
        group: "start",
        yes: "q1",    // Si enciende, iniciar grupo "connectivity"
        no: "p0"      // Si no, iniciar rama "power"
    },
    /* Rama "power" (Problemas de encendido) */
    p0: { id: "p0", type: "question", text: "La impresora no enciende. ¿Está enchufada al tomacorriente?", group: "power", yes: "p1", no: "c0" },
    p1: { id: "p1", type: "question", text: "¿Está enchufada a la parte posterior de la impresora?", group: "power", yes: "p2", no: "c1" },
    p2: { id: "p2", type: "question", text: "Al conectar todo, ¿la luz se enciende en amarillo?", group: "power", yes: "c2", no: "c3" },
    c0: { id: "c0", type: "conclusion", text: "La impresora no está enchufada. Conéctela y vuelva a intentarlo.", group: "power" },
    c1: { id: "c1", type: "conclusion", text: "Verifique la conexión en la parte posterior de la impresora.", group: "power" },
    c2: { id: "c2", type: "conclusion", text: "La luz amarilla indica un fallo interno. Consulte el servicio técnico.", group: "power" },
    c3: { id: "c3", type: "conclusion", text: "Revise la fuente de poder o contacte soporte.", group: "power" },

    /* Grupo "connectivity" (Conectividad Inalámbrica) */
    q1: { id: "q1", type: "question", text: "¿La luz de conexión inalámbrica está encendida?", group: "connectivity", yes: "q2", no: "c4" },
    q2: { id: "q2", type: "question", text: "¿La luz de conexión inalámbrica parpadea en azul?", group: "connectivity", yes: "c5", no: "q3" },
    q3: { id: "q3", type: "question", text: "¿El ordenador está conectado a una VPN?", group: "connectivity", yes: "c6", no: "q4" },
    q4: { id: "q4", type: "question", text: "¿El ordenador está conectado por cable Ethernet?", group: "connectivity", yes: "q5", no: "q6" },
    q5: { id: "q5", type: "question", text: "¿La impresora se detecta en el ordenador?", group: "connectivity", yes: "q6", no: "c7" },
    q6: { id: "q6", type: "question", text: "¿El dispositivo móvil detecta la impresora?", group: "connectivity", yes: "c9", no: "c8" },
    c4: { id: "c4", type: "conclusion", text: "La impresora no está conectada a Wi-Fi. Reinicie el modo de configuración inalámbrica.", group: "connectivity" },
    c5: { id: "c5", type: "conclusion", text: "La impresora está en modo configuración Wi-Fi. Use HP Smart para completar la conexión.", group: "connectivity" },
    c6: { id: "c6", type: "conclusion", text: "Desconecte la VPN y vuelva a intentar la conexión.", group: "connectivity" },
    c7: { id: "c7", type: "conclusion", text: "Habilite la conexión Wi-Fi en el ordenador.", group: "connectivity" },
    c8: { id: "c8", type: "conclusion", text: "Active Bluetooth y localización en el dispositivo móvil.", group: "connectivity" },
    c9: { id: "c9", type: "conclusion", text: "Conexión Wi-Fi verificada. No se detectan problemas.", group: "connectivity" },

    /* Grupo "printing" (Problemas de Impresión) */
    i1: { id: "i1", type: "question", text: "¿El indicador luminoso de tinta está encendido?", group: "printing", yes: "c10", no: "i2" },
    i2: { id: "i2", type: "question", text: "¿La impresión sale borrosa o con rayas?", group: "printing", yes: "c11", no: "i3" },
    i3: { id: "i3", type: "question", text: "¿No se imprime nada?", group: "printing", yes: "c12", no: "i4" },
    i4: { id: "i4", type: "question", text: "¿La calidad de impresión es mala?", group: "printing", yes: "c13", no: "i5" },
    i5: { id: "i5", type: "question", text: "¿La impresora no imprime en color?", group: "printing", yes: "c14", no: "c15" },
    c10: { id: "c10", type: "conclusion", text: "Revise o reemplace el cartucho, puede estar bajo.", group: "printing" },
    c11: { id: "c11", type: "conclusion", text: "Realice una limpieza del cabezal de impresión con HP Smart.", group: "printing" },
    c12: { id: "c12", type: "conclusion", text: "Reinstale correctamente el cartucho.", group: "printing" },
    c13: { id: "c13", type: "conclusion", text: "Use papel de buena calidad y verifique el almacenamiento.", group: "printing" },
    c14: { id: "c14", type: "conclusion", text: "Revise o reemplace el cartucho de color.", group: "printing" },
    c15: { id: "c15", type: "conclusion", text: "La impresión funciona correctamente.", group: "printing" },

    /* Grupo "paper" (Problemas con el Papel) */
    pp1: { id: "pp1", type: "question", text: "¿Hay un atasco de papel?", group: "paper", yes: "c16", no: "pp2" },
    pp2: { id: "pp2", type: "question", text: "¿La impresora indica que no hay papel aunque lo hay en la bandeja?", group: "paper", yes: "c17", no: "pp3" },
    pp3: { id: "pp3", type: "question", text: "¿La impresora toma varias hojas al mismo tiempo?", group: "paper", yes: "c18", no: "pp4" },
    pp4: { id: "pp4", type: "question", text: "¿El papel se arruga al imprimir?", group: "paper", yes: "c19", no: "pp5" },
    pp5: { id: "pp5", type: "question", text: "¿La impresora imprime páginas en blanco?", group: "paper", yes: "c20", no: "c21" },
    c16: { id: "c16", type: "conclusion", text: "Retire el papel atascado y reinicie la impresora.", group: "paper" },
    c17: { id: "c17", type: "conclusion", text: "Limpie el sensor de papel.", group: "paper" },
    c18: { id: "c18", type: "conclusion", text: "Alinee las hojas y ajuste la cantidad de papel.", group: "paper" },
    c19: { id: "c19", type: "conclusion", text: "Use papel seco y sin dobleces.", group: "paper" },
    c20: { id: "c20", type: "conclusion", text: "Revise o reemplace los cartuchos; pueden estar vacíos o secos.", group: "paper" },
    c21: { id: "c21", type: "conclusion", text: "El manejo del papel es adecuado.", group: "paper" },

    /* Grupo "config" (Diagnóstico de Configuración) */
    cfg1: { id: "cfg1", type: "question", text: "¿La impresora no responde?", group: "config", yes: "c22", no: "cfg2" },
    cfg2: { id: "cfg2", type: "question", text: "¿El botón de reanudar está parpadeando?", group: "config", yes: "c23", no: "cfg3" },
    cfg3: { id: "cfg3", type: "question", text: "¿La impresora muestra un código de error?", group: "config", yes: "c24", no: "cfg4" },
    cfg4: { id: "cfg4", type: "question", text: "¿La impresora no es reconocida por la computadora?", group: "config", yes: "c25", no: "cfg5" },
    cfg5: { id: "cfg5", type: "question", text: "¿La impresora no aparece en la red?", group: "config", yes: "c26", no: "c27" },
    c22: { id: "c22", type: "conclusion", text: "Apague la impresora, espere 10 segundos y enciéndala de nuevo.", group: "config" },
    c23: { id: "c23", type: "conclusion", text: "Presione el botón de reanudar o cancele el trabajo desde la computadora.", group: "config" },
    c24: { id: "c24", type: "conclusion", text: "Consulte la guía de usuario para identificar el código de error.", group: "config" },
    c25: { id: "c25", type: "conclusion", text: "Actualice los controladores desde la página oficial de HP.", group: "config" },
    c26: { id: "c26", type: "conclusion", text: "Revise la configuración del router y permita la conexión de la impresora.", group: "config" },
    c27: { id: "c27", type: "conclusion", text: "La configuración de la impresora es correcta.", group: "config" },

    /* Grupo "buttons" (Botones e Indicadores) */
    b1: { id: "b1", type: "question", text: "¿El botón de encendido no responde?", group: "buttons", yes: "c28", no: "b2" },
    b2: { id: "b2", type: "question", text: "¿El botón de cancelar no funciona?", group: "buttons", yes: "c29", no: "b3" },
    b3: { id: "b3", type: "question", text: "¿La luz de información está encendida?", group: "buttons", yes: "c30", no: "b4" },
    b4: { id: "b4", type: "question", text: "¿El botón de copia en color no funciona?", group: "buttons", yes: "c31", no: "b5" },
    b5: { id: "b5", type: "question", text: "¿La luz de Wi-Fi Direct está apagada?", group: "buttons", yes: "c32", no: "c33" },
    c28: { id: "c28", type: "conclusion", text: "Revise el cable de alimentación y pruebe en otro enchufe.", group: "buttons" },
    c29: { id: "c29", type: "conclusion", text: "Reinicie la impresora.", group: "buttons" },
    c30: { id: "c30", type: "conclusion", text: "Consulte el estado de la impresora en HP Smart.", group: "buttons" },
    c31: { id: "c31", type: "conclusion", text: "Revise el cartucho de color y reemplácelo si es necesario.", group: "buttons" },
    c32: { id: "c32", type: "conclusion", text: "Active Wi-Fi Direct desde el panel de control.", group: "buttons" },
    c33: { id: "c33", type: "conclusion", text: "Los botones e indicadores funcionan correctamente.", group: "buttons" }
};

/***********************************************************************
 * 2. GESTIÓN DE ESTADO
 ***********************************************************************/
let currentNodeId = "start";
// Almacena el camino recorrido: { nodeId, type, text, answer, depth, group }
const inferencePath = [];

/***********************************************************************
 * 3. FUNCIONES PARA RENDERIZAR EL CHAT Y EL DIAGRAMA
 ***********************************************************************/
// Muestra un nodo (pregunta o conclusión) en el chat y actualiza el diagrama.
// Se usa 'depth' para indicar el nivel de indentación.
function showNode(nodeId, answer = "start", depth = 0) {
    const node = nodes[nodeId];

    // Agrega el nodo al camino de inferencia
    inferencePath.push({
        nodeId: node.id,
        type: node.type,
        text: node.text,
        answer: answer,
        depth: depth,
        group: node.group
    });

    updateDiagram();

    // Crea el elemento para el mensaje en el chat
    const messageEl = document.createElement("div");
    messageEl.classList.add("message");
    messageEl.style.marginLeft = (depth * 20) + "px";

    if (node.type === "question") {
        messageEl.innerHTML = `
          <div class="question-header">Pregunta [${node.id}]</div>
          <div class="question-text">${node.text}</div>
          <div class="answers">
            <label><input type="radio" name="answer-${node.id}" value="yes" /> Sí</label>
            <label><input type="radio" name="answer-${node.id}" value="no" /> No</label>
          </div>
          <button id="btn-${node.id}">Siguiente</button>
        `;
        chatContainer.appendChild(messageEl);

        // Listener para el botón "Siguiente"
        const btnNext = document.getElementById(`btn-${node.id}`);
        btnNext.addEventListener("click", () => {
            const selected = document.querySelector(`input[name="answer-${node.id}"]:checked`);
            if (!selected) {
                alert("Por favor, selecciona Sí o No.");
                return;
            }
            const userAnswer = selected.value;
            btnNext.disabled = true;
            const radios = messageEl.querySelectorAll(`input[name="answer-${node.id}"]`);
            radios.forEach(r => r.disabled = true);

            // Determinar el siguiente nodo
            const nextId = (userAnswer === "yes") ? node.yes : node.no;
            if (nextId) {
                // Si el grupo del siguiente nodo es distinto, reiniciamos la indentación (depth = 0)
                const nextGroup = nodes[nextId].group;
                const currentGroup = node.group;
                const nextDepth = (nextGroup !== currentGroup) ? 0 : depth + 1;
                goToNextNode(node, userAnswer, nextDepth);
            } else {
                const msg = document.createElement("div");
                msg.innerHTML = "<p>No se encontró el siguiente paso en la red de inferencia.</p>";
                chatContainer.appendChild(msg);
            }
        });
    } else { // Caso de conclusión
        messageEl.classList.add("conclusion");
        messageEl.innerHTML = `
          <div class="question-header">Conclusión [${node.id}]</div>
          <div class="question-text">${node.text}</div>
        `;
        chatContainer.appendChild(messageEl);
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function goToNextNode(node, answer, nextDepth) {
    const nextId = (answer === "yes") ? node.yes : node.no;
    if (nextId) {
        showNode(nextId, answer, nextDepth);
    } else {
        const msg = document.createElement("div");
        msg.innerHTML = "<p>No se encontró el siguiente paso en la red de inferencia.</p>";
        chatContainer.appendChild(msg);
    }
}

function updateDiagram() {
    diagramContainer.innerHTML = "";
    inferencePath.forEach((step, index) => {
        const stepEl = document.createElement("div");
        stepEl.classList.add("flow-node");
        stepEl.style.marginLeft = (step.depth * 20) + "px";

        if (step.answer === "yes") {
            stepEl.style.borderColor = "green";
        } else if (step.answer === "no") {
            stepEl.style.borderColor = "red";
        }
        if (step.type === "question") {
            stepEl.innerHTML = `<h3>Pregunta [${step.nodeId}]</h3><p>${step.text}</p>`;
        } else {
            stepEl.innerHTML = `<h3>Conclusión [${step.nodeId}]</h3><p>${step.text}</p>`;
        }
        diagramContainer.appendChild(stepEl);

        if (index < inferencePath.length - 1) {
            const arrowEl = document.createElement("div");
            arrowEl.classList.add("flow-arrow");
            diagramContainer.appendChild(arrowEl);
        }
    });
}

/***********************************************************************
 * 4. INICIALIZACIÓN
 ***********************************************************************/
const chatContainer = document.getElementById("chatContainer");
const diagramContainer = document.getElementById("diagramContainer");

// Inicia el proceso mostrando el nodo inicial (depth = 0)
showNode(currentNodeId, "start", 0);