import React from 'react'

interface Props {
  title: string
  onClick?: () => void
  width?: string
  loading?: boolean
  padding?: string
  noIcon?: boolean
}

const Button = ({ title, onClick, width, loading, padding, noIcon }: Props) => {
  return (
    <button
      className={`ease group relative z-30 box-border inline-flex ${
        width ? width : 'w-auto'
      } ${padding} cursor-pointer items-center justify-center overflow-hidden rounded bg-indigo-600 bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-3 font-bold text-white transition-all duration-300 focus:outline-none`}
      onClick={onClick}
    >
      <span className="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
      <span className="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>

      <span className="relative z-20 flex items-center font-semibold">
        {noIcon && (
          <svg
            className="relative flex-shrink-0 w-5 h-5 mr-2 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        )}
        {loading ? 'Loading...' : title}
      </span>
    </button>
  )
}

export default Button
