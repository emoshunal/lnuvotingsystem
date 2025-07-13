import Footer from '@/app/components/footer'
import { roboto_mono } from '../../fonts'
import { candidates } from '@/data/candidates'
import React from 'react'
import { Navigation } from '../components/nav'
import { ModeToggle } from '@/app/components/toggle-mode'
import { LogoutButton } from '@/app/components/logout'

const Ballot = () => {
  return (
    <>
      <div className='flex items-center justify-between p-4 px-24 print:hidden'>
        <Navigation />
        <div className='flex items-center gap-2'>
          <ModeToggle />
          <LogoutButton />
        </div>
      </div>
      <div className="w-1/3 print:w-full bg-zinc-50 p-6 rounded-xl border h-fit shadow-md relative overflow-hidden mx-auto">
        {/* Watermark */}
        <img
          src="/assets/images/watermark.png"
          alt="Fingerprint Watermark"
          className="absolute inset-0 m-auto object-cover opacity-10 z-0 pointer-events-none select-none"
          style={{ objectFit: 'contain' }}
        />

        {/* Main Ballot Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center border-b pb-4 mb-4">
            <img
              src="/assets/images/L-NU_LOGO.png"
              alt="LNUHalalan Logo"
              className="mx-auto h-16 mb-2"
            />
            <h1 className="text-2xl font-bold text-primary">LNUHalalan Official Ballot</h1>
            <p className="text-sm text-muted-foreground">Academic Year 2025–2026</p>
          </div>

          {/* Voted Selections */}
          <div className="space-y-6">
            {Object.entries(candidates).map(([position, people]) => {

              return (
                <div key={position} className="border-t pt-4">
                  <p className="text-xl font-bold capitalize text-primary mb-2">
                    {position.replace(/([A-Z])/g, " $1")}
                  </p>
                  <ul className={`space-y-1 text-lg ${roboto_mono.className} font-semibold text-gray-600 list-decimal ml-12`}>
                    {people.map((person) => (
                      <li key={person.id}>
                        {person.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

        </div>
      </div>
      <div className="w-1/3 flex flex-row justify-center align-middle gap-4 mx-auto mt-8">
        <img
          src="/assets/images/CS-LOGO.png"
          alt="CS Logo"
          className="h-24 mb-2"
        />
        <img
          src="/assets/images/MM-LOGO.png"
          alt="LNUHalalan Logo"
          className="h-24 mb-2"
        />
        <img
          src="/assets/images/SC-LOGO.png"
          alt="LNUHalalan Logo"
          className="h-24 mb-2"
        />
      </div>
      <Footer />
    </>

  )
}

export default Ballot