import { useState } from 'react';
import { Link, Flex, VStack, Stack, Box, Heading, Text, Container, Icon, Input, Button } from '@chakra-ui/react';
import axios from 'axios';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [state, setState] = useState('IDLE');
    const [errorMessage, setErrorMessage] = useState(null);

    const subscribe = async () => {
        setState('LOADING');
        setErrorMessage(null);
        try {
            const response = await axios.post('/api/newsletter', { email });
            setState('SUCCESS');
        } catch (e) {
            setErrorMessage(e.response.data.error);
            setState('ERROR');
        }
    };

    return (
        <>
            <Input
                className="appearance-none mb-2 lg:mb-0 w-full lg:w-2/3 border border-gray-500 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-600"
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Button
                className={`lg:ml-2 w-full lg:w-1/3 shadow bg-brand2 focus:shadow-outline focus:outline-none text-center text-white font-bold py-2 px-4 rounded flex ${state === 'LOADING' ? 'button-gradient-loading' : ''}`}
                type="button"
                disabled={state === 'LOADING'}
                onClick={subscribe}
            >
                Subscribe
            </Button>
            {state === 'ERROR' && <p className="w-1/2 mt-2 text-red-600">{errorMessage}</p>}
            {state === 'SUCCESS' && <p className="w-1/2 mt-2 text-green-600">Success!</p>}
        </>
    );
}
