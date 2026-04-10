import React from 'react'

function PageTitle({ title }) {
  return (
    <div className="flex items-center gap-4 mb-2">

      {/* Accent line */}
      <div className="w-1 h-8 rounded-full bg-gradient-to-b from-sky-400 to-teal-400 flex-shrink-0" />

      {/* Title */}
      <div>
        <p className="text-[0.6rem] tracking-[0.18em] uppercase text-sky-400/70 font-medium m-0 mb-0.5 font-sora">
          BookMyBus
        </p>
        <h1 className="text-2xl sm:text-3xl font-light text-white m-0 leading-tight font-serif">
          {title}
        </h1>
      </div>

      {/* Trailing divider */}
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-2" />

    </div>
  )
}

export default PageTitle