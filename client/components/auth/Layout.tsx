import React, { FunctionComponent } from "react";
import Image from 'next/image'
import banner from '../../images/banner.jpg';

interface Props {
  children: React.ReactNode;
}

export const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="min-h-full flex bg-white">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
                <main>
                    {children}
                </main>
            </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
            <div className="absolute inset-0 h-full w-full">
              <Image
                src={banner}
                className="h-full"
                alt="3 people walking in a forest with their dogs"
                // @ts-ignore
                layout="fill"
                placeholder="blur"
              />
            </div>
        </div>
    </div>
  )
}
