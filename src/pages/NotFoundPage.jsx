import { Header } from "../components/Header";
;
import './NotFoundPage.css';

export function NotFoundPage ()
{
    return (<>
        <title>Page Not Found</title>
        <Header />
        <div className="not-found-container">
            <h1 className="not-found-title">404 - Page Not Found</h1>
            <p className="not-found-message">The page you are looking for does not exist.</p>
        </div >
    </>);
}