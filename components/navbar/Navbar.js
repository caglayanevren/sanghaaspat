import NavBarContainer from './NavBarContainer';
import MenuToggle from './MenuToggle';
import MenuLinks from './MenuLinks';
import { useBoolean } from '@chakra-ui/react';

export default function NavBar(props) {
    const [isOpen, setIsOpen] = useBoolean();

    return (
        <NavBarContainer isOpen={isOpen} {...props}>
            <MenuToggle toggle={setIsOpen.toggle} isOpen={isOpen} />
            <MenuLinks isOpen={isOpen} />
        </NavBarContainer>
    );
}
