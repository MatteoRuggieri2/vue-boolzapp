// CONSEGNA

// Milestone 5
// Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette 
// di cancellare il messaggio selezionato.
// Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti.






Vue.config.devtools = true;
const app = new Vue(
    {
        el: '#root',
        data: {

            contactIndex: 0,
            currentDate: '',
            newTextMessage: '',
            newReceivedMessage: 'ok',
            contactResearch: '',
            activeMessage: null,

            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Hai portato a spasso il cane?',
                            status: 'sent',
                            messageOption: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Ricordati di dargli da mangiare',
                            status: 'sent',
                            messageOption: false
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            text: 'Tutto fatto!',
                            status: 'received',
                            messageOption: false
                        }
                    ],
                },

                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            text: 'Ciao come stai?',
                            status: 'sent',
                            messageOption: false
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            text: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received',
                            messageOption: false
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent',
                            messageOption: false
                        }
                    ],
                },

                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            text: 'La Marianna va in campagna',
                            status: 'received',
                            messageOption: false
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            text: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent',
                            messageOption: false
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            text: 'Ah scusa!',
                            status: 'received',
                            messageOption: false
                        }
                    ],
                },

                {
                    name: 'Luisa',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            text: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent',
                            messageOption: false
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            text: 'Si, ma preferirei andare al cinema',
                            status: 'received',
                            messageOption: false
                        }
                    ],
                },
            ]
            
        },

        methods: {

            // Funzione che serve a selezionare un contatto nella contact-page
            // index --> Bisogna fornire un indice
            contactSelector(index) {
                this.contactIndex = index;
                this.contactResearch = '';
                this.contactResearchFunction();
                this.activeMessage= null;

            },

            // Funzione che serve a inviare un nuovo messaggio, con testo e ora attuale,
            // e a ricevere un messaggio con scritto "ok".
            sendNewMessage() {
                if( this.newTextMessage.trim().length > 0 ) {
                    this.activeMessage = null;
                    this.currentDate = dayjs().format('DD/MM/YYYY HH:mm:ss')
                    this.contacts[this.contactIndex].messages.push({
                        date: this.currentDate,
                        text: this.newTextMessage,
                        status: 'sent',
                        messageOption: false
                    });
                    this.newTextMessage = '';

                    // Ricezione del messaggio
                    setTimeout(() => {
                        this.contacts[this.contactIndex].messages.push({
                            date: this.currentDate,
                            text: this.newReceivedMessage,
                            status: 'received',
                            messageOption: false
                        })
                    }, 1000);
                }
            },

            // Questa funzione permette di ricercare nel contact-finder un contatto,
            // risolvendo anche il problema di lettere maiuscole e minuscole,
            // dato che per lavorare trasforma tutto con toLowerCase().
            contactResearchFunction() {
                this.contacts.forEach((element) => {
                    if( element.name.toLowerCase().includes(this.contactResearch.toLowerCase()) ) {
                        element.visible = true;
                    } else {
                        element.visible = false;
                    }
                });
            },

            // Questa funzione serve per far comparire il menù a tendina sui messaggi.
            showMessageOption(index) {
                if( index === this.activeMessage ) {
                    this.activeMessage = null;
                } else {
                    this.activeMessage = index;
                }
                
            },

            // Questa funzione permette di eliminare il messaggio selezionato.
            // index --> per funzionare ha bisogno dell'indice del messaggio da eliminare
            deleteMessage(index) {
                this.activeMessage= null;
                this.contacts[this.contactIndex].messages.splice(index, 1)
            },

            lastMessageText(contact) {
                const messagesArray = contact.messages;
                const lastFullMessage = messagesArray[messagesArray.length - 1].text;
                let lastCutMessage = lastFullMessage.slice(0, 20)
                if(lastCutMessage.length > 19) {
                    lastCutMessage += '...'
                }

                return lastCutMessage;
            },

            lastMessageDate(contact) {
                const messagesArray = contact.messages;
                return messagesArray[messagesArray.length - 1].date;
            }

        }
    }
)