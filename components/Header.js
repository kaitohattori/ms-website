import Link from 'next/link';

function Header({ user, loading }) {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link href={{ pathname: '/', query: { ref: 'popular' } }}>
                            <a>Popular</a>
                        </Link>
                    </li>
                    {!loading &&
                        (user ? (
                            <>
                                <li>
                                    <Link
                                        href={{
                                            pathname: '/',
                                            query: {
                                                ref: 'recommended',
                                            },
                                        }}
                                    >
                                        <a>Recommendations</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: '/upload',
                                        }}
                                    >
                                        <a>Upload</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={{
                                            pathname: '/api/auth/logout',
                                        }}
                                    >
                                        <a>Logout</a>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link
                                    href={{
                                        pathname: '/api/auth/login',
                                    }}
                                >
                                    <a>Login</a>
                                </Link>
                            </li>
                        ))}
                </ul>
            </nav>

            <style jsx>{`
                header {
                    padding: 0.2rem;
                    color: #fff;
                    background-color: #333;
                }
                nav {
                    max-width: 42rem;
                    margin: 1.5rem auto;
                }
                ul {
                    display: flex;
                    list-style: none;
                    margin-left: 0;
                    padding-left: 0;
                }
                li {
                    margin-right: 1rem;
                    margin-left: 1rem;
                }
                li:nth-last-child(1) {
                    margin-left: auto;
                }
                a {
                    color: #fff;
                    text-decoration: none;
                }
                button {
                    font-size: 1rem;
                    color: #fff;
                    cursor: pointer;
                    border: none;
                    background: none;
                }
            `}</style>
        </header>
    );
}

export default Header;
