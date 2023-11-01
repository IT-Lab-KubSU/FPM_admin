import {Inter} from 'next/font/google'
import "./globals.css";
import React from "react";
import {Providers} from "./providers";
import {Layout} from "../../components/layout/layout";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'ФКТиПМ',
    description: 'Факультет компьютерных технологий и прикладной математики',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (<html lang="en" className='dark'>
    <head>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <title>ФКТиПМ</title>
    </head>
    <body className={inter.className}>
    <Providers>
        <Layout>
            {children}
        </Layout>
    </Providers>
    </body>
    </html>)
}
