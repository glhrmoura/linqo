import { useTheme } from 'next-themes'
import { Toaster as Sonner, toast } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-dark-bg-secondary group-[.toaster]:text-dark-text group-[.toaster]:border-dark-bg-tertiary group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-dark-text-secondary',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-dark-bg-tertiary group-[.toast]:text-dark-text-secondary',
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
