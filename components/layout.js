import NavBar from './navbar/Navbar';

export default function Layout({ children }) {
    return (
        <>
            <NavBar
                position={{ base: 'absolute', md: 'relative' }}
                zIndex={3}
            />
            <main>{children}</main>
            {/* <Footer /> */}
        </>
    );
}
