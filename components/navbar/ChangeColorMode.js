import { Button, Switch, useColorMode } from '@chakra-ui/react';

export default function ChangeColorMode() {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <>
            <Switch onChange={toggleColorMode} size="sm" />
            {/* <Button>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button> */}
        </>
    );
}
