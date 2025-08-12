'use client'

import { createContext, useContext, useEffect, useState, cloneElement, isValidElement } from 'react'
import { createPortal } from 'react-dom'

interface ModalContextType {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Modal({ children, open = false, onOpenChange }: ModalProps) {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <ModalContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </ModalContext.Provider>
  )
}

interface ClickableProps {
  onClick?: (e: React.MouseEvent) => void
}

export function ModalTrigger({ children, asChild = false }: { children: React.ReactNode; asChild?: boolean }) {
  const context = useContext(ModalContext)
  if (!context) throw new Error('ModalTrigger must be used within Modal')

  const handleClick = () => context.onOpenChange(true)

  if (asChild && isValidElement<ClickableProps>(children)) {
    return cloneElement(children, { 
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e)
        handleClick()
      }
    })
  }

  return <div onClick={handleClick}>{children}</div>
}

export function ModalContent({ children }: { children: React.ReactNode }) {
  const context = useContext(ModalContext)
  if (!context) throw new Error('ModalContent must be used within Modal')

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted || !context.isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => context.onOpenChange(false)}
      />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
        <button
          onClick={() => context.onOpenChange(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}