import React, {useState, useEffect} from 'react'
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../appwriteConfig'
import { ID, Query, Permission, Role} from 'appwrite';
import Header from '../components/Header';
import { useAuth } from '../utils/AuthContext';
import {Trash2} from 'react-feather'
import Logo from '../Logo';


const Room = () => {
    const [messageBody, setMessageBody] = useState('')
    const [messages, setMessages] = useState([])
    const {user} = useAuth()


    useEffect(() => {
        getMessages();
      
        const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {

            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.log('A MESSAGE WAS CREATED')
                setMessages(prevState => [response.payload, ...prevState])
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.log('A MESSAGE WAS DELETED!!!')
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        });

        console.log('unsubscribe:', unsubscribe)
      
        return () => {
          unsubscribe();
        };
      }, []);


    const getMessages = async () => {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
                Query.orderDesc('$createdAt'),
                Query.limit(100),
            ]
        )
        console.log(response.documents)
        setMessages(response.documents)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('MESSAGE:', messageBody)

        const permissions = [
            Permission.write(Role.user(user.$id)),
          ]

        const payload = {
            user_id:user.$id,
            username:user.name,
            body:messageBody
        }

        const response = await databases.createDocument(
                DATABASE_ID, 
                COLLECTION_ID_MESSAGES, 
                ID.unique(), 
                payload,
                permissions
            )

        console.log('RESPONSE:', response)

        // setMessages(prevState => [response, ...prevState])

        setMessageBody('')

    }

    const deleteMessage = async (id) => {
        await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, id);
        //setMessages(prevState => prevState.filter(message => message.$id !== message_id))
     } 

return (
    <main className="container mx-auto p-4 flex justify-center items-center min-h-screen">
        
        <div className="w-full max-w-2xl">
           
              <Logo/>
            <Header />
            <div className="room--container bg-gray-100 p-6 rounded-lg shadow-md">
                <form id="message--form" onSubmit={handleSubmit} className="mb-6">
                    <div className="mb-4">
                        <textarea
                            required
                            maxLength="250"
                            placeholder="Say something..."
                            onChange={(e) => { setMessageBody(e.target.value) }}
                            value={messageBody}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <div className="send-btn--wrapper text-right">
                        <input
                            className="btn btn--secondary bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                            type="submit"
                            value="Send"
                        />
                    </div>
                </form>

                <div>
                    {messages.map(message => (
                        <div key={message.$id} className="message--wrapper mb-4 p-4 bg-white rounded-lg shadow-md">
                            <div className="message--header flex justify-between items-center mb-2">
                                <p className="text-gray-800 font-semibold">
                                    {message?.username ? (
                                        <span>{message?.username}</span>
                                    ) : (
                                        'Anonymous user'
                                    )}
                                    <small className="message-timestamp text-gray-500 ml-2">
                                        {new Date(message.$createdAt).toLocaleString()}
                                    </small>
                                </p>

                                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                                    <Trash2
                                        className="delete--btn text-red-500 cursor-pointer hover:text-red-700"
                                        onClick={() => { deleteMessage(message.$id) }}
                                    />
                                )}
                            </div>

                            <div className={"message--body" + (message.user_id === user.$id ? ' message--body--owner bg-blue-100' : ' bg-gray-100') + " p-3 rounded-lg"}>
                                <span>{message.body}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </main>
)
}

export default Room
