import { Link } from '@chakra-ui/react';

export default function MenuItem({ children, isLast, to = '/', ...rest }) {
    return (
        <Link href={to} {...rest}>
            {children}
        </Link>
    );
}
