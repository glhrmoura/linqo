import { Check, CircleAlert, Info } from 'lucide-react'

import { useToast } from '@/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { cn } from '@/lib/utils'

const toastIcons = {
  default: Info,
  success: Check,
  destructive: CircleAlert,
} as const

const toastIconStyles = {
  default: 'bg-white/15 text-white',
  success: 'bg-white/20 text-white',
  destructive: 'bg-white/20 text-white',
} as const

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider duration={4000}>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        const resolvedVariant = variant ?? 'default'
        const Icon = toastIcons[resolvedVariant] ?? toastIcons.default

        return (
          <Toast key={id} variant={resolvedVariant} {...props}>
            <span
              className={cn(
                'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                toastIconStyles[resolvedVariant] ?? toastIconStyles.default
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <div className="grid flex-1 gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
