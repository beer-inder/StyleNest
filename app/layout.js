import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {StoreProvider} from '../components/StoreProvider';
export const metadata={title:'StyleNest | Fashion Boutique',description:'Indian, western and nightwear fashion, accessories and footwear.'};
export default function RootLayout({children}){return <html lang="en"><body><StoreProvider><Header/>{children}<Footer/></StoreProvider></body></html>}
